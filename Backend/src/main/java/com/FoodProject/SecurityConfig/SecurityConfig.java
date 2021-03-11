package com.FoodProject.SecurityConfig;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.FoodProject.Service.CustomUserDetailsService;




@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter{
	
	@Autowired
	CustomUserDetailsService userdetailsservice;
	
	@Bean
	public BCryptPasswordEncoder passwordEncoded(){
		return new BCryptPasswordEncoder(10);
	}


	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userdetailsservice).passwordEncoder(passwordEncoded());
	}


	@Override
	protected void configure(HttpSecurity http) throws Exception {
			http.csrf().disable();
			http
			.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
			.and().httpBasic().authenticationEntryPoint(new NoPopupBasicAuthenticationEntryPoint());
	}
	
}
