package com.nani.hyundai.entity;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class Employees {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "emp_seq")
	@SequenceGenerator(name = "emp_seq", sequenceName = "SEQ_BS_EMPID", allocationSize = 1, initialValue = 200)
	private Integer employee_id;
	
	@Column(name = "LAST_NAME")
	private String lastName;
	
	@Column(name = "FIRST_NAME")
	private String firstName;
	
	@Column
	private String email;
	
	@Column
	private String phone;
	
	@Column(name = "hire_date")
	private LocalDate hireDate;
	
	@ManyToOne
	@JoinColumn(name = "manager_id")
	private Employees manager; // 셀프조인
	
	public Employees(Integer managerId) {
        this.employee_id = managerId; // 매니저 ID로 객체 생성
    }
	
	@Column(name = "job_title")
	private String jobTitle;
	
	@Override
	public String toString() {
		return "Employees [employee_id=" + employee_id + ", lastName=" + lastName 
				+ ", email=" + email + ", phone=" + phone + ", hireDate=" + hireDate + ", manager=" + manager
				+ ", jobTitle=" + jobTitle + "]";
	}
	
}
