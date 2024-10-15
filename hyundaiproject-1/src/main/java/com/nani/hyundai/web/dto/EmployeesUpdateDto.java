package com.nani.hyundai.web.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class EmployeesUpdateDto {

	private String firstName;
	private String lastName;
	private String email;
	private String emailDomain;
	private String phone;
	private String jobTitle;
	private LocalDate hireDate;
}
