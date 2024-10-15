package com.nani.hyundai.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
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
public class Countries {
	
	@Id
	@Column(name = "COUNTRY_ID")
	private String countryId;
	
	@NotNull
	@Column(name = "COUNTRY_NAME")
	private String countryName;
	
	@ManyToOne
	@NotNull
	@JoinColumn(name = "REGION_ID")
	private Regions regions;
}
