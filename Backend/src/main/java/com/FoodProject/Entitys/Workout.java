package com.FoodProject.Entitys;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "Workout")
public class Workout {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private float time;
	private String Which_part;
	private float Cardio_TIME;
	
	@OneToMany(mappedBy = "workout")
	private List<exercise> exercises;
	
	@ManyToOne(cascade = CascadeType.ALL)
	private Workout_Routine workout_routine;
}
