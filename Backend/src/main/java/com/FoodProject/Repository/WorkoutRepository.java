package com.FoodProject.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.FoodProject.Entitys.Workout;

public interface WorkoutRepository extends JpaRepository<Workout, Integer> {

}
