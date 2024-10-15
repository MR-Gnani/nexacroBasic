package com.nani.hyundai.entity.rp;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.nani.hyundai.entity.Inventories;
import com.nani.hyundai.entity.InventoryId;

public interface InventoriesRepository extends JpaRepository<Inventories, InventoryId> {
	
	@Query("SELECT p.productId, COALESCE(SUM(i.quantity), 0) " +
			   "FROM Inventories i " +
			   "JOIN i.product p " +
			   "WHERE p.productId IN :productIds " +
			   "GROUP BY p.productId")
	List<Object[]> findRemainStock(@Param("productIds") List<Long> productIds);
	
	@Query("SELECT p.productId, COALESCE(SUM(i.quantity), 0) " +
			   "FROM Inventories i " +
			   "JOIN i.product p " +
			   "WHERE p.productId IN :productIds " +
			   "GROUP BY p.productId")
	Inventories findRemainStockO(Long productIds);
	
	@Query("SELECT MAX(i.quantity) FROM Inventories i WHERE i.product.id = :productId")
	Integer findMaxQuantity(Long productId);
	
	@Query("SELECT MIN(i.quantity) FROM Inventories i WHERE i.product.id = :productId")
	Integer findMinQuantity(Long productId);
	
	// productId에 해당하는 엔티티 조회 (프로시저 저장 : SP_BICITEM_INS)
	// @Procedure(procedureName = "SP_BICITEM_INS")
	@Modifying
    @Query(value = "CALL SP_BICITEM_INS(:productId, :amount)", nativeQuery = true)
	void callsBicitemIns(Long productId, Integer amount);
	
	@Query("SELECT CASE WHEN COUNT(i) > 0 THEN true ELSE false END FROM Inventories i WHERE i.product.id = :productId")
	boolean existsByProductId(Long productId);
	
	// 재고 데이터 조회
	@Query("SELECT i FROM Inventories i " +
			       "JOIN i.product p " +
			       "JOIN p.category c " +
			       "JOIN i.warehouse w " +
			       "JOIN w.locations l " +
			       "JOIN l.countries co " +
			       "JOIN co.regions r " +
		       "WHERE (:categoryId IS NULL OR c.categoryId = :categoryId) " +
			       "AND (:productName IS NULL OR UPPER(p.productName) LIKE UPPER(CONCAT('%', :productName, '%'))) " +
			       "AND (:houseName IS NULL OR UPPER(w.warehouseName) LIKE UPPER(CONCAT('%', :houseName, '%'))) " +
			       "AND (:locationId IS NULL OR l.locationId = :locationId) " +
			       "AND (:countryId IS NULL OR co.countryId = :countryId) " +
			       "AND (:regionId IS NULL OR r.regionId = :regionId) " +
		       "ORDER BY p.productName")
	List<Inventories> findByConditions(Long categoryId, String productName, String houseName, Long regionId, String countryId, Long locationId);
	
	//@Query("SELECT i FROM Inventories i, Products p WHERE i.productId = p.productId ORDER BY p.productName ASC")
	@Query("SELECT i FROM Inventories i JOIN i.product p ORDER BY p.productName ASC")
	List<Inventories> findAllOrderedByProductName();
}
