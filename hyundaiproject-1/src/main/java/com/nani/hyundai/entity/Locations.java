package com.nani.hyundai.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Locations {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "LOCATION_ID")
	private Long locationId;
	
	@NotNull
	private String address;
	
	@Column(name = "POSTAL_CODE")
	private String postalCode;

	private String city;
	
	private String state;
	
	@ManyToOne
	@JoinColumn(name = "COUNTRY_ID")
	private Countries countries;
}
