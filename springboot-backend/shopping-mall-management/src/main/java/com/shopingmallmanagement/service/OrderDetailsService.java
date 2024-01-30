package com.shopingmallmanagement.service;

import com.shopingmallmanagement.entities.OrderDetails;
import com.shopingmallmanagement.repository.OrderDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class OrderDetailsService {
    private final OrderDetailsRepository orderDetailsRepository;

    @Autowired
    public OrderDetailsService(OrderDetailsRepository orderDetailsRepository) {
        this.orderDetailsRepository = orderDetailsRepository;
    }

    public List<OrderDetails> getAllOrderDetails() {
        return orderDetailsRepository.findAll();
    }

    public OrderDetails getOrderDetailsById(Long id) {
        return orderDetailsRepository.findById(id).orElse(null);
    }

    public OrderDetails createOrderDetails(OrderDetails orderDetails) {
        return orderDetailsRepository.save(orderDetails);
    }

    public OrderDetails updateOrderDetails(Long id, OrderDetails updatedOrderDetails) {
        if (orderDetailsRepository.existsById(id)) {
            updatedOrderDetails.setId(id);
            return orderDetailsRepository.save(updatedOrderDetails);
        }
        return null;
    }

    public boolean deleteOrderDetails(Long id) {
        if (orderDetailsRepository.existsById(id)) {
            orderDetailsRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
