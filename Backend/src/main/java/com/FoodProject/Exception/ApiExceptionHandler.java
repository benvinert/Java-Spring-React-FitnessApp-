package com.FoodProject.Exception;

import java.time.ZoneId;
import java.time.ZonedDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ApiExceptionHandler {
		@ExceptionHandler(value = {ApiRequestException.class})
		public ResponseEntity<Object> handleRequestException(ApiRequestException e){
			HttpStatus duplicate = HttpStatus.IM_USED;
			
			ApiException excep = new ApiException(e.getMessage()
					,duplicate
					,ZonedDateTime.now(ZoneId.of("Z")));
			
			return new ResponseEntity<>(excep,duplicate);
		}
}
