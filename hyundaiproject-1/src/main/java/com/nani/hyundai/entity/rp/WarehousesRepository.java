package com.nani.hyundai.entity.rp;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.nani.hyundai.entity.Warehouses;

public interface WarehousesRepository extends JpaRepository<Warehouses, String>{
	
	// 커스텀 창고 아이디 생성 쿼리
	// substr로 문자열 추출 -> to_number로 바꾸기 -> max로 최대값찾기, coalesce로 null인경우 0 리턴
	@Query(value = "SELECT COALESCE(MAX(TO_NUMBER(SUBSTR(warehouse_id, LENGTH(:prefix) + 1))), 0) FROM warehouses WHERE warehouse_id LIKE CONCAT(:prefix, '%')", nativeQuery = true)
	Integer findMaxSequence(String prefix);
	
	// 창고 데이터 조회 쿼리
    @Query("SELECT w FROM Warehouses w " +
		           "JOIN w.locations l " +
		           "JOIN l.countries c " +
		           "JOIN c.regions r " +
	           "WHERE (:regionId IS NULL OR r.regionId = :regionId) " +
		           "AND (:countryId IS NULL OR c.countryId = :countryId) " +
		           "AND (:locationId IS NULL OR l.locationId = :locationId) " +
	           "ORDER BY w.warehouseId ASC")
    List<Warehouses> findByConditions(Long regionId, String countryId, Long locationId);
    
    List<Warehouses> findAll(Sort sort);
}
