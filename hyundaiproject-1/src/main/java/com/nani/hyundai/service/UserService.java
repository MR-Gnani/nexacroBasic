package com.nani.hyundai.service;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.nani.hyundai.entity.Customers;
import com.nani.hyundai.entity.rp.UserRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class UserService {
	private final UserRepository userRepository;
	
	@Transactional
	public Customers 유저로그인(String userName) {
		Customers customer = userRepository.findByName(userName);
		return customer;
	}
}
