package com.nani.hyundai.web;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;

import com.nani.hyundai.entity.Customers;
import com.nani.hyundai.service.UserService;
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
public class UserController {
	
	private final UserService userService;
	
	@PostMapping("/login")
	public void userLogin(HttpServletRequest request, HttpServletResponse response) throws IOException, PlatformException {
		HttpPlatformRequest req = new HttpPlatformRequest(request.getInputStream());
        req.receiveData();
        
        PlatformData pdata = req.getData();
        DataSet inds = pdata.getDataSet("inDataset");
        
        String userName = inds.getString(0, "NAME");
        System.out.println("NAME : " + userName);
        Customers customer = userService.유저로그인(userName);
        
        DataSet outds = new DataSet("outDataset");
        outds.addColumn("CUSTOMER_ID", DataTypes.STRING, 32);
        outds.addColumn("NAME", DataTypes.STRING, 32);
        outds.addColumn("ADDRESS", DataTypes.STRING, 32);
        outds.addColumn("WEBSITE", DataTypes.STRING, 32);
        outds.addColumn("CREDIT_LIMIT", DataTypes.STRING, 32);
        
        int newRow = outds.newRow();
        PlatformData respData = new PlatformData();
        
        if (customer == null) {
        	respData.getVariableList().add("ErrorCode", 1);
            respData.getVariableList().add("ErrorMsg", "가입되어 있지 않은 사용자입니다.");
        }else {
        	outds.set(newRow, "CUSTOMER_ID", customer.getCustomerId());
        	outds.set(newRow, "NAME", customer.getName());
        	outds.set(newRow, "ADDRESS", customer.getAddress());
        	outds.set(newRow, "WEBSITE", customer.getWebsite());
        	outds.set(newRow, "CREDIT_LIMIT", customer.getCreditLimit());
        	
        	respData.getVariableList().add("ErrorCode", 0);
            respData.getVariableList().add("ErrorMsg", "SUCC");
        }
        
        respData.addDataSet(outds);
        
        HttpPlatformResponse res = new HttpPlatformResponse(response, PlatformType.CONTENT_TYPE_XML, "UTF-8");
        res.setData(respData);
        res.sendData();
	}
}
