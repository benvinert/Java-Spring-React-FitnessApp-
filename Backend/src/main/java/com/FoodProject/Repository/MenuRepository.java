package com.FoodProject.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.FoodProject.Entitys.Nutrition_menu;

public interface MenuRepository extends JpaRepository<Nutrition_menu, Integer>{
	
	@Transactional
	@Modifying
	@Query(value = "UPDATE nutrition_menu SET total_calories = (SELECT SUM(m_calories)FROM meals where Menu_FK = :id) WHERE id = :id",nativeQuery = true)
	int UpdateCalories(@Param("id")int id);
	
	@Transactional
	@Modifying
	@Query(value = "UPDATE nutrition_menu SET total_carbs = (SELECT SUM(m_carbs)FROM meals where Menu_FK = :id) WHERE id = :id",nativeQuery = true)
	int UpdateCarbs(@Param("id")int id);
	
	@Transactional
	@Modifying
	@Query(value = "UPDATE nutrition_menu SET total_protein = (SELECT SUM(m_protein)FROM meals where Menu_FK = :id) WHERE id = :id",nativeQuery = true)
	int UpdateProtein(@Param("id")int id);
	
	@Transactional
	@Modifying
	@Query(value = "UPDATE nutrition_menu SET total_fat = (SELECT SUM(m_fat)FROM meals where Menu_FK = :id) WHERE id = :id",nativeQuery = true)
	int UpdateFat(@Param("id")int id);
	
	@Transactional
	@Modifying
	@Query(value = "UPDATE nutrition_menu SET total_fiber = (SELECT SUM(m_fiber)FROM meals where Menu_FK = :id) WHERE id = :id",nativeQuery = true)
	int UpdateFiber(@Param("id")int id);
	

	@Query(value = "SELECT * from nutrition_menu WHERE type_diet = :menu_type AND total_calories <= (:consumerbmr - 400)",nativeQuery = true)
	List<Nutrition_menu> GetCuttMenus(@Param("menu_type") String menu_type,@Param("consumerbmr") float consumerbmr);
	
	@Query(value = "SELECT * from nutrition_menu WHERE type_diet = :menu_type AND total_calories >= (:consumerbmr + 400)",nativeQuery = true)
	List<Nutrition_menu> GetMassMenus(@Param("menu_type") String menu_type,@Param("consumerbmr") float consumerbmr);
}
