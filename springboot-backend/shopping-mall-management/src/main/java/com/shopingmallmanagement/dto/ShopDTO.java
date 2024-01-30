package com.shopingmallmanagement.dto;

import lombok.Data;

@Data
public class ShopDTO {
    private Long id;
    private String name;
    private String shopCategory;
    private String shopDescription;
    private String shopImage;
    private String shopStatus;
    private String shopOwner;
    private String leaseStatus;
}
