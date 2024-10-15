package com.nani.hyundai.entity;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "ORDER_ITEMS")
public class OrderItems {
	
	@EmbeddedId
	private OrderItemsId id;
	
	@Column(name = "ITEM_ID", insertable = false, updatable = false)
    private Long itemId; // 데이터베이스에 저장될 컬럼
	
	@ManyToOne
    @MapsId("orderId")
    @JoinColumn(name = "ORDER_ID", insertable = false, updatable = false)
    private Orders order;

    @Column(name = "QUANTITY", nullable = false)
    private Double quantity;

    @Column(name = "UNIT_PRICE", nullable = false)
    private Double unitPrice;

    @ManyToOne
    @JoinColumn(name = "PRODUCT_ID", insertable = false, updatable = false)
    private Products product;
}
