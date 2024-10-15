package com.nani.hyundai.formatter;

import java.util.regex.Matcher;
import java.util.regex.Pattern;


public class PhoneNumberFormatter {

	  public static String formatPhoneNumber(String phoneNumber) {
	        // 정규 표현식 패턴
	        Pattern pattern = Pattern.compile("(\\d{3})(\\d{4})(\\d{4})");
	        Matcher matcher = pattern.matcher(phoneNumber);
	        if (matcher.matches()) {
	            return matcher.group(1) + "." + matcher.group(2) + "." + matcher.group(3);
	        }
	        return phoneNumber; // 형식이 맞지 않는 경우 원본 반환
	    }
}
