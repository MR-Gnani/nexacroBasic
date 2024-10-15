package com.nani.hyundai.web.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ProductsByCateogoryPivotDto {

	private Long categoryId;
	private String categoryName;
	private String productName;
	private Long orderYear;
	private Long orderMonth;
	private Long orderCount;
}
