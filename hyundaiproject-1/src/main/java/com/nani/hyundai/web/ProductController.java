package com.nani.hyundai.web;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import com.nani.hyundai.entity.Categories;
import com.nani.hyundai.entity.Products;
import com.nani.hyundai.service.InventoriesService;
import com.nani.hyundai.service.ProductsService;
import com.nani.hyundai.web.dto.PivotDto;
import com.nani.hyundai.web.dto.ProductCountCategoryDto;
import com.nani.hyundai.web.dto.ProductDetailsDto;
import com.nani.hyundai.web.dto.ProductListDto;
import com.nani.hyundai.web.dto.ProductsByCateogoryPivotDto;
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
public class ProductController {

	private final ProductsService productsService;
	private final InventoriesService inventoriesService;
	
	@GetMapping("/loadCategoryInfo")
	public void loadCategoryInfo(HttpServletRequest request, HttpServletResponse response) throws IOException, PlatformException {
		
        List<Categories> category = inventoriesService.카테고리데이터조회();
        
        DataSet outds = new DataSet("outDataset");
        
        outds.addColumn("CATEGORY_ID", DataTypes.STRING, 32);
        outds.addColumn("CATEGORY_NAME", DataTypes.STRING, 32);
        
        for (Categories categorys : category) {
        	int newRow4 = outds.newRow();
        	outds.set(newRow4, "CATEGORY_ID", categorys.getCategoryId());
        	outds.set(newRow4, "CATEGORY_NAME", categorys.getCategoryName());
        }
        
        PlatformData respdata = new PlatformData();
        respdata.addDataSet(outds);
        
        respdata.getVariableList().add("ErrorCode", 0);
        respdata.getVariableList().add("ErrorMsg", "SUCC");
        
        HttpPlatformResponse res = new HttpPlatformResponse(response, PlatformType.CONTENT_TYPE_XML, "UTF-8");
        res.setData(respdata);
        res.sendData();
	}
	
	
	@GetMapping("/showAllProductList")
	public void showAllProductList(HttpServletRequest request, HttpServletResponse response) throws IOException, PlatformException {
		
        List<ProductListDto> product = productsService.전체상품조회();
        
        DataSet outds = new DataSet("outDataset");
        DataSet outds2 = new DataSet("outDataset2");
        
        outds.addColumn("PRODUCT_ID", DataTypes.STRING, 32);
        outds.addColumn("PRODUCT_NAME", DataTypes.STRING, 32);
        outds.addColumn("PRICE", DataTypes.STRING, 32);
        outds.addColumn("AMOUNT", DataTypes.STRING, 32);
        outds.addColumn("AFTER_AMOUNT", DataTypes.STRING, 32);
        
        outds2.addColumn("PRODUCT_ID", DataTypes.STRING, 32);
        outds2.addColumn("AMOUNT", DataTypes.STRING, 32);
        
        for(ProductListDto products : product) {
        	int newRow = outds.newRow();
        	outds.set(newRow, "PRODUCT_ID", products.getProductId());
        	outds.set(newRow, "PRODUCT_NAME", products.getProductName());
        	outds.set(newRow, "PRICE", products.getPrice());
        	outds.set(newRow, "AFTER_AMOUNT", products.getQuantity());
        }
        
        for(ProductListDto products : product) {
        	int newRow = outds2.newRow();
        	outds2.set(newRow, "PRODUCT_ID", products.getProductId());
        	outds2.set(newRow, "AMOUNT", products.getQuantity());
        }
        
        PlatformData respdata = new PlatformData();
        respdata.addDataSet(outds);
        respdata.addDataSet(outds2);

        respdata.getVariableList().add("ErrorCode", 0);
        respdata.getVariableList().add("ErrorMsg", "SUCC");

        HttpPlatformResponse res = new HttpPlatformResponse(response, PlatformType.CONTENT_TYPE_XML, "UTF-8");
        res.setData(respdata);
        res.sendData();
	}
	
	
	// 카테고리별 제품 목록 리스트
	@PostMapping("/loadProductList")
	public void loadProductList(HttpServletRequest request, HttpServletResponse response) throws IOException, PlatformException {
		HttpPlatformRequest req = new HttpPlatformRequest(request.getInputStream());
        req.receiveData();
        
        PlatformData pdata = req.getData();
        DataSet inds = pdata.getDataSet("inDataset");
        
        Long categoryId = inds.getLong(0, "CATEGORY_ID");
        
        List<ProductDetailsDto> detailEntity = productsService.카테고리별제품리스트(categoryId);
        
        DataSet outds = new DataSet("outDataset");
        
        outds.addColumn("PRODUCT_ID", DataTypes.STRING, 32);
        outds.addColumn("PRODUCT_NAME", DataTypes.STRING, 32);
        outds.addColumn("AMOUNT", DataTypes.STRING, 32);
        outds.addColumn("CUM_QUANTITY", DataTypes.STRING, 32);
        outds.addColumn("CUM_PRICE", DataTypes.STRING, 32);
        
        for (ProductDetailsDto dtos : detailEntity) {
        	int newRow = outds.newRow();
        	outds.set(newRow, "PRODUCT_ID", dtos.getProductId());
        	outds.set(newRow, "PRODUCT_NAME", dtos.getProductName());
        	outds.set(newRow, "AMOUNT", dtos.getRemainingStock());
        	outds.set(newRow, "CUM_QUANTITY", dtos.getCumQuantity());
        	outds.set(newRow, "CUM_PRICE", dtos.getCumPrice());
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
	
	// 주문목록리스트 카테고리별 제품 개수
	@PostMapping("/loadProductByCategoryPivot")
	public void loadProductByCategoryPivot(HttpServletRequest request, HttpServletResponse response) throws IOException, PlatformException {
		
		HttpPlatformRequest req = new HttpPlatformRequest(request.getInputStream());
        req.receiveData();
        
        PlatformData pdata = req.getData();
        DataSet inds = pdata.getDataSet("inDataset");
        
        Long sendCategory = inds.getLong(0, "sendCategory");
        String sendProductName	= inds.getString(0, "sendProduct");
        String sendDateFrom = inds.getString(0, "sendFrom");
        String sendDateTo = inds.getString(0, "sendTo");
        
        System.out.println(sendCategory);
        System.out.println(sendProductName);
        System.out.println(sendDateFrom);
        System.out.println(sendDateTo);
        
        sendCategory = (sendCategory.equals(0L)) ? null : sendCategory;
		
		PivotDto pivotEntity = productsService.카테고리별제품목록(sendCategory, sendProductName, sendDateFrom, sendDateTo);
		
		DataSet outds = new DataSet("outDataset");
		DataSet outds2 = new DataSet("outDataset2");
        
		outds.addColumn("CATEGORY_ID", DataTypes.STRING, 32);
        outds.addColumn("CATEGORY_NAME", DataTypes.STRING, 32);
        outds.addColumn("PRODUCT_NAME", DataTypes.STRING, 32);
        outds.addColumn("ORDER_YEAR", DataTypes.STRING, 32);
        outds.addColumn("ORDER_MONTH", DataTypes.STRING, 32);
        outds.addColumn("ORDER_COUNT", DataTypes.STRING, 32);
        
        outds2.addColumn("YEAR", DataTypes.STRING, 32);
        outds2.addColumn("MONTH", DataTypes.STRING, 32);
        outds2.addColumn("COL_NO", DataTypes.STRING, 32);	        
        for (ProductsByCateogoryPivotDto dtos : pivotEntity.getPivotDtoList()) {
        	int newRow = outds.newRow();
        	outds.set(newRow, "CATEGORY_ID", dtos.getCategoryId());
        	outds.set(newRow, "CATEGORY_NAME", dtos.getCategoryName());
        	outds.set(newRow, "PRODUCT_NAME", dtos.getProductName());
        	outds.set(newRow, "ORDER_YEAR", dtos.getOrderYear());
        	outds.set(newRow, "ORDER_MONTH", dtos.getOrderMonth());
        	outds.set(newRow, "ORDER_COUNT", dtos.getOrderCount());
        }
        
        for (Map.Entry<Long, List<Long>> entry : pivotEntity.getYearMonthMap().entrySet()) {
            Long year = entry.getKey();
            for (Long month : entry.getValue()) {
                int newRow = outds2.newRow();
                outds2.set(newRow, "YEAR", year);
                outds2.set(newRow, "MONTH", month);
            }
        }
        
        // Prepare the response data
        PlatformData respdata = new PlatformData();
        respdata.addDataSet(outds);
        respdata.addDataSet(outds2);

        // Set response variables
        respdata.getVariableList().add("ErrorCode", 0);
        respdata.getVariableList().add("ErrorMsg", "SUCC");

        // Send the response
        HttpPlatformResponse res = new HttpPlatformResponse(response, PlatformType.CONTENT_TYPE_XML, "UTF-8");
        res.setData(respdata);
        res.sendData();
	}
	
	// 주문목록리스트 카테고리별 제품 개수
	@GetMapping("/loadProductByCategory")
	public void loadProductByCategory(HttpServletRequest request, HttpServletResponse response) throws IOException, PlatformException {
		
		List<ProductCountCategoryDto> countEntity = productsService.카테고리별제품개수();
		
		DataSet outds = new DataSet("outDataset");
        
		outds.addColumn("CATEGORY_ID", DataTypes.STRING, 32);
        outds.addColumn("CATEGORY_NAME", DataTypes.STRING, 32);
        outds.addColumn("COUNT", DataTypes.STRING, 32);
        
        for (ProductCountCategoryDto dtos : countEntity) {
        	int newRow = outds.newRow();
        	outds.set(newRow, "CATEGORY_ID", dtos.getCategoryId());
        	outds.set(newRow, "CATEGORY_NAME", dtos.getCategoryName());
        	outds.set(newRow, "COUNT", dtos.getCount());
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
	
	@GetMapping("/productData")
	public void loadProductData(HttpServletRequest request, HttpServletResponse response) throws IOException, PlatformException {
		
		HttpPlatformRequest req = new HttpPlatformRequest(request.getInputStream());
        req.receiveData();
        
        List<Products> product = productsService.상품데이터조회();
        
        DataSet outds = new DataSet("outDataset");
        
        outds.addColumn("PRODUCT_ID", DataTypes.STRING, 32);
        outds.addColumn("PRODUCT_NAME", DataTypes.STRING, 32);
        outds.addColumn("CATEGORY_ID", DataTypes.STRING, 32);
        
        for (Products products : product) {
        	int newRow = outds.newRow();
        	outds.set(newRow, "PRODUCT_ID", products.getProductId());
        	outds.set(newRow, "PRODUCT_NAME", products.getProductName());
        	outds.set(newRow, "CATEGORY_ID", products.getCategory().getCategoryId());
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
}
