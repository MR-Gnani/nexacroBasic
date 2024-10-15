package com.nani.hyundai.entity.rp;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.nani.hyundai.entity.Customers;

public interface UserRepository extends JpaRepository<Customers, Long> {
	@Query("SELECT c FROM Customers c " +
		   "WHERE (:userName IS NULL OR (UPPER(c.name) LIKE UPPER(CONCAT('%', :userName, '%'))))")
	Customers findByName(String userName);
}
