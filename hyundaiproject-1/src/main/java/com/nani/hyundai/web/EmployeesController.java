package com.nani.hyundai.web;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import com.nani.hyundai.entity.Employees;
import com.nani.hyundai.formatter.CustomDateTimeFormatter;
import com.nani.hyundai.formatter.PhoneNumberFormatter;
import com.nani.hyundai.service.EmployeesService;
import com.nani.hyundai.web.dto.EmployeesInfoDto;
import com.nani.hyundai.web.dto.EmployeesUpdateDto;
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
public class EmployeesController {

		private final EmployeesService employeesService;
		
		@PostMapping("/delete")
		public void deleteEmployees(HttpServletRequest request, HttpServletResponse response) throws IOException, PlatformException {
			HttpPlatformRequest req = new HttpPlatformRequest(request.getInputStream());
	        req.receiveData();
	        
	        PlatformData pdata = req.getData();
	        DataSet inds = pdata.getDataSet("inDataset");
	        
	        Integer employeeId = inds.getInt(0, "EMPLOYEE_ID");
	        employeesService.직원삭제(employeeId);
	        
	        PlatformData respdata = new PlatformData();
	        respdata.getVariableList().add("ErrorCode", 0);
	        respdata.getVariableList().add("ErrorMsg", "SUCC");

	        HttpPlatformResponse res = new HttpPlatformResponse(response, PlatformType.CONTENT_TYPE_XML, "UTF-8");
	        res.setData(respdata);
	        res.sendData();
		}
		
		// 직원정보 수정
		@PostMapping("/update")
		public void updateEmployees(HttpServletRequest request, HttpServletResponse response) throws IOException, PlatformException {
			HttpPlatformRequest req = new HttpPlatformRequest(request.getInputStream());
	        req.receiveData();
	        
	        PlatformData pdata = req.getData();
	        DataSet inds = pdata.getDataSet("inDataset");
	        
	        Integer employeeId = inds.getInt(0, "EMPLOYEE_ID");
	        String firstName = inds.getString(0, "FIRST_NAME");
	        String lastName = inds.getString(0, "LAST_NAME");
	        String email = inds.getString(0, "EMAIL");
	        String phone = inds.getString(0, "PHONE");
	        String hireDateStr = inds.getString(0, "HIRE_DATE");
	        Integer managerId = inds.getInt(0, "MANAGER_ID");
	        String jobTitle = inds.getString(0, "JOB_TITLE");
	        String emailDomain = inds.getString(0, "EMAIL_DOMAIN");
	 
	        System.out.println("Received Employee Data:");
	        System.out.printf("%-20s: %s%n", "First Name", firstName);
	        System.out.printf("%-20s: %s%n", "Last Name", lastName);
	        System.out.printf("%-20s: %s%n", "Email", email + "@" + emailDomain);
	        System.out.printf("%-20s: %s%n", "Phone", phone);
	        System.out.printf("%-20s: %s%n", "Hire Date", hireDateStr);
	        System.out.printf("%-20s: %d%n", "Manager ID", managerId);
	        System.out.printf("%-20s: %s%n", "Job Title", jobTitle);
	        
	        String formattedPhone = PhoneNumberFormatter.formatPhoneNumber(phone);
	        LocalDate hireDate = CustomDateTimeFormatter.parseDate(hireDateStr);
	        
	        EmployeesUpdateDto employeesUpdateDto = EmployeesUpdateDto.builder()
	        													.firstName(firstName)
	        													.lastName(lastName)
	        													.email(email)
	        													.phone(formattedPhone)
	        													.hireDate(hireDate)
	        													.jobTitle(jobTitle)
	        													.emailDomain(emailDomain)
	        													.build();	
	        	        
	        Employees empEntity = employeesService.직원정보수정(employeeId, employeesUpdateDto, managerId);
	     
	        DataSet outds = new DataSet("outDataset");
	        outds.addColumn("EMPLOYEE_ID", DataTypes.STRING, 4);
	        outds.addColumn("FIRST_NAME", DataTypes.STRING, 64);
	        outds.addColumn("LAST_NAME", DataTypes.STRING, 64);
	        outds.addColumn("JOB_TITLE", DataTypes.STRING, 16);
	        outds.addColumn("EMAIL_DOMAIN", DataTypes.STRING, 64);
	        outds.addColumn("EMAIL", DataTypes.STRING, 32);
	        outds.addColumn("HIRE_DATE", DataTypes.STRING, 16);
	        outds.addColumn("MANAGER_ID", DataTypes.STRING, 4);
	        outds.addColumn("PHONE", DataTypes.STRING, 64);
	        
	        String fullEmail = empEntity.getEmail();
	        String[] eIndex = fullEmail.split("@");
	        
	        String parsedHireDate = CustomDateTimeFormatter.parseDate2(empEntity.getHireDate());
	        String splitedEmail = eIndex[0];
	        String splitedEmailDomain = eIndex[1];
	        
	        int newRow = outds.newRow();
	        if(managerId == 0) {
		        outds.set(newRow, "EMPLOYEE_ID", empEntity.getEmployee_id());
		        outds.set(newRow, "FIRST_NAME", empEntity.getFirstName());
		        outds.set(newRow, "LAST_NAME", empEntity.getLastName());
		        outds.set(newRow, "EMAIL", splitedEmail);
		        outds.set(newRow, "PHONE", empEntity.getPhone());
		        outds.set(newRow, "HIRE_DATE", parsedHireDate);
		        outds.set(newRow, "MANAGER_ID", 0);
		        outds.set(newRow, "JOB_TITLE", empEntity.getJobTitle());
		        outds.set(newRow, "EMAIL_DOMAIN", splitedEmailDomain);
	        } else {
	        	outds.set(newRow, "EMPLOYEE_ID", empEntity.getEmployee_id());
		        outds.set(newRow, "FIRST_NAME", empEntity.getFirstName());
		        outds.set(newRow, "LAST_NAME", empEntity.getLastName());
		        outds.set(newRow, "EMAIL", splitedEmail);
		        outds.set(newRow, "PHONE", empEntity.getPhone());
		        outds.set(newRow, "HIRE_DATE", parsedHireDate);
		        outds.set(newRow, "MANAGER_ID", empEntity.getManager().getEmployee_id());
		        outds.set(newRow, "JOB_TITLE", empEntity.getJobTitle());
		        outds.set(newRow, "EMAIL_DOMAIN", splitedEmailDomain);
	        }
	      
	        
	        System.out.println("########### : " + parsedHireDate);
	        
	        PlatformData respdata = new PlatformData();
	        respdata.addDataSet(outds);
	        respdata.getVariableList().add("ErrorCode", 0);
	        respdata.getVariableList().add("ErrorMsg", "SUCC");

	        HttpPlatformResponse res = new HttpPlatformResponse(response, PlatformType.CONTENT_TYPE_XML, "UTF-8");
	        res.setData(respdata);
	        res.sendData();
		}
		
