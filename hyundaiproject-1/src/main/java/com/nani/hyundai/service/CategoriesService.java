package com.nani.hyundai.service;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.nani.hyundai.entity.Categories;
import com.nani.hyundai.entity.rp.CategoriesRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class CategoriesService {
	
	private final CategoriesRepository categoriesRepository;
	
	@Transactional
	public Categories 카테고리등록(String categoryName) {
		Categories category = new Categories();
		category.setCategoryName(categoryName);
		
		return categoriesRepository.save(category);
	}
}
