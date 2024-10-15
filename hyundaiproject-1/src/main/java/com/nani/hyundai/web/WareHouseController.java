package com.nani.hyundai.web;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import com.nani.hyundai.entity.Countries;
import com.nani.hyundai.entity.Locations;
import com.nani.hyundai.entity.Regions;
import com.nani.hyundai.entity.Warehouses;
import com.nani.hyundai.service.WarehousesService;
import com.nani.hyundai.web.dto.WarehouseInfoDto;
import com.nexacro17.xapi.data.DataSet;
import com.nexacro17.xapi.data.DataTypes;
import com.nexacro17.xapi.data.PlatformData;
import com.nexacro17.xapi.tx.HttpPlatformRequest;
import com.nexacro17.xapi.tx.HttpPlatformResponse;
import com.nexacro17.xapi.tx.PlatformException;
import com.nexacro17.xapi.tx.PlatformType;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Controller
public class WareHouseController {

	private final WarehousesService warehousesService;
	
	@PostMapping("/loadHouseData")
	public void loadhouseData(HttpServletRequest request, HttpServletResponse response) throws IOException, PlatformException {
		HttpPlatformRequest req = new HttpPlatformRequest(request.getInputStream());
        req.receiveData();
        
        PlatformData pdata = req.getData();
        DataSet inds = pdata.getDataSet("inDataset");
        String houseId = inds.getString(0, "WAREHOUSE_ID");
        
        Warehouses warehouses = null;
        if (houseId != null && !houseId.isEmpty()) {
            warehouses = warehousesService.findHouseById(houseId);
        } else {
            System.out.println("houseId is missing or empty");
            return;
        }
     
        DataSet outds = new DataSet("outDataset");
        
        outds.addColumn("WAREHOUSE_ID", DataTypes.STRING, 32);
        outds.addColumn("REGION_NAME", DataTypes.STRING, 32);
        outds.addColumn("COUNTRY_NAME", DataTypes.STRING, 32);
        outds.addColumn("LOCATION_NAME", DataTypes.STRING, 32);
        
        int newRow = outds.newRow();
        outds.set(newRow, "WAREHOUSE_ID", warehouses.getWarehouseId());
    	outds.set(newRow, "REGION_NAME", warehouses.getLocations().getCountries().getRegions().getRegionName());
    	outds.set(newRow, "COUNTRY_NAME", warehouses.getLocations().getCountries().getCountryName());
    	outds.set(newRow, "LOCATION_NAME", warehouses.getLocations().getAddress());
    	
    	// Prepare the response data
        PlatformData respdata = new PlatformData();
        respdata.addDataSet(outds);

        // Set response variables
        respdata.getVariableList().add("ErrorCode", 0);
        respdata.getVariableList().add("ErrorMsg", "SUCC");

        // Send the response
        HttpPlatformResponse res = new HttpPlatformResponse(response, PlatformType.CONTENT_TYPE_XML, "UTF-8");
        res.setData(respdata);
        res.sendData();
	}
	
	
	@PostMapping("/deleteWarehouse")
	public void deleteWarehouse(HttpServletRequest request, HttpServletResponse response) throws IOException, PlatformException {
		HttpPlatformRequest req = new HttpPlatformRequest(request.getInputStream());
        req.receiveData();
        
        PlatformData pdata = req.getData();
        DataSet inds = pdata.getDataSet("inDataset");
        
        for(int i=0; i <inds.getRowCount(); i++) {
        	String warehouseId = inds.getString(i, "WAREHOUSE_ID");
            String checkStatus = inds.getString(i, "CHECK");
            
            // 조건에 맞는 데이터 리스트 추가
            if("1".equals(checkStatus)) {
            	warehousesService.창고데이터삭제(warehouseId);
            } else if ("0".equals(checkStatus)) {
            	System.out.println("Data update skipped for checkStatus = '0'"); // 데이터 처리 x
            } else {
            	System.err.println("Invalid checkStatus value: " + checkStatus); // 에러 로그 출력
            }
        }
        
        // Prepare the response data
        PlatformData respdata = new PlatformData();
        
        // Set response variables
        respdata.getVariableList().add("ErrorCode", 0);
        respdata.getVariableList().add("ErrorMsg", "SUCC");

        // Send the response
        HttpPlatformResponse res = new HttpPlatformResponse(response, PlatformType.CONTENT_TYPE_XML, "UTF-8");
        res.setData(respdata);
        res.sendData();
	}
	
