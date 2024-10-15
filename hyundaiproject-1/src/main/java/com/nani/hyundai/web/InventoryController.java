package com.nani.hyundai.web;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import com.nani.hyundai.entity.Categories;
import com.nani.hyundai.entity.Countries;
import com.nani.hyundai.entity.Inventories;
import com.nani.hyundai.entity.Locations;
import com.nani.hyundai.entity.Products;
import com.nani.hyundai.entity.Regions;
import com.nani.hyundai.entity.Warehouses;
import com.nani.hyundai.formatter.NumberCommaFormatter;
import com.nani.hyundai.service.InventoriesService;
import com.nani.hyundai.service.ProductsService;
import com.nani.hyundai.service.WarehousesService;
import com.nani.hyundai.web.dto.InventoryDto;
import com.nani.hyundai.web.dto.ProductDto;
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
public class InventoryController {
	
	private final WarehousesService warehousesService;
	private final InventoriesService inventoriesService;
	private final ProductsService productsService;
	
	// 재고 삭제
	@PostMapping("/deleteInventory")
	public void deleteInventory(HttpServletRequest request, HttpServletResponse response) throws IOException, PlatformException {
		HttpPlatformRequest req = new HttpPlatformRequest(request.getInputStream());
        req.receiveData();
        
        PlatformData pdata = req.getData();
        DataSet inds = pdata.getDataSet("inDataset");
        
        Long productId = inds.getLong(0, "PRODUCT_ID");
        String houseId = inds.getString(0, "WAREHOUSE_ID");
        
        int result = inventoriesService.재고삭제(productId, houseId);
        
        PlatformData respdata = new PlatformData();
        
        if (result == 0) {
            respdata.getVariableList().add("ErrorCode", 0);
            respdata.getVariableList().add("ErrorMsg", "SUCC");
        } else if (result == -1) {
            respdata.getVariableList().add("ErrorCode", 1); // Indicating an error
            respdata.getVariableList().add("ErrorMsg", "해당 상품이 주문목록에 존재합니다");
        } else {
        	System.out.println("ERROR");
        }
        
        HttpPlatformResponse res = new HttpPlatformResponse(response, PlatformType.CONTENT_TYPE_XML, "UTF-8");
        res.setData(respdata);
        res.sendData();
        
	}
	
	// 재고 등록
	@PostMapping("/saveInventory")
	public void saveInventory(HttpServletRequest request, HttpServletResponse response) throws IOException, PlatformException {
		HttpPlatformRequest req = new HttpPlatformRequest(request.getInputStream());
        req.receiveData();
        
        PlatformData pdata = req.getData();
        DataSet inds = pdata.getDataSet("inDataset");
        
        Long categoryId = inds.getLong(0, "CATEGORY_ID");
        String productName = inds.getString(0, "PRODUCT_NAME");
        String descript = inds.getString(0, "DESCRIPTION");
        Double listPrice = inds.getDouble(0, "PRICE");
       
        String houseId = inds.getString(0, "WAREHOUSE_ID");
        Integer amount = inds.getInt(0, "AMOUNT");
        Long productId = inds.getLong(0, "PRODUCT_ID");
        
        System.out.println("AMOUNT : " + amount);
        System.out.println("PRICE : " + listPrice);
        
        InventoryDto inventoryDto = InventoryDto.builder()
        							.warehouseId(houseId)
        							.quantity(amount)
        							.build();
        							
        ProductDto productDto = ProductDto.builder()
        						.productId(productId)
        						.categoryId(categoryId)
        						.productName(productName)
        						.description(descript)
        						.price(listPrice)
        						.build();
        Integer results = null;
        
        if (productId == null || productId == 0) {
            // 신규 등록 로직
        	inventoriesService.재고개별등록(productDto, inventoryDto);
        	results = 0;
        } else {
            // 수정 로직
            productDto.setProductId(productId); // 제품 ID 설정
            results = inventoriesService.재고수정(productDto, inventoryDto);
        }
        
     // Prepare the response data
        PlatformData respdata = new PlatformData();
        
        if(results == 0) {
        	// Set response variables
            respdata.getVariableList().add("ErrorCode", 0);
            respdata.getVariableList().add("ErrorMsg", "SUCC");
        } else if(results == -1) {
        	respdata.getVariableList().add("ErrorCode", -1);
            respdata.getVariableList().add("ErrorMsg", "FAIL");
        } else {
        	System.err.println("ERROR : can't response errorCode" ); // 에러 로그 출력
        }
        

        // Send the response
        HttpPlatformResponse res = new HttpPlatformResponse(response, PlatformType.CONTENT_TYPE_XML, "UTF-8");
        res.setData(respdata);
        res.sendData();
	}
	
