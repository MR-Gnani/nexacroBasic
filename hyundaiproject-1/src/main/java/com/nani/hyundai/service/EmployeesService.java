package com.nani.hyundai.service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.nani.hyundai.entity.Employees;
import com.nani.hyundai.entity.rp.EmployeesRepository;
import com.nani.hyundai.web.dto.EmployeesUpdateDto;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class EmployeesService {
	
	private final EmployeesRepository employeesRepository;
	
	@Transactional
	public void 직원삭제(int employeeId) {
		employeesRepository.deleteById(employeeId);
	}
	
	@Transactional
	public Employees 직원정보수정(int employeeId, EmployeesUpdateDto employeesUpdateDto, int managerId) {
		
		Employees empEntity = employeesRepository.findById(employeeId).orElseThrow();
		
		empEntity.setFirstName(employeesUpdateDto.getFirstName());
		empEntity.setLastName(employeesUpdateDto.getLastName());
		empEntity.setEmail(employeesUpdateDto.getEmail()+"@"+employeesUpdateDto.getEmailDomain());
		empEntity.setPhone(employeesUpdateDto.getPhone());
		empEntity.setHireDate(employeesUpdateDto.getHireDate());
		empEntity.setJobTitle(employeesUpdateDto.getJobTitle());
		
		System.out.println(managerId);
		
		if (managerId == 0) {
	        empEntity.setManager(null);
	    } else {
	        Employees manager = employeesRepository.findById(managerId).orElse(null);
	        empEntity.setManager(manager); // 여기에서 실제 매니저를 설정
	    }
		
		employeesRepository.save(empEntity);
		return empEntity;
	}
	
	@Transactional
	public Employees 직원등록(Employees employees) {
		
		if (employees.getManager() != null) {
            Employees managerEntity = employees.getManager();
            if (managerEntity.getEmployee_id() == null) {
                // 매니저 엔티티가 새로 생성된 경우 저장
                managerEntity = employeesRepository.save(managerEntity);
                employees.setManager(managerEntity);
            } else if (managerEntity.getEmployee_id() == 0) {
            	employees.setManager(null);
            } else {
                // 이미 저장된 매니저 엔티티를 데이터베이스에서 조회
                employees.setManager(employeesRepository.findById(managerEntity.getEmployee_id())
                    .orElseThrow(() -> new RuntimeException("매니저 정보를 찾을 수 없습니다.")));
            }
        }
		
		Employees employeesEntity = employeesRepository.save(employees);
		return employeesEntity;
	}
	
	@Transactional
	public List<String> 이메일도메인정보(){
		return employeesRepository.findEmailDomain();
	}
	
	@Transactional
    public List<Object[]> 매니저정보() {
        return employeesRepository.findManagerInfo();
    }
	
	@Transactional
	public List<Employees> 모든직원정보() {
		return employeesRepository.findAll();
		}
	
	@Transactional
	public List<String> 직무정보() {
		return employeesRepository.findJob();
	}
	
	@Transactional
    public List<Employees> findByConditions(String userName, String dateFrom, String dateTo, Integer managerId) {
		LocalDate fromDate = parseDate(dateFrom);
        LocalDate toDate = parseDate(dateTo);
        return employeesRepository.findByConditions(userName, fromDate, toDate, managerId);
    }
	
	// 날짜 파싱 함수
	private LocalDate parseDate(String dateStr) {
        if (dateStr == null || dateStr.trim().isEmpty()) {
            return null;
        }
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        try {
            return LocalDate.parse(dateStr, formatter);
        } catch (Exception e) {
            throw new IllegalArgumentException("Invalid date format: " + dateStr);
        }
    }
	
}
