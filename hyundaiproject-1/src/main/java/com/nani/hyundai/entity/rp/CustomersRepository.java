package com.nani.hyundai.entity.rp;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nani.hyundai.entity.Customers;

public interface CustomersRepository extends JpaRepository<Customers, Long> {

}
