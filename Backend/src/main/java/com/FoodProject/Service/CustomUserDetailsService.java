package com.FoodProject.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.FoodProject.Entitys.Users;
import com.FoodProject.Repository.UsersRepository;
import com.FoodProject.SecurityConfig.CustomUserDetails;

@Service
public class CustomUserDetailsService implements UserDetailsService{
	
	@Autowired
	private UsersRepository userrepository;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Users user = userrepository.findByUsername(username);
		if(user == null) {
			return null;
		}else {
			CustomUserDetails userdetails = new CustomUserDetails();
			userdetails.setUser(user);
			return userdetails;
		}
		
		
	}

}
