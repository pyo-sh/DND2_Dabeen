// AwsS3Service.java
// AwsS3를 이용한 이미지 upload, delete 구현
// 작성자 : 이은비
package com.dabeen.dnd.service;

import java.io.IOException;
import java.text.SimpleDateFormat;

import javax.transaction.Transactional;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Transactional
@Service
public class AwsS3Service {
    @Autowired
    private AmazonS3 s3Client;

    @Value("${amazonProperties.bucketName}")
    private String bucketName;

    // 프로필 사진의 경우, bucketName/user/{usernum}.x 로 저장
    // 도움 사진의 경우, bucketName/help/{helpNum}/{picOrnu}.x 로 저장
    public String upload(MultipartFile multipartFile, String path, String storedFilName) throws IOException {
        ObjectMetadata omd = new ObjectMetadata();
        omd.setContentType(multipartFile.getContentType());
        omd.setContentLength(multipartFile.getSize());
        omd.setHeader("fileName", multipartFile.getOriginalFilename());

        s3Client.putObject(new PutObjectRequest(bucketName + "/" + path, storedFilName, multipartFile.getInputStream(), omd)
                                    .withCannedAcl(CannedAccessControlList.PublicRead)); // 아무나 접근 가능하도록
        return s3Client.getUrl(bucketName + "/" + path, storedFilName).toString() ;
    }
    
    public void delete(String path, String storedFilName){
        s3Client.deleteObject(bucketName + "/" + path, storedFilName);
    }
}