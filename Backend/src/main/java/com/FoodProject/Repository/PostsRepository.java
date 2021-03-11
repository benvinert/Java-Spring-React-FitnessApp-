package com.FoodProject.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.FoodProject.Entitys.Posts;

public interface PostsRepository extends JpaRepository<Posts, Integer>{

}