	// 재고 일괄 등록
	@PostMapping("/batchRegist")
	public void batchRegistInventory (HttpServletRequest request, HttpServletResponse response) throws IOException, PlatformException {
		HttpPlatformRequest req = new HttpPlatformRequest(request.getInputStream());
        req.receiveData();
        
        PlatformData pdata = req.getData();
        DataSet inds = pdata.getDataSet("inDataset");
        
        Integer amount = inds.getInt(0, "AMOUNT");
        Long productId = inds.getLong(0, "PRODUCT_ID");
        
        Integer resultCode = inventoriesService.재고일괄등록(amount, productId);
        
        // Prepare the response data
        PlatformData respdata = new PlatformData();

        if (resultCode == 0) {
            // Set success response
            respdata.getVariableList().add("ErrorCode", 0);
            respdata.getVariableList().add("ErrorMsg", "SUCC");
        } else {
            // Set error response
            respdata.getVariableList().add("ErrorCode", 1); // Indicating an error
            respdata.getVariableList().add("ErrorMsg", "상품을 가지고 있는 창고가 존재하지 않습니다.");
        }
        
        // Send the response
        HttpPlatformResponse res = new HttpPlatformResponse(response, PlatformType.CONTENT_TYPE_XML, "UTF-8");
        res.setData(respdata);
        res.sendData();
	}
	
