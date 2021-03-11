package com.FoodProject.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.FoodProject.DTO.MenuDTO;
import com.FoodProject.Entitys.Meal;
import com.FoodProject.Entitys.Nutrition_menu;
import com.FoodProject.Entitys.Users;
import com.FoodProject.Repository.MealRepository;
import com.FoodProject.Repository.MenuRepository;
import com.FoodProject.Repository.UsersRepository;

@Service
public class MenuService {
	
	@Autowired
	MenuRepository menurepo;
	
	@Autowired
	private MealRepository mealrepository;
	
	@Autowired
	private UsersRepository userrepo;
	
	
	public List<Nutrition_menu> getspec(String menu_type,float consumerbmr) {
		if(menu_type.equals("Cut")) {
			return menurepo.GetCuttMenus(menu_type, consumerbmr);
		}
		//Returns Mass Menus
		return menurepo.GetMassMenus(menu_type,consumerbmr);
		
	}
	
	public Nutrition_menu addmenu(MenuDTO menu,String token) {
		Users user = userrepo.findByCustomtoken(token);
		System.out.println("Created By : " + user.getUsername());
		menu.getMenu().setCreatedBy(user);
		Nutrition_menu m = menurepo.save(menu.getMenu());
		List<Meal> listmeals = menu.getMenu().getMeals();
		int id;
		for(int i = 0 ; i < listmeals.size() ; i++) {
			id = listmeals.get(i).getId();
			mealrepository.UpdateCalories(id);
			mealrepository.UpdateCarbs(id);
			mealrepository.UpdateProtein(id);
			mealrepository.UpdateFat(id);
			mealrepository.UpdateFiber(id);
		}
		int menuid = m.getId();
		menurepo.UpdateCalories(menuid);
		menurepo.UpdateCarbs(menuid);
		menurepo.UpdateProtein(menuid);
		menurepo.UpdateFat(menuid);
		menurepo.UpdateFiber(menuid);
		

		return m;
	}
	
}
