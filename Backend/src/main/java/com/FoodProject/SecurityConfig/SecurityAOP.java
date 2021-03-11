package com.FoodProject.SecurityConfig;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.FoodProject.Entitys.Users;
import com.FoodProject.Repository.UsersRepository;

import javassist.NotFoundException;

@Aspect
@EnableAspectJAutoProxy
@Component
public class SecurityAOP {
	
	@Autowired
	private UsersRepository usersRepository;
	
	@Before(value = "execution(* com.FoodProject.Controller.SecureController..*(..))")
	public void CheckToken(JoinPoint joinPoint) throws NotFoundException {
		   Object[] signatureArgs = joinPoint.getArgs();
		   String UserToken = (String) signatureArgs[0];
		   Users user = usersRepository.findByCustomtoken(UserToken);
		   if(user == null) {
			   throw new NotFoundException("User not found!");
		   }
		   
	}

}
