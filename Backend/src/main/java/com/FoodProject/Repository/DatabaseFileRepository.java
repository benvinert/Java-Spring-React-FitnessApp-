package com.FoodProject.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.FoodProject.Entitys.FileDatabase;

public interface DatabaseFileRepository extends JpaRepository<FileDatabase, String> {
	FileDatabase findByConsumerid(int consumerid);
}
