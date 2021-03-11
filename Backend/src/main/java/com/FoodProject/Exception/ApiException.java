package com.FoodProject.Exception;

import java.time.ZonedDateTime;

import org.springframework.http.HttpStatus;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class ApiException {
	
	private String message;
	private HttpStatus httpstatus;
	private ZonedDateTime zonedatetime;
	
}
