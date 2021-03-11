package com.FoodProject.Entitys;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
@Table(name = "Workout_Routine")
public class Workout_Routine {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private int Times_Per_week;
	private String Name_Plan;
	
	@OneToMany(mappedBy = "workout_routine")
	private List<Workout> workout;
}
