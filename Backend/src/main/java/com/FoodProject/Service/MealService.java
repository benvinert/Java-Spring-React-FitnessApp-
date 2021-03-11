package com.FoodProject.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.FoodProject.DTO.MealDTO;
import com.FoodProject.Entitys.Meal;
import com.FoodProject.Repository.MealRepository;

@Service
public class MealService {
	
	@Autowired
	private MealRepository mealrepository;
	
	
	public Meal addMeal(Meal meal) {
		Meal m = mealrepository.save(meal);
		int id = m.getId();
		mealrepository.UpdateCalories(id);
		mealrepository.UpdateCarbs(id);
		mealrepository.UpdateProtein(id);
		mealrepository.UpdateFat(id);
		mealrepository.UpdateFiber(id);

		return m;
	}
	
	
	
	
	

}
