package com.nani.hyundai.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Warehouses {

	@Id
	@Column(name = "WAREHOUSE_ID")
	private String warehouseId;
	
	@Column(name = "WAREHOUSE_NAME")
	private String warehouseName;
	
	@ManyToOne
	@JoinColumn(name = "LOCATION_ID")
	private Locations locations;
	
	@Override
	public String toString() {
		return "Warehouses [warehouseId=" + warehouseId + ", warehouseName=" + warehouseName + ", location=" + locations
				+ "]";
	}
	
	// JPA의 엔티티가 디비에 저장되기 전 처리 로직
//	// 커스텀한 아이디 생성과정을 거친다.
//	@PrePersist
//    public void prePersist() {
//        if (this.warehouseId == null) {
//            if (warehouseIdGenerator != null) { //NullPointException 방지
//                this.warehouseId = warehouseIdGenerator.generatedWarehouseId(locations.getLocationId());
//            }
//        }
//    }
//
//    // 해당 필드 직렬화 과정 제외. JPA 영속성 컨텍스트에서 관리되지 않으므로 에러 방지.
//    private transient WarehouseIdGenerator warehouseIdGenerator; // Use transient to avoid serialization issues
//
//    // Getter and setter for warehouseIdGenerator
//    @Autowired
//    public void setWarehouseIdGenerator(WarehouseIdGenerator warehouseIdGenerator) {
//        this.warehouseIdGenerator = warehouseIdGenerator;
//    }
	
}
