package com.nani.hyundai.entity.rp;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.nani.hyundai.entity.Regions;

public interface RegionsRepository extends JpaRepository<Regions, Long>{

	@Query("SELECT e FROM Regions e")
 	List<Regions> findRegionInfo();
}
