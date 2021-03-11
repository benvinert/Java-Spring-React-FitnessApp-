package com.FoodProject.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import com.FoodProject.Entitys.Workout_Routine;
@EnableJpaRepositories
public interface WorkoutRoutineRepository extends JpaRepository<Workout_Routine, Integer>{

}
