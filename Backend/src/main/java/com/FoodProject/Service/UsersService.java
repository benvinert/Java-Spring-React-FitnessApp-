package com.FoodProject.Service;

import java.sql.SQLException;
import java.sql.SQLIntegrityConstraintViolationException;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.UUID;

import javax.persistence.GeneratedValue;

import org.hibernate.engine.jdbc.spi.SqlExceptionHelper;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.FoodProject.DTO.UsersDTO;
import com.FoodProject.Entitys.Nutrition_menu;
import com.FoodProject.Entitys.Roles;
import com.FoodProject.Entitys.Users;
import com.FoodProject.Exception.ApiRequestException;
import com.FoodProject.Exception.ForbidenException;
import com.FoodProject.Repository.MenuRepository;
import com.FoodProject.Repository.UsersRepository;

import javassist.NotFoundException;

@Service
public class UsersService {
		
	@Autowired
	private UsersRepository userrepo;
	
	@Autowired
	private MenuRepository menurepo;
	
	@Autowired
	private PasswordEncoder passwordEncoded;
	
	
	
	public ResponseEntity<Users> addUser(Users UserFromWeb) {
		List<Roles> roles = Arrays.asList(new Roles("User"));
		UserFromWeb.setRoles(roles);
		Users user = null;
		try {
			user = userrepo.save(UserFromWeb);
		}catch(DataIntegrityViolationException e) {
			String a = e.getCause().getCause().getMessage();
			if(a.contains(user.getUsername())) {// Check exception if it's because Username already exist
				return new ResponseEntity<Users>(HttpStatus.IM_USED);//Send Status 226 to react to know it's username exception
			}else if(a.contains(user.getEmail())) {// Check exception if it's because Email already exist
				return new ResponseEntity<Users>(HttpStatus.ALREADY_REPORTED);//Send Status 208 to react to know it's username exception
			}
        }
		
		return new ResponseEntity<Users>(HttpStatus.OK);// If Username and password it's unique
	}
	
	public int BringIdByToken(String token) {
		return userrepo.findByCustomtoken(token).getId();
	}
	
	
	
	public Users Login(Users user) {
		Users userStorage = userrepo.findByUsername(user.getUsername());
		if(userStorage != null) {
			UUID tokenUUID = UUID.randomUUID();
			String TokenBack = tokenUUID.toString();//Converting to String
			userStorage.setCustomtoken(TokenBack);
			userrepo.save(userStorage);
			return userStorage;
		}
		return null;// if user don't exist

		
	}
	
	public Users AddmenutoUser(String token,int menuid) {
		Users consumer = userrepo.findByCustomtoken(token);
		if(consumer != null) {
				Nutrition_menu menu = menurepo.findById(menuid).orElse(null);
				consumer.setMenu(menu);
				userrepo.UpdateMenuId(consumer.getId(),menu.getId());
			}
		return null;
		}	
	
	public Nutrition_menu getconsumermenu(String token) throws NotFoundException {
		Nutrition_menu menu = userrepo.findByCustomtoken(token).getMenu();
		System.out.println(menu.getId());
		if(menu != null)
			return menu;
		throw new NotFoundException("Menu Not Found");
		
	}
	
	
	public Nutrition_menu getmenu(int id) {
		return menurepo.findById(id).orElse(null);
	}
	
	public Users GetAllUsers(List<Object> ClientCookies) {
		Users foundCookie = null;
		for(Object cookie : ClientCookies) {
			foundCookie = userrepo.findByUsername((String)cookie);
			if(foundCookie != null) {
				return foundCookie;
			}
		}
		//if we not found any cookie
		foundCookie.setUsername("Empty");
		return foundCookie;
				
	}

	public List<Users> AdminGetAllUsers() {
		return userrepo.findAll();
	}

	public Users CheckCookie(String token) {
		Users user = userrepo.findByCustomtoken(token);
		if(user == null) {
			throw new UsernameNotFoundException("UserNotFound");
		}
		return user;
	}
	

	
}
