package com.FoodProject.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.FoodProject.Entitys.Users;

public interface UsersRepository extends JpaRepository<Users, Integer>{
	
	Users findByUsername(String username);
	List<Users> findByHeight(float height);
	Users findByCustomtoken(String mytoken);
	
	@Transactional
	@Modifying
	@Query(value = "UPDATE users SET menu_id = :menuid  WHERE id = :consumerid",nativeQuery = true)
	int UpdateMenuId(@Param("consumerid")int consumerid,@Param("menuid")int menuid);
	
	
}
