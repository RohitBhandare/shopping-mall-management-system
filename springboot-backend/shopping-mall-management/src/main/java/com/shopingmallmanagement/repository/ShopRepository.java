package com.shopingmallmanagement.repository;

import com.shopingmallmanagement.entities.Shop;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShopRepository extends JpaRepository<Shop, Long> {
    // Add custom queries if needed
}
