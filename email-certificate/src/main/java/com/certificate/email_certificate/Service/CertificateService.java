package com.certificate.email_certificate.Service;
import java.awt.Color;
import java.awt.Font;
import java.awt.FontMetrics;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import javax.imageio.ImageIO;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class CertificateService {
    @Autowired
    JavaMailSender javaMailSender;


    //please spacify this path in the application.properties folder
    @Value("${certificate.path}")
    private String certificatePath;

    @Async
    public void sendCertificate(File excelfile, File templatefile) throws IllegalStateException, IOException, MessagingException {
        if (excelfile == null || templatefile == null) {
            return;
        }

        
        
        try(
            FileInputStream inputStream = new FileInputStream(excelfile);
            Workbook workbook = new XSSFWorkbook(inputStream)
        ) {
                
            Sheet sheet = workbook.getSheetAt(0);

            for (Row row : sheet) {
                if (row.getRowNum() == 0)
                    continue;

                String name = row.getCell(0).getStringCellValue();
                String email = row.getCell(1).getStringCellValue();
                File certificate = generateCertificate(templatefile, name);
                
                sendCertificateEmail(email, name, certificate);
                certificate.delete();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        excelfile.delete();
        templatefile.delete();
    }

    public File generateCertificate(File templateFile, String name) throws IOException {
        if (templateFile == null) {
            return null;
        }

        File outputFile = new File(certificatePath+name+"_Certificate.png");
        
        try {
            BufferedImage image = ImageIO.read(templateFile);
            if(image == null) {
                return null;
            }
            Graphics2D g = image.createGraphics();

            g.setFont(new Font("Arial", Font.BOLD, 48));
            g.setColor(Color.BLACK);

            // Calculate position for centered text
            FontMetrics fm = g.getFontMetrics();
            int textWidth = fm.stringWidth(name);
            int x = (image.getWidth() - textWidth) / 2;
            int y = image.getHeight() / 2;

            g.drawString(name, x, y);
            g.dispose();

            // Save generated certificate

            ImageIO.write(image, "png", outputFile);
            
            
        } catch (IOException e) {
            e.printStackTrace();
        }

        return outputFile;
    }

    public void sendCertificateEmail(String recipientEmail, String name, File certificate) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setTo(recipientEmail);
        helper.setSubject("Your Certificate of Participation");
        helper.setText("Congratulations " + name + "! Please find attached your certificate of participation.");

        FileSystemResource file = new FileSystemResource(certificate);
        helper.addAttachment(name + "_Certificate.png", file);

        javaMailSender.send(message);
        System.out.println("Certificate sent to " + recipientEmail);
    }
}
