package com.nani.hyundai.web;

import java.io.IOException;
import java.time.LocalDate;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;

import com.nani.hyundai.service.OrderService;
import com.nexacro17.xapi.data.DataSet;
import com.nexacro17.xapi.data.PlatformData;
import com.nexacro17.xapi.tx.HttpPlatformRequest;
import com.nexacro17.xapi.tx.HttpPlatformResponse;
import com.nexacro17.xapi.tx.PlatformException;
import com.nexacro17.xapi.tx.PlatformType;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Controller
public class OrderController {
	
	private final OrderService orderService;
	
	@PostMapping("/order")
	public void order(HttpServletRequest request, HttpServletResponse response) throws IOException, PlatformException {
		HttpPlatformRequest req = new HttpPlatformRequest(request.getInputStream());
        req.receiveData();
        
        PlatformData pdata = req.getData();
        DataSet inds = pdata.getDataSet("inDataset");
        DataSet inds2 = pdata.getDataSet("inDataset2");
        
        Long customerId = inds.getLong(0, "CUSTOMER_ID");
        String status = "PENDING";
        LocalDate orderdate = LocalDate.now();
        
        System.out.println("CUSTOMER_ID : " + customerId);
        System.out.println("----------------------------");
        
        Long orderId = orderService.고객주문정보저장(customerId, status, orderdate); 
        
        for(int i=0; i<inds2.getRowCount(); i++) {
        	String checkStatus = inds2.getString(i, "CHECK");
        	Long itemId = (long) (i+1);
            Long productId = inds2.getLong(i, "PRODUCT_ID");
            Double quantity = inds2.getDouble(i, "AMOUNT");
            Double unitPrice = inds2.getDouble(i, "UNIT_PRICE");
            System.out.println(unitPrice);
            
            //체크한 목록만 주문
            if("1".equals(checkStatus)) {
            	orderService.상품주문정보저장(orderId, itemId, productId, quantity, unitPrice);
            } else if ("0".equals(checkStatus)) {
            	System.out.println("Data update skipped for checkStatus = '0'"); // 데이터 처리 x
            } else {
            	System.err.println("Invalid checkStatus value: " + checkStatus); // 에러 로그 출력
            }
        }
        
        System.out.println("저장 완료");
        System.out.println("-------------------------------");
        
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
        
}
