package com.FoodProject.Entitys;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Entity
@Data
@NoArgsConstructor
@Table(name = "Users_role")
public class Roles {
	
	@Id
	@GeneratedValue
	private int id;
	
	private String role;
	@ManyToOne
	private Users user;
	
	public Roles(String role) {
		this.role = role;
	}
	
}
