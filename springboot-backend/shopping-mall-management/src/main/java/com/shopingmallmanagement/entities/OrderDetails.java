package com.shopingmallmanagement.entities;


import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
public class OrderDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String itemName;
    private Integer quantity;
    private Float price;
    private LocalDateTime dateOfPurchase;

    @ManyToOne(cascade = CascadeType.ALL)
    private Customer customer;

    private String shopName;
    private String paymentStatus;
    private String paymentMethod;
    private String transactionId;
    private Float discountAmount;
    private String couponCode;
    private Float taxAmount;
}
