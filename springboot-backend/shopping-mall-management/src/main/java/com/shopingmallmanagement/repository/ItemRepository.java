package com.shopingmallmanagement.repository;

import com.shopingmallmanagement.entities.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ItemRepository extends JpaRepository<Item, Long> {

//    @Query("SELECT i FROM Item i WHERE i.customer.name = :customerName")
//    List<Item> findItemsByCustomerName(@Param("customerName") String customerName);

//    @Query("SELECT i FROM Item i JOIN FETCH i.customer")
//    List<Item> findAllItemsWithCustomer();
}
