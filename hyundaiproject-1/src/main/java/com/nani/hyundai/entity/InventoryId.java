package com.nani.hyundai.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@Embeddable
public class InventoryId implements Serializable {
	
	@Column(name = "PRODUCT_ID")
    private Long productId;

    @Column(name = "WAREHOUSE_ID")
    private String warehouseId;
}
