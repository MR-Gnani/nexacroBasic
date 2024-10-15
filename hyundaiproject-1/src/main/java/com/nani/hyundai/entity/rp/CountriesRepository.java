package com.nani.hyundai.entity.rp;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.nani.hyundai.entity.Countries;

public interface CountriesRepository extends JpaRepository<Countries, String> {

	@Query("SELECT e FROM Countries e")
	List<Countries> findCountryInfo();
}
