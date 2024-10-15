package com.nani.hyundai.web.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ProductCountCategoryDto {
	
	private Long categoryId;
	private String categoryName;
	private Long count;
	
}
