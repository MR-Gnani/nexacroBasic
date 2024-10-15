package com.nani.hyundai.service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeMap;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.nani.hyundai.entity.Products;
import com.nani.hyundai.entity.rp.InventoriesRepository;
import com.nani.hyundai.entity.rp.ProductsRepository;
import com.nani.hyundai.web.dto.PivotDto;
import com.nani.hyundai.web.dto.ProductCountCategoryDto;
import com.nani.hyundai.web.dto.ProductDetailsDto;
import com.nani.hyundai.web.dto.ProductListDto;
import com.nani.hyundai.web.dto.ProductsByCateogoryPivotDto;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ProductsService {
	
	private final ProductsRepository productsRepository;
	private final InventoriesRepository inventoriesRepository;
	
	@Transactional
	public List<ProductListDto> 전체상품조회() {
		List<Object[]> productList = productsRepository.findProductListWithInventory();
		List<ProductListDto> productsEntity = new ArrayList<>();
		
		for (Object[] productLists : productList) {
			Long productId = (Long) productLists[0];
			String productName = (String) productLists[1];
			Double price = (Double) productLists[2];
			Long quantity = ((Number) productLists[3]).longValue();
			
			productsEntity.add(new ProductListDto(productId, productName, price, quantity));
		}
		return productsEntity;
	}
	
	@Transactional
	public List<Products> 상품데이터조회() {
		Sort sort = Sort.by(Sort.Order.asc("productName"));
		return productsRepository.findProductInfo(sort);
	}
	
	@Transactional
	public List<Products> findProductByName(String productName) {
		return productsRepository.findByName(productName);
	}
	
	@Transactional
	public PivotDto 카테고리별제품목록(Long sendCategory, String sendProductName, String sendDateFrom, String sendDateTo) {
		
		LocalDate fromDate = parseDate(sendDateFrom);
        LocalDate toDate = parseDate(sendDateTo);
		
		List<Object[]> pivots = productsRepository.findMonthlyProductOrders(sendCategory, sendProductName, fromDate, toDate);
		List<ProductsByCateogoryPivotDto> pivotDto = new ArrayList<>();
		Map<Long, Set<Long>> yearMonthMap = new HashMap<>();
		PivotDto resultPivotDto = new PivotDto();
		
		for (Object[] pivot : pivots) {
			Long categoryId = (Long) pivot[0];
			String categoryName = (String) pivot[1];
			String productName = (String) pivot[2];
			Long orderYear = ((Number) pivot[3]).longValue();
			Long orderMonth = ((Number) pivot[4]).longValue();
			Long orderCount = ((Number) pivot[5]).longValue();

			pivotDto.add(new ProductsByCateogoryPivotDto(categoryId, categoryName, productName, orderYear, orderMonth, orderCount));
			
			yearMonthMap.computeIfAbsent(orderYear, k -> new HashSet<>()).add(orderMonth);
		}
		
		// Set을 List로 변환하여 저장
	    Map<Long, List<Long>> yearMonthListMap = new TreeMap<>();
	    for (Map.Entry<Long, Set<Long>> entry : yearMonthMap.entrySet()) {
	    	List<Long> monthList = new ArrayList<>(entry.getValue()); // Set을 List로 변환
	        Collections.sort(monthList); // 월 리스트 정렬
	        yearMonthListMap.put(entry.getKey(), monthList);
	    }
		
		resultPivotDto.setPivotDtoList(pivotDto);
		resultPivotDto.setYearMonthMap(yearMonthListMap);
		
		
		return resultPivotDto;
	}
	
	// 날짜 파싱 함수
		private LocalDate parseDate(String dateStr) {
	        if (dateStr == null || dateStr.trim().isEmpty()) {
	            return null;
	        }
	        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
	        try {
	            return LocalDate.parse(dateStr, formatter);
	        } catch (Exception e) {
	            throw new IllegalArgumentException("Invalid date format: " + dateStr);
	        }
	    }
	
	@Transactional
	public List<ProductCountCategoryDto> 카테고리별제품개수() {
		List<Object[]> results = productsRepository.countProductsByCategory();
		List<ProductCountCategoryDto> dtos = new ArrayList<>();
		
		for (Object[] result : results) {
			Long categoryId = (Long) result[0];
			String categoryName = (String) result[1];
			Long productCount = ((Number) result[2]).longValue();

			dtos.add(new ProductCountCategoryDto(categoryId, categoryName, productCount));
		}
		return dtos;
	}
	
	@Transactional
	public List<ProductDetailsDto> 카테고리별제품리스트(Long categoryId) {
		
		// 카테고리별 제품리스트 추출
		List<Object[]> idList = productsRepository.findByCategoryId(categoryId);
		
		// Product ID 추출
		List<Long> productIds = idList.stream().map(objArray -> (Long) objArray[0])
												.collect(Collectors.toList());
		
		// 재고정보 조회
		List<Object[]> stockList = inventoriesRepository.findRemainStock(productIds);
		
		
		// 재고정보 MAP으로 변환 (MAP성능이 더 좋음)
		Map<Long, Long> stockMap = stockList.stream().collect(Collectors.toMap(
																objArray -> (Long) objArray[0], //productId
																objArray -> ((Number) objArray[1]).longValue() //Stock
																));
		
		List<ProductDetailsDto> pDtos = new ArrayList<>();
		
		for (Object[] idLists : idList) {
			Long productId = (Long) idLists[0];
			String productName = (String) idLists[1];
			BigDecimal cumPrice = new BigDecimal(((Number) idLists[2]).toString());
			Long cumQuantity = ((Number) idLists[3]).longValue();
			
			Long remainingStock = stockMap.getOrDefault(productId, 0L); //productId가 없는 경우에도 0L을 반환
			
			pDtos.add(new ProductDetailsDto(productId, productName, remainingStock, cumPrice, cumQuantity));
		}
		return pDtos;
	}
}
