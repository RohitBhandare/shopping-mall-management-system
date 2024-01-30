package com.shopingmallmanagement.controller;

import com.shopingmallmanagement.entities.MallAdmin;
import com.shopingmallmanagement.service.MallAdminService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/malladmins")
public class MallAdminController {
    private final MallAdminService mallAdminService;

    @Autowired
    public MallAdminController(MallAdminService mallAdminService) {
        this.mallAdminService = mallAdminService;
    }




    @PostMapping("/login")
    public ResponseEntity<MallAdmin> login(@RequestBody MallAdmin loginDetails, HttpServletRequest request) {
        // Obtain client's IP address
        String clientIpAddress = getClientIpAddress(request);

        MallAdmin authenticatedAdmin = mallAdminService.login(loginDetails.getUsername(), loginDetails.getPassword());

        if (authenticatedAdmin != null) {
            System.out.println("Authenticated Admin: " + authenticatedAdmin);
            System.out.println("Client IP Address: " + clientIpAddress);
            return new ResponseEntity<>(authenticatedAdmin, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    // Method to get client's IP address
    private String getClientIpAddress(HttpServletRequest request) {
        String ipAddress = request.getHeader("X-Forwarded-For");

        if (ipAddress == null || ipAddress.isEmpty() || "unknown".equalsIgnoreCase(ipAddress)) {
            ipAddress = request.getHeader("Proxy-Client-IP");
        }

        if (ipAddress == null || ipAddress.isEmpty() || "unknown".equalsIgnoreCase(ipAddress)) {
            ipAddress = request.getHeader("WL-Proxy-Client-IP");
        }

        if (ipAddress == null || ipAddress.isEmpty() || "unknown".equalsIgnoreCase(ipAddress)) {
            ipAddress = request.getRemoteAddr();
        }

        return ipAddress;
    }

    @GetMapping
    public ResponseEntity<List<MallAdmin>> getAllMallAdmins() {
        List<MallAdmin> mallAdmins = mallAdminService.getAllMallAdmins();
        return new ResponseEntity<>(mallAdmins, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MallAdmin> getMallAdminById(@PathVariable Long id) {
        MallAdmin mallAdmin = mallAdminService.getMallAdminById(id);
        return mallAdmin != null ? new ResponseEntity<>(mallAdmin, HttpStatus.OK)
                                 : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<MallAdmin> createMallAdmin(@RequestBody MallAdmin mallAdmin) {
        MallAdmin createdMallAdmin = mallAdminService.createMallAdmin(mallAdmin);
        return new ResponseEntity<>(createdMallAdmin, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MallAdmin> updateMallAdmin(@PathVariable Long id, @RequestBody MallAdmin mallAdmin) {
        MallAdmin updatedMallAdmin = mallAdminService.updateMallAdmin(id, mallAdmin);
        return updatedMallAdmin != null ? new ResponseEntity<>(updatedMallAdmin, HttpStatus.OK)
                                        : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMallAdmin(@PathVariable Long id) {
        boolean deleted = mallAdminService.deleteMallAdmin(id);
        return deleted ? new ResponseEntity<>(HttpStatus.NO_CONTENT)
                       : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