	// 최소 수량, 최대 수량 가져오기
	@PostMapping("/getMaxMinQuantity")
	public void loadMaxMinQuantity (HttpServletRequest request, HttpServletResponse response) throws IOException, PlatformException {
		HttpPlatformRequest req = new HttpPlatformRequest(request.getInputStream());
        req.receiveData();
        
        PlatformData pdata = req.getData();
        DataSet inds = pdata.getDataSet("inDataset");
        
        Long productId = inds.getLong(0, "PRODUCT_ID");
        System.out.println("PRODUCT ID : " + productId);
        
        // 최소 최대 가져오기
        Integer maxQuantity = inventoriesService.findMaxQuantityById(productId);
        Integer minQuantity = inventoriesService.findMinQuantityById(productId);
        
        // 콤마 형식으로 포맷
        String formattedMaxQuantity = NumberCommaFormatter.formatCommaInNumber(maxQuantity);
        String formattedMinQuantity = NumberCommaFormatter.formatCommaInNumber(minQuantity);
       
        
        DataSet outds = new DataSet("outDataset");
        outds.addColumn("MAX_QUANTITY", DataTypes.STRING, 32);
        outds.addColumn("MIN_QUANTITY", DataTypes.STRING, 32);
        
        int newRow = outds.newRow();
    	outds.set(newRow, "MAX_QUANTITY", formattedMaxQuantity);
    	outds.set(newRow, "MIN_QUANTITY", formattedMinQuantity);
    	
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
	
	// 조회 로직
	@PostMapping("/inventoryInfo")
	public void loadInventoryInfo (HttpServletRequest request, HttpServletResponse response) throws IOException, PlatformException {
		HttpPlatformRequest req = new HttpPlatformRequest(request.getInputStream());
        req.receiveData();
        
        PlatformData pdata = req.getData();
        DataSet inds = pdata.getDataSet("inDataset");
        
        Long condCategory = inds.getLong(0, "condCategory");
        String condProduct = inds.getString(0, "condProduct");
        String condWarehouse = inds.getString(0, "condWarehouse");
        Long condRegion = inds.getLong(0, "condRegion");
        String condCountry = inds.getString(0, "condCountry");
        Long condLocation = inds.getLong(0, "condLocation");
        
        condCountry = (condCountry.equals("")) ? null : condCountry;
        condCategory = (condCategory.equals(0L)) ? null : condCategory;
        condRegion = (condRegion.equals(0L)) ? null : condRegion;
        condLocation = (condLocation.equals(0L)) ? null : condLocation;
        
        System.out.println("condCategory : " + condCategory);
        System.out.println("condProduct : " + condProduct);
        System.out.println("condWarehouse : " + condWarehouse);
        System.out.println("condRegion : " + condRegion);
        System.out.println("condCountry : " + condCountry);
        System.out.println("condLocation : " + condLocation);
        
        List<Inventories> inventory;
        if(condRegion != null || (condCountry != null && !condCountry.trim().isEmpty()) || (condLocation != null) || 
           condCategory != null || (condProduct != null && !condProduct.trim().isEmpty()) || (condWarehouse != null && !condWarehouse.trim().isEmpty())){
        	System.out.println("조건받음!");
        	inventory = inventoriesService.조건재고데이터조회(condCategory, condProduct, condWarehouse, condRegion, condCountry, condLocation);
        } else {
        	System.out.println("모든재고!");
        	inventory = inventoriesService.모든재고데이터조회();
        }
        
        DataSet outds = new DataSet("outDataset");
        
        outds.addColumn("AMOUNT", DataTypes.STRING, 32);
        outds.addColumn("CATEGORY_ID", DataTypes.STRING, 32);
        outds.addColumn("CATEGORY", DataTypes.STRING, 32);
        outds.addColumn("PRODUCT_ID", DataTypes.STRING, 32);
        outds.addColumn("PRODUCT_NAME", DataTypes.STRING, 32);
        outds.addColumn("REGION", DataTypes.STRING, 32);
        outds.addColumn("COUNTRY", DataTypes.STRING, 32);
        outds.addColumn("LOCATION", DataTypes.STRING, 32);
        outds.addColumn("WAREHOUSE_NAME", DataTypes.STRING, 32);
        outds.addColumn("WAREHOUSE_ID", DataTypes.STRING, 32);
        outds.addColumn("DESCRIPTION", DataTypes.STRING, 32);
        
        for  (Inventories inventories : inventory) {
        	int newRow = outds.newRow();
        	
        	String formattedAmount = NumberCommaFormatter.formatCommaInNumber(inventories.getQuantity());
        	
        	outds.set(newRow, "AMOUNT", formattedAmount);
        	outds.set(newRow, "CATEGORY_ID", inventories.getProduct().getCategory().getCategoryId());
        	outds.set(newRow, "CATEGORY", inventories.getProduct().getCategory().getCategoryName());
        	outds.set(newRow, "PRODUCT_ID", inventories.getProduct().getProductId());
        	outds.set(newRow, "PRODUCT_NAME", inventories.getProduct().getProductName());
        	outds.set(newRow, "REGION", inventories.getWarehouse().getLocations().getCountries().getRegions().getRegionName());
        	outds.set(newRow, "COUNTRY", inventories.getWarehouse().getLocations().getCountries().getCountryName());
        	outds.set(newRow, "LOCATION", inventories.getWarehouse().getLocations().getAddress());
        	outds.set(newRow, "WAREHOUSE_ID", inventories.getWarehouse().getWarehouseId());
        	outds.set(newRow, "WAREHOUSE_NAME", inventories.getWarehouse().getWarehouseName());
        	outds.set(newRow, "DESCRIPTION", inventories.getProduct().getDescription());
        }
        
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
	
	// 상품명에 맞는 데이터 가져오기
	@PostMapping("/loadMatchData")
	public void loadMatchData (HttpServletRequest request, HttpServletResponse response) throws IOException, PlatformException {
		HttpPlatformRequest req = new HttpPlatformRequest(request.getInputStream());
        req.receiveData();
        
        PlatformData pdata = req.getData();
        DataSet inds = pdata.getDataSet("inDataset");
        
        String productName = inds.getString(0, "PRODUCT_NAME");
        
        
        List<Products> product = productsService.findProductByName(productName);
        
        DataSet outds = new DataSet("outDataset");
        outds.addColumn("PRODUCT_ID", DataTypes.STRING, 32);
        outds.addColumn("PRODUCT_NAME", DataTypes.STRING, 32);
        outds.addColumn("PRICE", DataTypes.STRING, 32);
        outds.addColumn("DESCRIPTION", DataTypes.STRING, 32);
        
        for (Products products : product) {
        	int newRow = outds.newRow();
        	
        	String formattedPrice = NumberCommaFormatter.formatCommaInNumberDouble(products.getListPrice());
        	
        	outds.set(newRow, "PRODUCT_ID", products.getProductId());
        	outds.set(newRow, "PRODUCT_NAME", products.getProductName());
        	outds.set(newRow, "PRICE", formattedPrice);
        	outds.set(newRow, "DESCRIPTION", products.getDescription());
          }
        
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
	
	// 로드시 기본 데이터 가져오기
	@GetMapping("/baseData")
	public void loadDataOnInventory (HttpServletRequest request, HttpServletResponse response) throws IOException, PlatformException {
		HttpPlatformRequest req = new HttpPlatformRequest(request.getInputStream());
        req.receiveData();
        
        List<Regions> region = warehousesService.지역데이터조회();
        List<Countries> country = warehousesService.국가데이터조회();
        List<Locations> location = warehousesService.위치데이터조회();
        List<Categories> category = inventoriesService.카테고리데이터조회();
        List<Warehouses> warehouse = warehousesService.모든창고데이터조회();
        
        DataSet outds = new DataSet("outDataset");
        DataSet outds2 = new DataSet("outDataset2");
        DataSet outds3 = new DataSet("outDataset3");
        DataSet outds4 = new DataSet("outDataset4");
        DataSet outds5 = new DataSet("outDataset5");
        
        outds.addColumn("REGION_NAME", DataTypes.STRING, 32);
        outds.addColumn("REGION_ID", DataTypes.STRING, 32);
        
        outds2.addColumn("COUNTRY_NAME", DataTypes.STRING, 32);
        outds2.addColumn("COUNTRY_ID", DataTypes.STRING, 32);
        outds2.addColumn("REGION_ID", DataTypes.STRING, 32);
        
        outds3.addColumn("LOCATION_NAME", DataTypes.STRING, 32);
        outds3.addColumn("LOCATION_ID", DataTypes.STRING, 32);
        outds3.addColumn("COUNTRY_ID", DataTypes.STRING, 32);
        
        outds4.addColumn("CATEGORY_ID", DataTypes.STRING, 32);
        outds4.addColumn("CATEGORY_NAME", DataTypes.STRING, 32);
        
        outds5.addColumn("WAREHOUSE_ID", DataTypes.STRING, 32);
        outds5.addColumn("WAREHOUSE_NAME", DataTypes.STRING, 32);
        outds5.addColumn("LOCATION_ID", DataTypes.STRING, 32);
        
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
        
        for (Categories categorys : category) {
        	int newRow4 = outds4.newRow();
        	outds4.set(newRow4, "CATEGORY_ID", categorys.getCategoryId());
        	outds4.set(newRow4, "CATEGORY_NAME", categorys.getCategoryName());
        }
        
        for (Warehouses warehouses : warehouse) {
        	int newRow5 = outds5.newRow();
        	outds5.set(newRow5, "WAREHOUSE_ID", warehouses.getWarehouseId());
        	outds5.set(newRow5, "WAREHOUSE_NAME", warehouses.getWarehouseName());
        	outds5.set(newRow5, "LOCATION_ID", warehouses.getLocations().getLocationId());
        }
        
     // Prepare the response data
        PlatformData respdata = new PlatformData();
        respdata.addDataSet(outds);
        respdata.addDataSet(outds2);
        respdata.addDataSet(outds3);
        respdata.addDataSet(outds4);
        respdata.addDataSet(outds5);

        // Set response variables
        respdata.getVariableList().add("ErrorCode", 0);
        respdata.getVariableList().add("ErrorMsg", "SUCC");

        // Send the response
        HttpPlatformResponse res = new HttpPlatformResponse(response, PlatformType.CONTENT_TYPE_XML, "UTF-8");
        res.setData(respdata);
        res.sendData();
	}

}
