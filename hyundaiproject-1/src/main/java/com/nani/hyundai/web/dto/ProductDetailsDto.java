package com.nani.hyundai.web.dto;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ProductDetailsDto {
	private Long productId;
	private String productName;
	private Long remainingStock;
	private BigDecimal cumPrice;
	private Long cumQuantity;
	
}
