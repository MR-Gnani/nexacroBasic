package com.nani.hyundai.seq;

import org.springframework.stereotype.Service;

import com.nani.hyundai.entity.Countries;
import com.nani.hyundai.entity.Locations;
import com.nani.hyundai.entity.Regions;
import com.nani.hyundai.entity.rp.LocationsRepository;
import com.nani.hyundai.entity.rp.WarehousesRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class WarehouseIdGenerator {
	
	
	private final LocationsRepository locationsRepository;
	private final WarehousesRepository warehousesRepository;
	
	public String generatedWarehouseId(Long locationId) {
		
		// 지역 국가 ID가져오기
		Locations location = locationsRepository.findById(locationId)
				.orElseThrow(()->new RuntimeException("Location not found"));
		Countries country = location.getCountries();
		Regions region = country.getRegions();
		
		Long regionId = region.getRegionId();
		String countryId = country.getCountryId();
		
		// 최대값 조회
		String prefix = regionId + "_" + countryId + "_" + locationId + "_";
		System.out.println("PREFIX DATA : " + prefix);
		Integer maxSeq = warehousesRepository.findMaxSequence(prefix);
		System.out.println("MAXSEQ DATA : " + maxSeq);
		
		// 시퀀스 생성
		Integer newSeq = (maxSeq != null ? maxSeq + 1 : 1);
		System.out.println("NEWSEQ DATA : " + newSeq);
		
		return prefix + newSeq;
	}
}
