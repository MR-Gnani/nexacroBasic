package com.nani.hyundai.entity;

import java.time.LocalDate;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class Orders {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ORDER_ID")
    private Long orderId;

    @ManyToOne
    @JoinColumn(name = "CUSTOMER_ID", nullable = false)
    private Customers customer;

    @Column(name = "STATUS", nullable = false)
    private String status;

//    @ManyToOne
//    @JoinColumn(name = "SALESMAN_ID")
//    private Employees salesman;

    @Column(name = "ORDER_DATE")
    private LocalDate orderDate;
    
    @OneToMany(mappedBy = "order")
    private List<OrderItems> orderItems;
}
