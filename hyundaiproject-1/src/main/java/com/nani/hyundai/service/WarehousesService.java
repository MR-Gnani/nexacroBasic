package com.nani.hyundai.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.nani.hyundai.entity.Countries;
import com.nani.hyundai.entity.Locations;
import com.nani.hyundai.entity.Regions;
import com.nani.hyundai.entity.Warehouses;
import com.nani.hyundai.entity.rp.CountriesRepository;
import com.nani.hyundai.entity.rp.LocationsRepository;
import com.nani.hyundai.entity.rp.RegionsRepository;
import com.nani.hyundai.entity.rp.WarehousesRepository;
import com.nani.hyundai.seq.WarehouseIdGenerator;
import com.nani.hyundai.web.dto.WarehouseInfoDto;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class WarehousesService {
	
	private final WarehouseIdGenerator warehouseIdGenerator;
	private final WarehousesRepository warehousesRepository;
	private final RegionsRepository regionsRepository;
	private final CountriesRepository countriesRepository;
	private final LocationsRepository locationsRepository;
	
	@Transactional
	public void 창고데이터저장(List<WarehouseInfoDto> warehouseInfoDto) {
		
		for(WarehouseInfoDto infoDto : warehouseInfoDto) {
			String warehouseId = infoDto.getWarehouseId();
			String warehouseName = infoDto.getWarehouseName();
			String locationName = infoDto.getLocationName();
			
			// Location 조회
			Locations locations = locationsRepository.findByAddress(locationName);
			
			// Warehouse 조회
			Warehouses warehouses;
			
			if(warehouseId == null || warehouseId.isEmpty()) {
				// id 새로 생성
				System.out.println("시퀀스 아이디 생성!");
				warehouses = Warehouses.builder()
										.warehouseId(generateWarehouseId(locations.getLocationId()))
										.locations(locations)
										.warehouseName(warehouseName)
										.build();	
			} else {
				System.out.println("기존 아이디 수정!");
				warehouses = warehousesRepository.findById(warehouseId).orElse(null);
				if (warehouses == null) {
					System.out.println("ID NULL ERROR");
					continue;
				} else {
					warehouses.setWarehouseName(warehouseName);
					warehouses.setLocations(locations);
				}
			}
			
			//저장
			warehousesRepository.save(warehouses);
		}	
	}
	
	@Transactional
	public List<Locations> 위치데이터조회() {
		return locationsRepository.findLocationInfo();
	}
	
	@Transactional
	public List<Countries> 국가데이터조회() {
		return countriesRepository.findCountryInfo();
	}
	
	@Transactional 
	public List<Regions> 지역데이터조회() {
		return regionsRepository.findRegionInfo();
	}
	
	@Transactional
	public List<Warehouses> 조건창고데이터조회(Long condRegion, String condCountry, Long condLocation) {
		return warehousesRepository.findByConditions(condRegion, condCountry, condLocation);
	}
	
	@Transactional
	public List<Warehouses> 모든창고데이터조회() {
		Sort sort = Sort.by(Sort.Order.asc("warehouseId"));
        return warehousesRepository.findAll(sort);
	}
	
	@Transactional
	public Warehouses findHouseById(String houseId) {
		return warehousesRepository.findById(houseId).orElseThrow(()->new RuntimeException("해당하는 ID를 찾을 수 없습니다."));
	}
	
	private String generateWarehouseId(Long locationId) {
		return warehouseIdGenerator.generatedWarehouseId(locationId);
	}

	public void 창고데이터삭제(String warehouseId) {
		warehousesRepository.deleteById(warehouseId);
	}
	
//	public Warehouses saveWarehouse(Warehouses warehouse) {
//		if(warehouse.getWarehouseId() == null) {
//			String generatedId = warehouseIdGenerator.generatedWarehouseId(warehouse.getLocations().getLocationId());
//			warehouse.setWarehouseId(generatedId);
//		}
//		return warehousesRepository.save(warehouse);
//	}
}
