package com.nani.hyundai.entity.rp;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.nani.hyundai.entity.Orders;

public interface OrdersRepository extends JpaRepository<Orders, Long> {
//	Long takeOrderId(Long customerId);
	
	@Modifying
	@Query(value = "CALL INS_ORDER_ORDERITEMS_INVENTORIES(:orderId, :itemId, :productId, :quantity, :unitPrice)", nativeQuery = true)
	void insertInfoUpdateQuantity(Long orderId, Long itemId, Long productId, Double quantity, Double unitPrice);
	
	//@Procedure(name = "C##NANI.INS_ORDERINFO_ORDERS")
	//이건 안씀
	@Modifying
	@Query(value = "CALL INS_ORDERINFO_ORDERS(:customerId, :status, :orderDate)", nativeQuery = true)
    Integer saveOrderInfo(Long customerId, String status, LocalDate orderDate);
      
	@Query(value = "SELECT o FROM Orders o WHERE o.customer.customerId = :customerId ORDER BY o.orderDate DESC")
	List<Orders> findLatestOrderByCustomerId(Long customerId, Pageable pageable);
}
