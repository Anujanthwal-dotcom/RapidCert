package com.certificate.email_certificate.Controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.certificate.email_certificate.Service.CertificateService;

import jakarta.mail.MessagingException;

import java.io.File;
import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
public class CertificateController {
    @Autowired
    CertificateService certificateService;

    @Value("${certificate.path}")
    private String certificatePath;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/upload")
    public ResponseEntity<String> postCertificate(@RequestParam("excelFile") MultipartFile excelFile,@RequestParam("templateFile") MultipartFile templateFile) throws IllegalStateException, IOException, MessagingException{ 
        File excelfile = new File(certificatePath+excelFile.getOriginalFilename());
        File templatefile = new File(certificatePath+templateFile.getOriginalFilename());
        
        excelFile.transferTo(excelfile);
        templateFile.transferTo(templatefile);
        
        certificateService.sendCertificate(excelfile, templatefile);
        return ResponseEntity.ok("Files uploaded successfully. Processing certificates");
    }
    
}
