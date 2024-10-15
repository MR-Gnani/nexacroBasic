package com.nani.hyundai.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EnableJpaRepositories(basePackages = "com.nani.hyundai.entity.rp")
public class JpaConfig {

}
