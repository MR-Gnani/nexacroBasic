package com.nani.hyundai.web.dto;

import java.time.LocalDate;

import com.nani.hyundai.entity.Employees;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class EmployeesInfoDto {
	
	private String firstName;
	private String lastName;
	private String email;
	private String phone;
	private LocalDate hireDate;
	private Integer managerId;
	private String jobTitle;
	private String emailDomain;
	
	public Employees toEntity(Employees manager) {
		String fullEmail = email + "@" + emailDomain;
		
		return Employees.builder()
						.firstName(firstName)
						.lastName(lastName)
						.email(fullEmail)
						.phone(phone)
						.hireDate(hireDate)
						.manager(manager)
						.jobTitle(jobTitle)
						.build();	
	}
}
