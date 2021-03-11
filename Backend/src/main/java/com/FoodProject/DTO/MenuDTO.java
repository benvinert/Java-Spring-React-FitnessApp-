package com.FoodProject.DTO;

import com.FoodProject.Entitys.Nutrition_menu;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class MenuDTO {
	private Nutrition_menu menu;
}
