package com.FoodProject.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.FoodProject.Entitys.Food;

public interface FoodRepository extends JpaRepository<Food, Integer>{
	
	@Query(value = "SELECT SUM(Calories) FROM Food",nativeQuery = true)
	int sumCalories();
}
