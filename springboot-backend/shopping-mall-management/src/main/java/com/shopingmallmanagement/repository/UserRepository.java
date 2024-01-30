package com.shopingmallmanagement.repository;

import com.shopingmallmanagement.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    // Add custom queries if needed
}
