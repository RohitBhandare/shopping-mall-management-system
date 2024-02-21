package com.shopingmallmanagement.service;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class FileStorageService {

    @Value("${image.directory}")
    private String imageDirectory;

    public byte[] loadFileAsBytes(String fileName) throws IOException {
        Path filePath = Path.of(imageDirectory).resolve(fileName).normalize();
        return Files.readAllBytes(filePath);
    }
    public void storeFile(String fileName, MultipartFile file) throws Exception {
        try {
            Path targetPath = Paths.get(imageDirectory).resolve(fileName);
            Files.createDirectories(targetPath.getParent());
            FileCopyUtils.copy(file.getBytes(), targetPath.toFile());
        } catch (IOException e) {
            throw new Exception("Failed to store file " + fileName, e);
        }
    }

    public void deleteAll() {
        FileSystemUtils.deleteRecursively(Paths.get(imageDirectory).toFile());
    }

    public void init() throws Exception {
        try {
            Files.createDirectories(Paths.get(imageDirectory));
        } catch (IOException e) {
            throw new Exception("Could not initialize storage", e);
        }
    }


}
