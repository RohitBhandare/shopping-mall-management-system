package com.shopingmallmanagement.service;

import com.shopingmallmanagement.dto.ShopDTO;
import com.shopingmallmanagement.entities.Shop;
import com.shopingmallmanagement.repository.ShopRepository;
import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ShopService {
    private final ShopRepository shopRepository;

    @Autowired
    public ShopService(ShopRepository shopRepository) {
        this.shopRepository = shopRepository;
    }

    public List<ShopDTO> getAllShops() {
        List<Shop> shops = shopRepository.findAll();
        return shops.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    private ShopDTO convertToDto(Shop shop) {
        ShopDTO dto = new ShopDTO();
        dto.setId(shop.getId());
        dto.setName(shop.getName());
        dto.setShopCategory(shop.getShopCategory());
        dto.setShopOwner(shop.getShopOwner());
        dto.setLeaseStatus(shop.getLeaseStatus());
        dto.setShopStatus(shop.getShopStatus());
        dto.setShopDescription(shop.getShopDescription());
        // Add other fields as needed

        // Set image bytes if available
        String imagePath = shop.getShopImage();
        if (imagePath != null) {
            try {
                byte[] imageBytes = fileStorageService.loadFileAsBytes(imagePath);
                dto.setShopImage(Base64.getEncoder().encodeToString(imageBytes));
            } catch (IOException e) {
                // Handle the exception (e.g., log it) if the file cannot be read
                e.printStackTrace();
            }
        }

        return dto;

    }

    public Shop getShopById(Long id) {
        return shopRepository.findById(id).orElse(null);
    }


    @Autowired
    private FileStorageService fileStorageService;

    public ShopDTO createShop(Shop shop, MultipartFile file) throws Exception {
        // Save the shop details to the database
        Shop createdShop = shopRepository.save(shop);

        // Store the shop image
        String fileName = "shop_" + createdShop.getId() + ".jpg"; // You may want to generate a unique filename
        fileStorageService.storeFile(fileName, file);

        // Set the image path in the Shop entity
        createdShop.setShopImage(fileName);
        shopRepository.save(createdShop);

        // Convert the createdShop to ShopDTO with the image
        ShopDTO shopDTO = convertToDto(createdShop);

        return shopDTO;
    }


    public Shop updateShop(Long id, Shop updatedShop) {
        if (shopRepository.existsById(id)) {
            updatedShop.setId(id);
            return shopRepository.save(updatedShop);
        }
        return null;
    }

    public boolean deleteShop(Long id) {
        if (shopRepository.existsById(id)) {
            shopRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