		// 데이터 삽입
		@PostMapping("/insertEmployees")
		public void insertEmployees(HttpServletRequest request, HttpServletResponse response) throws IOException, PlatformException {
			HttpPlatformRequest req = new HttpPlatformRequest(request.getInputStream());
	        req.receiveData();
	        
	        PlatformData pdata = req.getData();
	        DataSet inds = pdata.getDataSet("inDataset");
	        
	        String firstName = inds.getString(0, "FIRST_NAME");
	        String lastName = inds.getString(0, "LAST_NAME");
	        String email = inds.getString(0, "EMAIL");
	        String phone = inds.getString(0, "PHONE");
	        String hireDateStr = inds.getString(0, "HIRE_DATE");
	        Integer managerId = inds.getInt(0, "MANAGER_ID");
	        String jobTitle = inds.getString(0, "JOB_TITLE");
	        String emailDomain = inds.getString(0, "EMAIL_DOMAIN");
	        
	        System.out.println("MANAGER_ID : " + managerId);
	        
	        // 날짜 전화번호 형식 맞추기
	        String formattedPhone = PhoneNumberFormatter.formatPhoneNumber(phone);
	        LocalDate hireDate = CustomDateTimeFormatter.parseDate(hireDateStr);
	        
	        // DTO 생성
	        EmployeesInfoDto employeesInfoDto = EmployeesInfoDto.builder()
	        													.firstName(firstName)
	        													.lastName(lastName)
	        													.email(email)
	        													.phone(formattedPhone)
	        													.hireDate(hireDate)
	        													.jobTitle(jobTitle)
	        													.managerId(managerId)
	        													.emailDomain(emailDomain)
	        													.build();	
	        
	        // 매니저 객체 생성
	        Employees manager = (managerId != null && managerId != 0) ? new Employees(managerId) : null;
	        
	        // Entity로 변환
	        Employees employeeEntity = employeesInfoDto.toEntity(manager);
	        
	        employeesService.직원등록(employeeEntity);
	      
	        PlatformData respdata = new PlatformData();
	        respdata.getVariableList().add("ErrorCode", 0);
	        respdata.getVariableList().add("ErrorMsg", "SUCC");

	        HttpPlatformResponse res = new HttpPlatformResponse(response, PlatformType.CONTENT_TYPE_XML, "UTF-8");
	        res.setData(respdata);
	        res.sendData();

		}
		
