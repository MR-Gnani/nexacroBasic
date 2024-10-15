package com.nani.hyundai.entity;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class Inventories {
	
	// 복합키 설정
	@EmbeddedId
	private InventoryId id;
 
    @Column(name = "QUANTITY", nullable = false)
    private Integer quantity;

    @ManyToOne
    @MapsId("productId")
    @JoinColumn(name = "PRODUCT_ID")
    private Products product;

    @ManyToOne
    @MapsId("warehouseId")
    @JoinColumn(name = "WAREHOUSE_ID")
    private Warehouses warehouse; 
}
