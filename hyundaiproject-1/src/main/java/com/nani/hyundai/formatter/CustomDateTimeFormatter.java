package com.nani.hyundai.formatter;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

public class CustomDateTimeFormatter {
	
	 public static LocalDate parseDate(String dateStr) {
		 
	        DateTimeFormatter formatter1 = DateTimeFormatter.ofPattern("yyyy-MM-dd");
	        DateTimeFormatter formatter2 = DateTimeFormatter.ofPattern("yyyyMMdd");

	        LocalDate date = null;
	        try {
	            // YYYY-MM-DD 형식으로 파싱 시도
	            date = LocalDate.parse(dateStr, formatter1);
	        } catch (DateTimeParseException e) {
	            try {
	                // YYYYMMDD 형식으로 파싱 시도
	                date = LocalDate.parse(dateStr, formatter2);
	            } catch (DateTimeParseException ex) {
	                // 두 형식 모두 실패한 경우 처리
	                throw new IllegalArgumentException("Invalid date format: " + dateStr);
	            }
	        }
	        return date;
	    }
	 
	 public static String parseDate2(LocalDate localDate) {
	        DateTimeFormatter outputFormatter = DateTimeFormatter.ofPattern("yyyyMMdd");
	       
	        return localDate.format(outputFormatter);
	    }
}
