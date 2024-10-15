package com.nani.hyundai.entity.rp;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.nani.hyundai.entity.Categories;

public interface CategoriesRepository extends JpaRepository<Categories, Long>{
	
	@Query("SELECT e FROM Categories e")
	List<Categories> findCategoryInfo(Sort sort);
}
