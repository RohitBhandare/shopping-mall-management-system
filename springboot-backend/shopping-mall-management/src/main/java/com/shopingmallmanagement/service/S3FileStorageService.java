//package com.shopingmallmanagement.service;
//
//import com.amazonaws.services.s3.AmazonS3;
//import com.amazonaws.services.s3.model.*;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Service;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.io.IOException;
//import java.nio.file.Path;
//
//@Service
//public class S3FileStorageService {
//
//    private final AmazonS3 s3Client;
//
//    @Value("${aws.s3.bucketName}")
//    private String bucketName;
//
//    @Value("${aws.s3.baseKey}")
//    private String baseKey;
//
//    public S3FileStorageService(AmazonS3 s3Client) {
//        this.s3Client = s3Client;
//    }
//
//    public byte[] loadFileAsBytes(String fileName) throws IOException {
//        S3Object object = s3Client.getObject(bucketName, baseKey + "/" + fileName);
//        S3ObjectInputStream objectInputStream = object.getObjectContent();
//        return objectInputStream.readAllBytes();
//    }
//
//    public void storeFile(String fileName, MultipartFile file) throws Exception {
//        try {
//            s3Client.putObject(new PutObjectRequest(bucketName, baseKey + "/" + fileName, file.getInputStream(), null)
//                    .withCannedAcl(CannedAccessControlList.PublicRead));
//        } catch (IOException e) {
//            throw new Exception("Failed to store file " + fileName, e);
//        }
//    }
//
//    public void deleteFile(String fileName) {
//        s3Client.deleteObject(new DeleteObjectRequest(bucketName, baseKey + "/" + fileName));
//    }
//
//    public void deleteAll() {
//        ObjectListing objectListing = s3Client.listObjects(bucketName, baseKey);
//        for (S3ObjectSummary objectSummary : objectListing.getObjectSummaries()) {
//            s3Client.deleteObject(bucketName, objectSummary.getKey());
//        }
//    }
//
//    public void init() throws Exception {
//        // No specific initialization needed for S3, as the bucket creation is handled separately.
//        // You can check if the bucket exists and create it if necessary.
//        createBucketIfNotExists();
//    }
//
//    private void createBucketIfNotExists() {
//        if (!s3Client.doesBucketExistV2(bucketName)) {
//            s3Client.createBucket(new CreateBucketRequest(bucketName));
//        }
//    }
//}
