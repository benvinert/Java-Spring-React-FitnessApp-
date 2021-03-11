package com.FoodProject.Entitys;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonIgnoreType;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
@Table(name = "Nutrition_menu")
public class Nutrition_menu {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private float Total_Calories;
	private float Total_Carbs;
	private float Total_Protein;
	private float Total_fat;
	private float Total_fiber;
	private String type_diet;
	
	@OneToMany(targetEntity = Meal.class,cascade = CascadeType.ALL)
	@JoinColumn(name = "Menu_FK",referencedColumnName = "id")
	private List<Meal> meals;
	
	@ManyToOne
	private Users CreatedBy;
	
	
	
}
