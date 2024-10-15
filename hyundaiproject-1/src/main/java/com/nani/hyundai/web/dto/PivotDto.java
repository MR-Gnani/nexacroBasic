package com.nani.hyundai.web.dto;

import java.util.List;
import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class PivotDto {
	private List<ProductsByCateogoryPivotDto> pivotDtoList;
    private Map<Long, List<Long>> yearMonthMap;
}
