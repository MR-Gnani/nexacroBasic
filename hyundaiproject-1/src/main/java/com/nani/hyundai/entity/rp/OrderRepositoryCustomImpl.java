package com.nani.hyundai.entity.rp;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;

@Repository
public class OrderRepositoryCustomImpl implements OrdersRepositoryCustom {
	
	@PersistenceContext
	private EntityManager entityManager;

}
