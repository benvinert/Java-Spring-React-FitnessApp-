package com.FoodProject.Entitys;

import java.util.List;

import javax.annotation.Generated;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
@Table(name = "Users")
public class Users {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@Column(name = "username", length = 200, unique = true)
	private String username;
	private int age;
	private float weight;
	private float height;
	@Column(name = "email", length = 200,unique = true)
	private String email;
	
	private String password;
	private String Birthday;
	private float bmr;
	private String customtoken;
	
	@OneToMany(targetEntity = Roles.class,cascade = CascadeType.ALL,fetch = FetchType.EAGER)
	@JoinColumn(name = "User_FK",referencedColumnName = "id")
	private List<Roles> roles;
	
	@ManyToOne(cascade = CascadeType.ALL)
	private Nutrition_menu menu;
}
