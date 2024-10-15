package com.nani.hyundai.web.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ProductListDto {
	
	private Long productId;
	private String productName;
	private Double price;
	private Long quantity;
	
}
