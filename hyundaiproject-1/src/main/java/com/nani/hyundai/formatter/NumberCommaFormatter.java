package com.nani.hyundai.formatter;

import java.text.NumberFormat;
import java.util.Locale;

public class NumberCommaFormatter {
	
	public static String formatCommaInNumber(Integer number) {
		// 입력 문자열이 null이거나 비어있으면 빈 문자열 반환
        if (number == null) {
            return "";
        }
        
        // 숫자를 포맷하기 위해 DecimalFormat 사용
        NumberFormat formatter = NumberFormat.getNumberInstance(Locale.US);
        String formattedNumber = formatter.format(number);
        
        return formattedNumber;
    }
	
	public static String formatCommaInNumberDouble(Double number) {
		// 입력 문자열이 null이거나 비어있으면 빈 문자열 반환
        if (number == null) {
            return "";
        }
        
        // 숫자를 포맷하기 위해 DecimalFormat 사용
        NumberFormat formatter = NumberFormat.getNumberInstance(Locale.US);
        String formattedNumber = formatter.format(number);
        
        return formattedNumber;
    }
}
