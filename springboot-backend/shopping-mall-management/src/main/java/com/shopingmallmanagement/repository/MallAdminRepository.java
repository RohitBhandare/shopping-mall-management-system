package com.shopingmallmanagement.repository;

import com.shopingmallmanagement.entities.MallAdmin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MallAdminRepository extends JpaRepository<MallAdmin, Long> {
    MallAdmin findByUsername(String username);

}
