package com.capstone.application.controller;


import java.net.MalformedURLException;

import org.springframework.beans.factory.annotation.*;
import org.springframework.web.bind.annotation.*;

import com.capstone.application.model.Auth0User;
import com.capstone.application.service.Auth0service;

@RestController
@CrossOrigin(origins="*")
@RequestMapping("/api/v1")
public class Auth0Controller {
	
	
	
	private Auth0service auth0service;
	
	public Auth0Controller(Auth0service auth0service) {
		super();
		this.auth0service = auth0service;
	}

	@PostMapping(path="addUser")
	void addUser(@RequestBody Auth0User auth0User)throws MalformedURLException {
		System.out.println(auth0User.getFirstName());
		System.out.println(auth0User.getLastName());
		System.out.println(auth0User.getRole());
		System.out.println(auth0User.getEmail());
		System.out.println(auth0User.getPassword());
		System.out.println(auth0User.getSpeciality());
		auth0service.addUser(auth0User);
		
	}
	
	
	@DeleteMapping(path="deleteUser/{email}")
	void deleteUser(@PathVariable String email ) {
		System.out.println(email);
		auth0service.deleteUser(email);
	}

}
