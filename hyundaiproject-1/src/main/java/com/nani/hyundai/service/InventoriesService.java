package com.nani.hyundai.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.nani.hyundai.entity.Categories;
import com.nani.hyundai.entity.Inventories;
import com.nani.hyundai.entity.InventoryId;
import com.nani.hyundai.entity.Products;
import com.nani.hyundai.entity.Warehouses;
import com.nani.hyundai.entity.rp.CategoriesRepository;
import com.nani.hyundai.entity.rp.InventoriesRepository;
import com.nani.hyundai.entity.rp.OrderItemsRepository;
import com.nani.hyundai.entity.rp.ProductsRepository;
import com.nani.hyundai.entity.rp.WarehousesRepository;
import com.nani.hyundai.web.dto.InventoryDto;
import com.nani.hyundai.web.dto.ProductDto;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class InventoriesService {
	
	private final WarehousesRepository warehousesRepository;
	private final InventoriesRepository inventoriesRepository;
	private final CategoriesRepository categoriesRepository;
	private final ProductsRepository productsRepository;
	private final OrderItemsRepository orderItemsRepository;
	
	@Transactional
	public int 재고삭제(Long productId, String houseId) {
		// 복합키 객체 생성
		InventoryId inventoryId = new InventoryId(productId, houseId);
		
		// 주문 목록에 상품이 있는지 확인
		List<Object[]> hasPendingOrders = orderItemsRepository.existsByProductIdAndOrderStatus(productId);
		
		if(hasPendingOrders.isEmpty()) {
			System.out.println("삭제합니다");
			inventoriesRepository.deleteById(inventoryId);
			return 0;
		} else {
			System.out.println("주문목록에 상품이 존재합니다");
			return -1;
		}
	}
	
	@Transactional
	public Integer 재고수정(ProductDto productDto, InventoryDto inventoryDto) {
		Products productsEntity = productsRepository.findById(productDto.getProductId())
				.orElseThrow(()-> new RuntimeException("해당하는 상품이 없습니다."));
		Categories category = categoriesRepository.findById(productDto.getCategoryId())
				.orElseThrow(()-> new RuntimeException("카테고리를 찾을 수 없습니다."));
		Warehouses warehouse = warehousesRepository.findById(inventoryDto.getWarehouseId())
				.orElseThrow(()-> new RuntimeException("창고 ID를 찾을 수 없습니다."));

		productsEntity.setCategory(category);
		productsEntity.setDescription(productDto.getDescription());
		productsEntity.setListPrice(productDto.getPrice());
		productsEntity.setProductName(productDto.getProductName());
		
		productsRepository.save(productsEntity);
		
		 InventoryId inventoryId = new InventoryId(productsEntity.getProductId(), warehouse.getWarehouseId());
		 System.out.println(inventoryId);
		 Inventories inventory = inventoriesRepository.findById(inventoryId).orElse(null);
		 //.orElseThrow(() -> new RuntimeException("해당 창고에 대한 재고가 없습니다."));
		 if(inventory == null) {
			 return -1;
		 } else {
			 inventory.setQuantity(inventoryDto.getQuantity());
			 inventoriesRepository.save(inventory);
			 return 0;
		 }
	}
	
	@Transactional
	public void 재고개별등록(ProductDto productDto, InventoryDto inventoryDto) {
		
		Categories category = categoriesRepository.findById(productDto.getCategoryId())
								.orElseThrow(()-> new RuntimeException("카테고리를 찾을 수 없습니다."));
		
		Warehouses warehouse = warehousesRepository.findById(inventoryDto.getWarehouseId())
								.orElseThrow(()-> new RuntimeException("창고 ID를 찾을 수 없습니다."));
		
		
		Products product = Products.builder()
						  .productName(productDto.getProductName())
						  .description(productDto.getDescription())
						  .listPrice(productDto.getPrice())
						  .category(category)
						  .build();
		
		product = productsRepository.save(product);
		
		InventoryId inventoryId = new InventoryId(product.getProductId(), warehouse.getWarehouseId());
		
		Inventories inventory = Inventories.builder()
							   .id(inventoryId)
							   .product(product)
							   .warehouse(warehouse)
							   .quantity(inventoryDto.getQuantity())
							   .build();
		
		inventoriesRepository.save(inventory);
							
	}
	
	@Transactional
	public Integer 재고일괄등록(Integer amount, Long productId) {
		boolean exists = inventoriesRepository.existsByProductId(productId);
		
		// exists가 false일때 실행
		if (!exists) {
			System.out.println("상품을 가지고 있는 창고가 존재하지 않습니다.");
			return 1;
		} else {
			// 프로시저 저장 로직으로 변경
			inventoriesRepository.callsBicitemIns(productId, amount);
			return 0;
		}
	}
	
	@Transactional
	public Integer findMaxQuantityById(Long productId) {
		return inventoriesRepository.findMaxQuantity(productId);
	}
	
	@Transactional
	public Integer findMinQuantityById(Long productId) {
		return inventoriesRepository.findMinQuantity(productId);
	}
	
	@Transactional
	public List<Inventories> 모든재고데이터조회() {
		return inventoriesRepository.findAllOrderedByProductName();
	}
	
	@Transactional
	public List<Inventories> 조건재고데이터조회(Long condCategory, String condProduct, String condWarehouse,
										  Long condRegion, String condCountry, Long condLocation) {
		return inventoriesRepository.findByConditions(condCategory, condProduct, condWarehouse, condRegion, condCountry, condLocation);
	}
	
	@Transactional
	public List<Categories> 카테고리데이터조회() {
		Sort sort = Sort.by(Sort.Order.asc("categoryName"));
		return categoriesRepository.findCategoryInfo(sort);
	}

}
