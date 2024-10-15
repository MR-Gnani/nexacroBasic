package com.nani.hyundai.entity.rp;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.nani.hyundai.entity.Products;

public interface ProductsRepository extends JpaRepository<Products, Long>{
	
	@Query("SELECT c.categoryId, c.categoryName, p.productName, " +
		       "YEAR(o.orderDate) AS orderYear, MONTH(o.orderDate) AS orderMonth, " +
		       "COUNT(oi.order.orderId) AS orderCount " +
		       "FROM Products p " +
		       "RIGHT JOIN p.category c " +
		       "LEFT JOIN p.orderItems oi " +
		       "LEFT JOIN oi.order o " +
		       "WHERE o.orderDate IS NOT NULL " +
		         "AND (:sendCategory IS NULL OR c.categoryId = :sendCategory) " +
		         "AND (:sendProductName IS NULL OR (UPPER(p.productName) LIKE UPPER(CONCAT('%', :sendProductName, '%')))) " +
		         "AND (:fromDate IS NULL OR o.orderDate >= :fromDate) " +
			     "AND (:toDate IS NULL OR o.orderDate <= :toDate) " +
		       "GROUP BY c.categoryId, c.categoryName, p.productName, " +
		       "YEAR(o.orderDate), MONTH(o.orderDate) " +
		       "ORDER BY c.categoryId, p.productName ASC, orderYear, orderMonth")
	List<Object[]> findMonthlyProductOrders(Long sendCategory, String sendProductName, LocalDate fromDate, LocalDate toDate);
	
	@Query("SELECT c.categoryId, c.categoryName, p.productName " +
			   "FROM Products p RIGHT JOIN p.category c " +
			   "ORDER BY c.categoryId")
	List<Object[]> ProductsByCategoryForPivot();
	
	@Query("SELECT c.categoryId, c.categoryName, COUNT(p.productId) " +
		       "FROM Products p RIGHT JOIN p.category c " +
			   "GROUP BY c.categoryId, c.categoryName " +
		       "ORDER BY c.categoryName")
	List<Object[]> countProductsByCategory();

	
	@Query("SELECT e FROM Products e")
	List<Products> findProductInfo(Sort sort);
	
	@Query("SELECT p FROM Products p WHERE p.productName = :productName")
	List<Products> findByName(String productName);

	@Query("SELECT p.productId, p.productName, " +
				  "COALESCE(SUM(oi.unitPrice * oi.quantity), 0), " +
				  "COALESCE(SUM(oi.quantity), 0) " +
			   "FROM Products p " +
			   "LEFT JOIN p.orderItems oi " +
			   "WHERE p.category.id = :categoryId " +
			   "GROUP BY p.productId, p.productName " +
			   "ORDER BY p.productName")
	List<Object[]> findByCategoryId(Long categoryId);
	
	
	@Query("SELECT p.productId, p.productName, p.listPrice, " +
		       	  "COALESCE(SUM(i.quantity), 0) " +
		       "FROM Products p " +
		       "LEFT JOIN p.inventories i " +
		       "GROUP BY p.productId, p.productName, p.listPrice " +
		       "ORDER BY p.productName")
	List<Object[]> findProductListWithInventory();
}
