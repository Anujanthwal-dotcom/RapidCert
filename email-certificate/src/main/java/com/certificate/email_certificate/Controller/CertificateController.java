package com.certificate.email_certificate.Controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.certificate.email_certificate.Service.CertificateService;

import jakarta.mail.MessagingException;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
public class CertificateController {
    @Autowired
    CertificateService certificateService;
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/upload")
    public ResponseEntity<String> postCertificate(@RequestParam("excelFile") MultipartFile excelFile,@RequestParam("templateFile") MultipartFile templateFile) throws IllegalStateException, IOException, MessagingException{ 
        certificateService.sendCertificate(excelFile, templateFile);
        return ResponseEntity.ok("Files uploaded successfully. Processing certificates");
    }
    
}
