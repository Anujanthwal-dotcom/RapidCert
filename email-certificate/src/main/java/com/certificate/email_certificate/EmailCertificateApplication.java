package com.certificate.email_certificate;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class EmailCertificateApplication {

	public static void main(String[] args) {
		SpringApplication.run(EmailCertificateApplication.class, args);
	}

}
