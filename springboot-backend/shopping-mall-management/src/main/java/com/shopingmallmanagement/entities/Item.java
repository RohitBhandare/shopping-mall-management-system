package com.shopingmallmanagement.entities;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "item", indexes = {
        @Index(name = "idx_name", columnList = "name"),
        @Index(name = "idx_manufacturing_locale", columnList = "manufacturingLocale"),
        // Add more indexes for other frequently queried columns if needed
})
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String manufacturingLocale;
    private Float price;
    private Float expiryLocale;
    private String category;  // E.g., Food, Electronics, Clothing, etc.
    private String brand;
    private String description;
    private LocalDate manufacturingDate;
    private LocalDate expiryDate;
    private Integer quantityInStock;
    private Boolean isAvailable;
    private String shopName;
}
