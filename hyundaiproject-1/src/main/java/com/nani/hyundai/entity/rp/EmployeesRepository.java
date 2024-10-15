package com.nani.hyundai.entity.rp;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.nani.hyundai.entity.Employees;

public interface EmployeesRepository extends JpaRepository<Employees, Integer> {
	
	//전체 직원 조회
	@Query("SELECT e FROM Employees e " +
		       "LEFT JOIN e.manager m " +
			   "ORDER BY e.employee_id ASC")
	List<Employees> findAll();
	
	@Query("SELECT e FROM Employees e " +
			   "LEFT JOIN e.manager m " +
		       "WHERE UPPER(e.firstName) LIKE UPPER(CONCAT('%', :userName, '%'))")
	List<Employees> findByUserName(String userName);
	
	@Query("SELECT DISTINCT SUBSTRING(e.email, LOCATE('@', e.email) + 1) FROM Employees e WHERE e.email IS NOT NULL")
	List<String> findEmailDomain();
	
	@Query("SELECT DISTINCT e.jobTitle FROM Employees e")
	List<String> findJob();
	
	@Query("SELECT e FROM Employees e " +
		       "LEFT JOIN e.manager m " +
			   "WHERE (:userName IS NULL OR (UPPER(e.firstName) LIKE UPPER(CONCAT('%', :userName, '%')) " +
			       "OR UPPER(e.lastName) LIKE UPPER(CONCAT('%', :userName, '%')))) " +
			       "AND (:dateFrom IS NULL OR e.hireDate >= :dateFrom) " +
			       "AND (:dateTo IS NULL OR e.hireDate <= :dateTo) " +
			       "AND (:managerId IS NULL OR :managerId IS 0 OR e.manager.employee_id = :managerId) " +
			   "ORDER BY e.employee_id ASC")
	List<Employees> findByConditions(String userName, LocalDate dateFrom, LocalDate dateTo, Integer managerId);
	
	@Query("SELECT DISTINCT e.manager.employee_id , " +
		                   "m.firstName, " +
		                   "m.lastName " +
			   "FROM Employees e " +
			   "INNER JOIN e.manager m " +
			   "GROUP BY e.manager.employee_id, " +
			   			"m.firstName, " + 
			   			"m.lastName " +
			   "HAVING COUNT(e.employee_id) > 0 " +
			   "ORDER BY e.manager.employee_id ASC")
	List<Object[]> findManagerInfo();
	
	Employees findByfirstName(String firstName);
	
}
