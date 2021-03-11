package com.FoodProject.DTO;

import com.FoodProject.Entitys.Users;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Data
public class UsersDTO {
	private Users user;
}
