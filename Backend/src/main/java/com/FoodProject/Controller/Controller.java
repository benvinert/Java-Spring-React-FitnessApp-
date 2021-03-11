package com.FoodProject.Controller;

import java.io.ByteArrayInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.http.HttpHeaders;
import java.sql.Blob;
import java.util.Arrays;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.FoodProject.DTO.FoodDTO;
import com.FoodProject.DTO.MealDTO;
import com.FoodProject.DTO.MenuDTO;
import com.FoodProject.DTO.UsersDTO;
import com.FoodProject.Entitys.FileDatabase;
import com.FoodProject.Entitys.Food;
import com.FoodProject.Entitys.Meal;
import com.FoodProject.Entitys.Nutrition_menu;
import com.FoodProject.Entitys.Posts;
import com.FoodProject.Entitys.Users;
import com.FoodProject.Payload.ResponseData;
import com.FoodProject.Service.FileDatabaseService;
import com.FoodProject.Service.FoodService;
import com.FoodProject.Service.MealService;
import com.FoodProject.Service.MenuService;
import com.FoodProject.Service.PostsService;
import com.FoodProject.Service.UsersService;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@RestController
@RequestMapping("/Webfitness")
public class Controller {
	
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
	
	@Autowired
	private RestTemplate resttemplate;
	
	@Autowired
	private BCryptPasswordEncoder Passwordencoded;
	
	////////////////////////////////Posts Requests/////////////////////////////

	@PreAuthorize("hasAnyRole('Admin','User')")
	@PostMapping("/Login")
	public Users Login(@RequestBody Users user) {
		return userservice.Login(user);
	}
	
	@PreAuthorize("hasAnyRole('Admin','User')")
	@PostMapping("/CheckCookie")
	public Users CheckCookie(@RequestHeader String token) {
		return userservice.CheckCookie(token);
	}
	
	@PreAuthorize("permitAll()")
	@PostMapping("/AddUser")
	@ResponseBody
	public ResponseEntity<Users> addClient(@RequestBody UsersDTO user) {
		String pwencoded = Passwordencoded.encode(user.getUser().getPassword());
		user.getUser().setPassword(pwencoded);
		return userservice.addUser(user.getUser());
	}
	
	//Upload One file
	@PreAuthorize("hasAnyRole('Admin','User')")
    @PostMapping("/uploadFile/{consumerid}")
    public ResponseData uploadFile(@RequestParam("Picture") MultipartFile file,@PathVariable int consumerid) throws Exception {
        FileDatabase fileName = fileService.storeFile(file,consumerid);
        return new ResponseData(fileName.getFileName(),
            file.getContentType(), file.getSize(),fileName.getId());
    }
	
    @PreAuthorize("permitAll()")
    @PostMapping("/GetAllUsersCookies")
    public Users GetAllUsers(@RequestPart(value = "ClientCookies") List<Object> ClientCookies) {
    	return userservice.GetAllUsers(ClientCookies);
    }
    
    
	

	
	////////////////////////////////Get Requests/////////////////////////////
    
	@GetMapping("/getTemplate/{username}")
	public Users getTemplate(@PathVariable String username) {
		String fooResourceUrl
		  = "http://localhost:8083/Webfitness/GetUsersByUsername/benvinert";
		return resttemplate.getForObject(fooResourceUrl, Users.class);
	}
	@PreAuthorize("permitAll()")
	@GetMapping("/TestHeroku")
	public String heroku() {
		return "Hey Heroku";
	}
	
	
	@PreAuthorize("hasRole('Admin')")
	@GetMapping("/GetAllFoods")
	public List<Food> getAllFoods() {
		return foodservice.GetAllfood();
	}
	

	
	@PreAuthorize("hasAnyRole('Admin','User')")
	@GetMapping("/GetSpecificMenu/{menu_type}/{consumerbmr}")
	public List<Nutrition_menu> getspecificmenu(@PathVariable String menu_type,@PathVariable float consumerbmr) {
		return menuservice.getspec(menu_type, consumerbmr);
	}
	

    
    

    
    @PreAuthorize("permitAll()")
    @GetMapping("/GetAllResults")
    public List<Posts> GetAllResults(){
    	return postrepo.GetAllResults();
    }
    
    
    /////////////////////////////////////////////Don't need//////////////////////////////////
	@PreAuthorize("hasRole('Admin')")
	@PostMapping("/Addfood")
	public Food addFood(@RequestBody FoodDTO food) {
		return foodservice.addFood(food);
	}
	
	@PreAuthorize("hasRole('Admin')")
	@PostMapping(value="/AddMeal", consumes={"application/json"})
	public Meal addMeal(@RequestBody MealDTO meal) {
		return mealservice.addMeal(meal.getMeal());
	}
}
	
	