	// 데이터 삽입 및 수정 로직
	@PostMapping("/upsertInfo")
	public void upsertData (HttpServletRequest request, HttpServletResponse response) throws IOException, PlatformException {
		HttpPlatformRequest req = new HttpPlatformRequest(request.getInputStream());
        req.receiveData();
        
        PlatformData pdata = req.getData();
        DataSet inds = pdata.getDataSet("inDataset");
        
        List<WarehouseInfoDto> dataToProcess = new ArrayList<>();
        
        for(int i=0; i <inds.getRowCount(); i++) {
        	String warehouseId = inds.getString(i, "WAREHOUSE_ID");
            String warehouseName = inds.getString(i, "WAREHOUSE_NAME");
            String locationName = inds.getString(i, "LOCATION");
            String rowType = inds.getString(i, "ROWTYPE");
            System.out.println(rowType);
            
            // 조건에 맞는 데이터 리스트 추가
            if("2".equals(rowType) || "4".equals(rowType)) {
            	WarehouseInfoDto warehouseInfoDto = new WarehouseInfoDto(warehouseId, warehouseName, locationName);
            	dataToProcess.add(warehouseInfoDto);
            } else {
            	System.err.println("Invalid checkStatus value: " + rowType); // 에러 로그 출력
            }
        }
        
        if(!dataToProcess.isEmpty()) {
        	warehousesService.창고데이터저장(dataToProcess);
        }
        
        // Prepare the response data
        PlatformData respdata = new PlatformData();
        
        // Set response variables
        respdata.getVariableList().add("ErrorCode", 0);
        respdata.getVariableList().add("ErrorMsg", "SUCC");

        // Send the response
        HttpPlatformResponse res = new HttpPlatformResponse(response, PlatformType.CONTENT_TYPE_XML, "UTF-8");
        res.setData(respdata);
        res.sendData();
	}
	
	
	// 로드시 기본 데이터 가져오기
	@GetMapping("/basicData")
	public void loadBasicData (HttpServletRequest request, HttpServletResponse response) throws IOException, PlatformException {
		HttpPlatformRequest req = new HttpPlatformRequest(request.getInputStream());
        req.receiveData();
        
        List<Regions> region = warehousesService.지역데이터조회();
        List<Countries> country = warehousesService.국가데이터조회();
        List<Locations> location = warehousesService.위치데이터조회();
        
        DataSet outds = new DataSet("outDataset");
        DataSet outds2 = new DataSet("outDataset2");
        DataSet outds3 = new DataSet("outDataset3");
        
        outds.addColumn("REGION_NAME", DataTypes.STRING, 32);
        outds.addColumn("REGION_ID", DataTypes.STRING, 32);
        outds2.addColumn("COUNTRY_NAME", DataTypes.STRING, 32);
        outds2.addColumn("COUNTRY_ID", DataTypes.STRING, 32);
        outds2.addColumn("REGION_ID", DataTypes.STRING, 32);
        outds3.addColumn("LOCATION_NAME", DataTypes.STRING, 32);
        outds3.addColumn("LOCATION_ID", DataTypes.STRING, 32);
        outds3.addColumn("COUNTRY_ID", DataTypes.STRING, 32);
        
        for (Regions regions : region) {
        	int newRow = outds.newRow();
        	outds.set(newRow, "REGION_ID", regions.getRegionId());
        	outds.set(newRow, "REGION_NAME", regions.getRegionName());
          }
        
        for (Countries countries : country) {
        	int newRow2 = outds2.newRow();
        	outds2.set(newRow2, "COUNTRY_ID", countries.getCountryId());
        	outds2.set(newRow2, "COUNTRY_NAME", countries.getCountryName());
        	outds2.set(newRow2, "REGION_ID", countries.getRegions().getRegionId());
        }
        
        for (Locations locations : location) {
        	int newRow3 = outds3.newRow();
        	outds3.set(newRow3, "LOCATION_ID", locations.getLocationId());
        	outds3.set(newRow3, "LOCATION_NAME", locations.getAddress());
        	outds3.set(newRow3, "COUNTRY_ID", locations.getCountries().getCountryId());
        }
        
        // Prepare the response data
        PlatformData respdata = new PlatformData();
        respdata.addDataSet(outds);
        respdata.addDataSet(outds2);
        respdata.addDataSet(outds3);

        // Set response variables
        respdata.getVariableList().add("ErrorCode", 0);
        respdata.getVariableList().add("ErrorMsg", "SUCC");

        // Send the response
        HttpPlatformResponse res = new HttpPlatformResponse(response, PlatformType.CONTENT_TYPE_XML, "UTF-8");
        res.setData(respdata);
        res.sendData();
	}
	
