package com.nani.hyundai.service;

import java.time.LocalDate;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.nani.hyundai.entity.Customers;
import com.nani.hyundai.entity.Orders;
import com.nani.hyundai.entity.rp.CustomersRepository;
import com.nani.hyundai.entity.rp.OrdersRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class OrderService {
	
	private final OrdersRepository ordersRepository;
	private final CustomersRepository customersRepository;


	
	@Transactional
	public Long 고객주문정보저장(Long customerId, String status, LocalDate orderdate) {
		
		Customers customers = customersRepository.findById(customerId)
								.orElseThrow(()-> new RuntimeException("해당하는 회원ID가 없습니다."));
		
		Orders order;
		
		order = Orders.builder().customer(customers).status(status).orderDate(orderdate).build();
		Orders orders = ordersRepository.save(order);
		Long OrderId = orders.getOrderId();
		
		return OrderId;
	}
	
	@Transactional
	public void 상품주문정보저장(Long orderId, Long itemId, Long productId, Double quantity, Double unitPrice) {
		System.out.println("PRODUCTID : " + productId);
		System.out.println("QUANTITY : " + quantity);
		System.out.println("############################");
		ordersRepository.insertInfoUpdateQuantity(orderId, itemId, productId, quantity, unitPrice);
	}
	
}
