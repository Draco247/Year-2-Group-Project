package com.example.demoApp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;


@SpringBootApplication
@EnableJpaAuditing
public class DemoAppApplication {

	
	public static void main(String[] args) {
		SpringApplication.run(DemoAppApplication.class, args);
	}

}
