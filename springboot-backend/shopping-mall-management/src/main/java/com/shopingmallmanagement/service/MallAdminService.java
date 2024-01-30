package com.shopingmallmanagement.service;

import com.shopingmallmanagement.entities.MallAdmin;
import com.shopingmallmanagement.repository.MallAdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Properties;
import java.util.concurrent.CompletableFuture;

@Service
public class MallAdminService {
    private final MallAdminRepository mallAdminRepository;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    public MallAdminService(MallAdminRepository mallAdminRepository) {
        this.mallAdminRepository = mallAdminRepository;
    }

    public MallAdmin login(String username, String password) {

        MallAdmin mallAdmin = mallAdminRepository.findByUsername(username);

        // Check if the provided password matches the encoded password in the database
        if (!encoder.matches(password, mallAdmin.getPassword())) {
            System.out.println("invalid Password");
            throw new BadCredentialsException("Invalid password");
        }

        return mallAdmin;
    }

    public List<MallAdmin> getAllMallAdmins() {
        return mallAdminRepository.findAll();
    }

    public MallAdmin getMallAdminById(Long id) {
        return mallAdminRepository.findById(id).orElse(null);
    }

    public MallAdmin createMallAdmin(MallAdmin mallAdmin) {

        mallAdmin.setPassword(encoder.encode(mallAdmin.getPassword()));

        // Asynchronously send login email
        CompletableFuture.runAsync(() -> sendLoginEmail(mallAdmin.getEmail(), mallAdmin, "Signup SuccessFull !!!"))
                .exceptionally(e -> {
                    // Handle exception occurred during email sending
                    System.err.println("Error sending login email: " + e.getMessage());
                    return null;
                });

        return mallAdminRepository.save(mallAdmin);
    }

    public MallAdmin updateMallAdmin(Long id, MallAdmin updatedMallAdmin) {
        if (mallAdminRepository.existsById(id)) {
            updatedMallAdmin.setId(id);
            return mallAdminRepository.save(updatedMallAdmin);
        }
        return null;
    }

    public boolean deleteMallAdmin(Long id) {
        if (mallAdminRepository.existsById(id)) {
            mallAdminRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public static void sendLoginEmail(String recipientEmail, MallAdmin admin, String msg) {
        // Sender's email address
        String senderEmail = "Your mail id";
        // Sender's email password or app-specific password
        String password = "pwd";

        // Setup mail server properties
        Properties properties = new Properties();
        properties.put("mail.smtp.host", "smtp.gmail.com");
        properties.put("mail.smtp.port", "587");
        properties.put("mail.smtp.auth", "true");
        properties.put("mail.smtp.starttls.enable", "true");

        // Create a Session object with authentication
        Session session = Session.getInstance(properties, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new javax.mail.PasswordAuthentication(senderEmail, password);
            }
        });

        try {
            // Create a default MimeMessage object
            Message message = new MimeMessage(session);

            Address fromAddress = new InternetAddress(admin.getEmail(), "Super Admin");
            message.setFrom(fromAddress);
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(recipientEmail));

            // Set the email subject
            message.setSubject(msg);

            MimeBodyPart textPart = new MimeBodyPart();
            textPart.setText("Hi, " + admin.getName());
            // Create MimeMultipart
            MimeMultipart multipart = new MimeMultipart();

            // Add a header to the HTML content
            String header = "<h2 style='color: white; background-color: green; padding: 10px;'>Login Information from Admin</h2>";

            MimeBodyPart htmlPart = new MimeBodyPart();
            String htmlContent = "<html><body style='font-family: Arial, sans-serif;'>" + header +
                    "<p style='color: #333;'>You have successfully Signup in with the following information:</p>" +
                    "<ul>" +
                    "<li style='color: #333;'>Username: " + admin.getUsername() + "</li>" +
                    "<li style='color: #333;'>Admin Email: " + admin.getEmail() + "</li>" +
                    "</ul>" +
                    "<p style='color: #333;'>This message is auto-generated. Please do not reply.</p>" +
                    "</body></html>";
            htmlPart.setContent(htmlContent, "text/html");

            multipart.addBodyPart(textPart);
            multipart.addBodyPart(htmlPart);

            // Set content of the message
            message.setContent(multipart);

            // Send the email
            Transport.send(message);

            System.out.println("Email sent successfully!");

        } catch (MessagingException e) {
            throw new RuntimeException(e);
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        } finally {

        }
    }

}
