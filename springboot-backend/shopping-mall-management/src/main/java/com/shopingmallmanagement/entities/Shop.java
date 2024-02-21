package com.shopingmallmanagement.entities;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Shop {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String shopCategory;
    private String shopDescription;
    private String shopImage;
    private String shopStatus;
    private String shopOwner;
    private String leaseStatus;
}
