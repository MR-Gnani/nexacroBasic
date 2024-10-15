package com.nani.hyundai.config;

import java.util.List;

import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.HandlerMethodReturnValueHandler;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter;

import com.nexacro.uiadapter17.spring.core.resolve.NexacroHandlerMethodReturnValueHandler;
import com.nexacro.uiadapter17.spring.core.resolve.NexacroMappingExceptionResolver;
import com.nexacro.uiadapter17.spring.core.resolve.NexacroMethodArgumentResolver;
import com.nexacro.uiadapter17.spring.core.resolve.NexacroRequestMappingHandlerAdapter;
import com.nexacro.uiadapter17.spring.core.view.NexacroFileView;
import com.nexacro.uiadapter17.spring.core.view.NexacroView;
import com.nexacro17.xapi.tx.PlatformType;

@Configuration
public class NexacroConfig implements WebMvcConfigurer {

	private final ApplicationContext applicationContext;
	
	public NexacroConfig(ApplicationContext applicationContext) {
		this.applicationContext = applicationContext;
	}

   public RequestMappingHandlerAdapter getRequestMappingHandlerAdapter() {
   return new NexacroRequestMappingHandlerAdapter();
   }
	
	@Override
	public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
	
	NexacroMethodArgumentResolver nexacroResolver = new NexacroMethodArgumentResolver();
	resolvers.add(nexacroResolver);
	}
	
	@Override
	public void addReturnValueHandlers(List<HandlerMethodReturnValueHandler> handlers) {
		
		NexacroHandlerMethodReturnValueHandler returnValueHandler = new NexacroHandlerMethodReturnValueHandler();
		
		NexacroFileView nexacroFileView = new NexacroFileView();
		NexacroView nexacroView = new NexacroView();
		nexacroView.setDefaultContentType(PlatformType.CONTENT_TYPE_XML);
		nexacroView.setDefaultCharset("UTF-8");
		
		returnValueHandler.setView(nexacroView);
		returnValueHandler.setFileView(nexacroFileView);
		
		handlers.add(returnValueHandler);
	}
	
	@Override
	public void configureHandlerExceptionResolvers(List<HandlerExceptionResolver> resolvers) {
		
		NexacroView nexacroView = new NexacroView();
		nexacroView.setDefaultContentType(PlatformType.CONTENT_TYPE_XML);
		nexacroView.setDefaultCharset("UTF-8");
		
		NexacroMappingExceptionResolver nexacroException = new NexacroMappingExceptionResolver();
		
		nexacroException.setView(nexacroView);
		nexacroException.setShouldLogStackTrace(true);
		nexacroException.setShouldSendStackTrace(true);
		nexacroException.setDefaultErrorMsg("fail.common.msg");
		nexacroException.setOrder(1);
		resolvers.add(nexacroException);
	}
	
}
