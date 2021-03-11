package com.FoodProject;

import org.aspectj.lang.annotation.Aspect;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import com.FoodProject.Entitys.Meal;

@SpringBootApplication
@EnableWebMvc
@Aspect
@ComponentScan(basePackages = "com.FoodProject.*")
public class ByBenApplication {

	public static void main(String[] args) {
		SpringApplication.run(ByBenApplication.class, args);
		
	}
	
	@Bean
	public RestTemplate resttemplate() {
		return new RestTemplate();
	}

}