		// 로드 시 매니저정보 및 직무정보 가져오기
		@GetMapping("/mgrInfo")
		public void getMgrData(HttpServletRequest request, HttpServletResponse response) throws IOException, PlatformException { 
			HttpPlatformRequest req = new HttpPlatformRequest(request.getInputStream());
	        req.receiveData();
	 
	        List<Object[]> receivedManager = employeesService.매니저정보();
	        List<String> receivedJob = employeesService.직무정보();
	        List<String> receivedEmail = employeesService.이메일도메인정보();
	        
	        DataSet outds = new DataSet("outDataset");
	        DataSet outds_job = new DataSet("outDataset2");
	        DataSet outds_email = new DataSet("outDataset3");
	        
	        outds.addColumn("MANAGER_ID", DataTypes.STRING, 4);
	        outds.addColumn("FIRST_NAME", DataTypes.STRING, 8);
	        outds_job.addColumn("JOB_TITLE", DataTypes.STRING, 32);
	        outds_email.addColumn("EMAIL_DOMAIN", DataTypes.STRING, 32);
	        
	        //System.out.println("MANAGER INFO" + receivedManager);
	        //System.out.println("JOB INFO" + receivedJob);
	        
	        for (Object[] row : receivedManager) {
	        	 String managerId = row[0].toString();
	        	 String managerfName = (String) row[1];
	        	 String managerlName = (String) row[2];
	        	 String managerName = managerfName + " " + managerlName;
	        	 
	        	 int newRow = outds.newRow();
	             outds.set(newRow, "MANAGER_ID", managerId);
	             outds.set(newRow, "FIRST_NAME", managerName);
	        } 
	        
	        for (String jobTitle : receivedJob) {
	        	 int newRow2 = outds_job.newRow();
	        	 outds_job.set(newRow2, "JOB_TITLE", jobTitle);
	        }
	        
	        for (String email : receivedEmail) {
	        	 int newRow3 = outds_email.newRow();
	        	 outds_email.set(newRow3, "EMAIL_DOMAIN", email);
	        }

	        PlatformData respdata = new PlatformData();
	        respdata.addDataSet(outds);
	        respdata.addDataSet(outds_job);
	        respdata.addDataSet(outds_email);
	        
	        respdata.getVariableList().add("ErrorCode", 0);
	        respdata.getVariableList().add("ErrorMsg", "SUCC");

	        HttpPlatformResponse res = new HttpPlatformResponse(response, PlatformType.CONTENT_TYPE_XML, "UTF-8");
	        res.setData(respdata);
	        res.sendData();
		}
		
		// 데이터 조회
	    @PostMapping("/base")
	    public void handlePostRequest(HttpServletRequest request, HttpServletResponse response) throws IOException, PlatformException {
	       
	    	HttpPlatformRequest req = new HttpPlatformRequest(request.getInputStream());
	        req.receiveData();

	        PlatformData pdata = req.getData();
	        DataSet inds = pdata.getDataSet("inDataset");
	        
	        String sendName = inds.getString(0, "sendName");
	        String sendDateFrom = inds.getString(0, "sendDateFrom");
	        String sendDateTo = inds.getString(0, "sendDateTo");
	        Integer sendMgr	= inds.getInt(0, "sendMgr");
	        
	        System.out.println(sendName);
	        System.out.println(sendDateFrom);
	        System.out.println(sendDateTo);
	        System.out.println(sendMgr);
	        
	        List<Employees> receivedEmployee;
	        if(sendName != null && !sendName.trim().isEmpty() || (sendDateFrom != null && !sendDateFrom.trim().isEmpty()) || (sendDateTo != null && !sendDateTo.trim().isEmpty()) || (sendMgr != null && sendMgr != 0 )) {
	        	System.out.println("이름받음!");
	        	receivedEmployee = employeesService.findByConditions(sendName, sendDateFrom, sendDateTo, sendMgr);
	        } else {
	        	System.out.println("모든직원!");
	        	receivedEmployee = employeesService.모든직원정보();
	        }

	        DataSet outds = new DataSet("outDataset");
	        outds.addColumn("EMPLOYEE_ID", DataTypes.STRING, 4);
	        outds.addColumn("JOB_TITLE", DataTypes.STRING, 16);
	        outds.addColumn("FULL_NAME", DataTypes.STRING, 64);
	        outds.addColumn("EMAIL", DataTypes.STRING, 32);
	        outds.addColumn("HIRE_DATE", DataTypes.STRING, 16);
	        outds.addColumn("MANAGER_ID", DataTypes.STRING, 4);
	        outds.addColumn("PHONE", DataTypes.STRING, 64);
	        
	        for (Employees employees : receivedEmployee) {
	            int row = outds.newRow();
	            outds.set(row, "EMPLOYEE_ID", employees.getEmployee_id());
	            outds.set(row, "JOB_TITLE", employees.getJobTitle());
	            outds.set(row, "FULL_NAME", employees.getFirstName()+" "+employees.getLastName());
	            outds.set(row, "EMAIL", employees.getEmail());
	            outds.set(row, "HIRE_DATE", employees.getHireDate());
	            
	            String phone = employees.getPhone();
	            String formattedPhone = phone.replace(".", "");
	            outds.set(row, "PHONE", formattedPhone);
	            
	            if (employees.getManager() != null) {
	                outds.set(row, "MANAGER_ID",
	                		  employees.getManager().getFirstName() + " " + employees.getManager().getLastName());
	            } else {
	                outds.set(row, "MANAGER_ID", employees.getManager());
	            }
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
