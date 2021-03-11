package com.FoodProject.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_GATEWAY, reason="To show an example of a custom message")
public class ForbidenException extends RuntimeException{

}
