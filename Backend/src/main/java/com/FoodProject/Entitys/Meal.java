package com.FoodProject.Entitys;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinColumns;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;




@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "Meals")
public class Meal{
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private float M_Calories;
	private float M_Carbs;
	private float M_Protein;
	private float M_fat;
	private float M_fiber;
	
	
	@OneToMany(targetEntity = Food.class,cascade = CascadeType.ALL)
	@JoinColumn(name = "Meal_FK",referencedColumnName = "id")
	private List<Food> food;
	

}
