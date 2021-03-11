package com.FoodProject.Controller;

import java.io.IOException;
import java.util.Base64;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.FoodProject.DTO.MenuDTO;
import com.FoodProject.Entitys.FileDatabase;
import com.FoodProject.Entitys.Nutrition_menu;
import com.FoodProject.Entitys.Posts;
import com.FoodProject.Entitys.Users;
import com.FoodProject.Service.FileDatabaseService;
import com.FoodProject.Service.FoodService;
import com.FoodProject.Service.MealService;
import com.FoodProject.Service.MenuService;
import com.FoodProject.Service.PostsService;
import com.FoodProject.Service.UsersService;

import javassist.NotFoundException;

@RequestMapping("/Secure")
@RestController
public class SecureController {
	
	@Autowired
	private FoodService foodservice;
	
	@Autowired
	private MealService mealservice;
	
	@Autowired 
	private MenuService menuservice;
	
	@Autowired
	private UsersService userservice;
	
	@Autowired
	private FileDatabaseService fileService;
	
	@Autowired
	private PostsService postrepo;
	
	////////////////////////////////Posts Requests/////////////////////////////
	@PreAuthorize("hasAnyRole('Admin','User')")
	@PostMapping("/GetMenuto/Consumer")
	public Nutrition_menu SecureGetMenuToConsumer(@RequestHeader("token") String token) throws NotFoundException {
		return userservice.getconsumermenu(token);
	}
	
	@PreAuthorize("hasAnyRole('User','Admin')")
	@PostMapping("/AddMenu")
	public Nutrition_menu addMenu(@RequestHeader("token") String token,@RequestBody MenuDTO menu) {
		return menuservice.addmenu(menu,token);
	}
	
	@PreAuthorize("hasAnyRole('Admin','User')")
    @PostMapping(value = "/{username}/AddPost")
    public Posts AddPost(@RequestHeader("token") String token,@PathVariable String username,@RequestPart(value = "before") MultipartFile before,
    		@RequestPart(value = "after") MultipartFile after,
    		@RequestPart("posts") Posts posts) throws IOException {
    	return postrepo.AddPost(username, before,after,posts);
    }
	////////////////////////////////Put Requests/////////////////////////////
	
	@PreAuthorize("hasAnyRole('Admin','User')")
	@PutMapping("/AddMenuto/Consumer/whichMenu/{menuid}")
	public Users AddMenutoConsumer(@RequestHeader("token") String token,@PathVariable int menuid) {
		return userservice.AddmenutoUser(token, menuid);
	}
	
	////////////////////////////////Get Requests/////////////////////////////
	
	@PreAuthorize("hasAnyRole('Admin','User')")
	@GetMapping("/GetMenu/{menuid}")
	public Nutrition_menu getmenu(@RequestHeader("token") String token,@PathVariable int menuid) {
		return userservice.getmenu(menuid);
	}
	
    //  Show Files/Picture On Website
	@PreAuthorize("hasAnyRole('Admin','User')")
    @GetMapping("/GetImage")
    public String downloadFile(@RequestHeader String token, HttpServletRequest response) throws IOException {
		int consumerid = userservice.BringIdByToken(token);
        // Load file as Resource
    	FileDatabase databaseFile = fileService.getFile(consumerid);
    	if(databaseFile == null) {
    		return "Null";
    	}
    	byte[] encoded = Base64.getEncoder().encode(databaseFile.getData());
    	String code = new String (encoded);
    	
    	
        return code;
    }
	
	

	
	
	/////////////////////////////Admin Options///////////////////////////////
	
    @PreAuthorize("hasAnyRole('Admin')")
    @GetMapping("/Admin/GetAllUsers")
    public List<Users> AdminGetAllUsers(){
    	return userservice.AdminGetAllUsers();
    }
}
