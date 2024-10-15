package com.nani.hyundai.web.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ProductDto {
	
	private Long productId;
    private String productName;
    private String description;
    private Double price;
    private Long categoryId;
    
}
