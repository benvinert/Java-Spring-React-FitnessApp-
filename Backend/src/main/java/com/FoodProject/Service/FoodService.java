package com.FoodProject.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.FoodProject.DTO.FoodDTO;
import com.FoodProject.Entitys.Food;
import com.FoodProject.Repository.FoodRepository;
@Service
public class FoodService {
	
	private int num;
	
	@Autowired
	FoodRepository foodrepo;
	
	public Food addFood(FoodDTO food) {
		return foodrepo.save(food.getFood());
	}
	
	public List<Food> GetAllfood() {
		return	foodrepo.findAll();
	}
	
	

}
