package com.nani.hyundai.entity.rp;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.nani.hyundai.entity.OrderItems;
import com.nani.hyundai.entity.OrderItemsId;

public interface OrderItemsRepository extends JpaRepository<OrderItems, OrderItemsId> {
	
	@Query("SELECT o.orderId " +
	           "FROM OrderItems oi " +
	           "JOIN oi.order o " +
	           "JOIN oi.product p " +
	           "WHERE o.status = 'PENDING' AND p.productId = :productId")
	List<Object[]> existsByProductIdAndOrderStatus(Long productId);

}
