package com.FoodProject.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.FoodProject.Entitys.Meal;

public interface MealRepository extends JpaRepository<Meal, Integer>{
	
	@Transactional
	@Modifying
	@Query(value = "UPDATE meals SET m_calories = (SELECT SUM(calories)FROM food where meal_fk = :id) WHERE id = :id",nativeQuery = true)
	int UpdateCalories(@Param("id")int id);
	
	@Transactional
	@Modifying
	@Query(value = "UPDATE meals SET m_carbs = (SELECT SUM(carbs)FROM food where meal_fk = :id) WHERE id = :id",nativeQuery = true)
	int UpdateCarbs(@Param("id")int id);
	
	@Transactional
	@Modifying
	@Query(value = "UPDATE meals SET m_protein = (SELECT SUM(protein)FROM food where meal_fk = :id) WHERE id = :id",nativeQuery = true)
	int UpdateProtein(@Param("id")int id);
	
	@Transactional
	@Modifying
	@Query(value = "UPDATE meals SET m_fat = (SELECT SUM(fat)FROM food where meal_fk = :id) WHERE id = :id",nativeQuery = true)
	int UpdateFat(@Param("id")int id);
	
	@Transactional
	@Modifying
	@Query(value = "UPDATE meals SET m_fiber = (SELECT SUM(fiber)FROM food where meal_fk = :id) WHERE id = :id",nativeQuery = true)
	int UpdateFiber(@Param("id")int id);
}