	@PostMapping("/warehouseInfo")
	public void loadWarehouseInfo (HttpServletRequest request, HttpServletResponse response) throws IOException, PlatformException {
		
		HttpPlatformRequest req = new HttpPlatformRequest(request.getInputStream());
        req.receiveData();
        
        PlatformData pdata = req.getData();
        DataSet inds = pdata.getDataSet("inDataset");
        
        Long condRegion = inds.getLong(0, "condRegion");
        String condCountry = inds.getString(0, "condCountry");
        Long condLocation = inds.getLong(0, "condLocation");

        // 999 또는 "ALL" 값은 null로 바꾸기
        condRegion = (condRegion.equals(0L)) ? null : condRegion;
        condCountry = "".equals(condCountry) ? null : condCountry;
        condLocation = (condLocation.equals(0L)) ? null : condLocation;
        
        System.out.println(condRegion);
        System.out.println(condCountry);
        System.out.println(condLocation);
        
        List<Warehouses> house;
        if(condRegion != null || (condCountry != null && !condCountry.trim().isEmpty()) || (condLocation != null)) {
        	System.out.println("조건받음!");
        	house = warehousesService.조건창고데이터조회(condRegion, condCountry, condLocation);
        } else {
        	System.out.println("모든직원!");
        	house = warehousesService.모든창고데이터조회();
        }
        
        DataSet outds = new DataSet("outDataset");
        
        outds.addColumn("WAREHOUSE_ID", DataTypes.STRING, 32);
        outds.addColumn("WAREHOUSE_NAME", DataTypes.STRING, 32);
        outds.addColumn("REGION", DataTypes.STRING, 32);
        outds.addColumn("COUNTRY", DataTypes.STRING, 32);
        outds.addColumn("LOCATION", DataTypes.STRING, 32);
        outds.addColumn("ROWTYPE", DataTypes.STRING, 32);
        
        for (Warehouses warehouses : house) {
       	  int newRow = outds.newRow();
       	  outds.set(newRow, "WAREHOUSE_ID", warehouses.getWarehouseId());
       	  outds.set(newRow, "WAREHOUSE_NAME", warehouses.getWarehouseName());
       	  outds.set(newRow, "REGION",warehouses.getLocations().getCountries().getRegions().getRegionName());
       	  outds.set(newRow, "COUNTRY", warehouses.getLocations().getCountries().getCountryName());
       	  outds.set(newRow, "LOCATION", warehouses.getLocations().getAddress());
        }

        System.out.println("WAREHOUSE_INFO : " + house);
        
        // Prepare the response data
        PlatformData respdata = new PlatformData();
        respdata.addDataSet(outds);

        // Set response variables
        respdata.getVariableList().add("ErrorCode", 0);
        respdata.getVariableList().add("ErrorMsg", "SUCC");

        // Send the response
        HttpPlatformResponse res = new HttpPlatformResponse(response, PlatformType.CONTENT_TYPE_XML, "UTF-8");
        res.setData(respdata);
        res.sendData();
	}
}
