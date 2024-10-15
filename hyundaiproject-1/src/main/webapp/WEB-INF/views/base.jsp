<%@ page import="java.io.*" %>
<%@ page language="java" contentType="application/xml; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.nexacro17.xapi.data.*" %>
<%@ page import="com.nexacro17.xapi.tx.*" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<%
	out.clearBuffer();
    // Create HttpPlatformRequest and process the request data
    HttpPlatformRequest req = new HttpPlatformRequest(request.getInputStream());
    req.receiveData();
    
    PlatformData pdata = req.getData();
    
    // Get the incoming dataset and variables
    DataSet inds = pdata.getDataSet("inDataset");
    VariableList varList = pdata.getVariableList();
    
    // Create the output dataset
    DataSet outds = new DataSet("outDataset");
    outds.addColumn("EMPLOYEE_ID", DataTypes.STRING, 4);
    outds.addColumn("JOB_TITLE", DataTypes.STRING, 16);
    
    int row = outds.newRow(); 
    outds.set(row, "EMPLOYEE_ID", "A-001");
    outds.set(row, "JOB_TITLE", "aaaaa");
    
    // Prepare the response data
    PlatformData respdata = new PlatformData();
    VariableList resVarList = respdata.getVariableList();
    respdata.addDataSet(outds);
    
    resVarList.add("ErrorCode", 0);
    resVarList.add("ErrorMsg", "SUCC");
    
    // Send the response
    HttpPlatformResponse res = new HttpPlatformResponse(response, PlatformType.CONTENT_TYPE_XML, "UTF-8");
    res.setData(respdata); 
    res.sendData();
%>
