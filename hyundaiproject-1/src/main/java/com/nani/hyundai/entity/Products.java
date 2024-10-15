package com.nani.hyundai.entity;

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
public class Products {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "PRODUCT_ID")
	private Long productId;
	
	@Column(name = "PRODUCT_NAME", nullable = false)
	private String productName;

    @Column(name = "DESCRIPTION")
    private String description;

    @Column(name = "STANDARD_COST")
    private Double standardCost;

    @Column(name = "LIST_PRICE")
    private Double listPrice;
    
    @ManyToOne
    @JoinColumn(name = "CATEGORY_ID", nullable = false)
    private Categories category;
    
    @OneToMany(mappedBy = "product")
    private List<OrderItems> orderItems;
    
    @OneToMany(mappedBy = "product")
    private List<Inventories> inventories;
}
