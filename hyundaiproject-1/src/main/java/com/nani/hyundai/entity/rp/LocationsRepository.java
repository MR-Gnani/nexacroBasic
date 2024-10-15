package com.nani.hyundai.entity.rp;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.nani.hyundai.entity.Locations;

public interface LocationsRepository extends JpaRepository<Locations, Long>{
	
	Locations findByAddress(String address);

	@Query("SELECT e FROM Locations e")
	List<Locations> findLocationInfo();
}
