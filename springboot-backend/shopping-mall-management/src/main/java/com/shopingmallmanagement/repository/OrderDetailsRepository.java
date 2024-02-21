package com.shopingmallmanagement.repository;

import com.shopingmallmanagement.entities.OrderDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderDetailsRepository extends JpaRepository<OrderDetails, Long> {

//    @Query("SELECT od FROM OrderDetails od " +
//            "JOIN FETCH od.customer c " +
//            "JOIN FETCH od.shop s")
//    List<OrderDetails> findAllOrderDetailsWithCustomerAndShop();
//
//    @Query("SELECT od FROM OrderDetails od " +
//            "JOIN FETCH od.customer c " +
//            "WHERE c.id = :customerId")
//    List<OrderDetails> findOrderDetailsByCustomerId(Long customerId);
}
