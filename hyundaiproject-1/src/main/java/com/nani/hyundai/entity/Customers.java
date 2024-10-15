package com.nani.hyundai.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class Customers {
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Column(name = "CUSTOMER_ID")
	    private Long customerId;

	    @Column(name = "NAME", nullable = false) 
	    private String name;

	    @Column(name = "ADDRESS")
	    private String address;

	    @Column(name = "WEBSITE")
	    private String website;

	    @Column(name = "CREDIT_LIMIT")
	    private Double creditLimit;
}
