package com.nani.hyundai.web;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import com.nani.hyundai.entity.Categories;
import com.nani.hyundai.service.CategoriesService;
import com.nexacro17.xapi.data.DataSet;
import com.nexacro17.xapi.data.PlatformData;
import com.nexacro17.xapi.tx.HttpPlatformRequest;
import com.nexacro17.xapi.tx.HttpPlatformResponse;
import com.nexacro17.xapi.tx.PlatformException;
import com.nexacro17.xapi.tx.PlatformType;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Controller
public class CategoryController {
	
	private final CategoriesService categoriesService;
	
	@PostMapping("/categorySave")
	public void insertCategory(HttpServletRequest request, HttpServletResponse response) throws IOException, PlatformException {
		HttpPlatformRequest req = new HttpPlatformRequest(request.getInputStream());
        req.receiveData();
        
        PlatformData pdata = req.getData();
        DataSet inds = pdata.getDataSet("inDataset");
        
        String CategoryName = inds.getString(0, "CATEGORY_NAME");
        
        categoriesService.카테고리등록(CategoryName);
        
        PlatformData respdata = new PlatformData();
        respdata.getVariableList().add("ErrorCode", 0);
        respdata.getVariableList().add("ErrorMsg", "SUCC");

        HttpPlatformResponse res = new HttpPlatformResponse(response, PlatformType.CONTENT_TYPE_XML, "UTF-8");
        res.setData(respdata);
        res.sendData();

	}
}
