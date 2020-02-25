// ImgApiService.java
// AwsS3를 이용한 이미지 upload, delete 구현
// 작성자 : 이은비
package com.dabeen.dnd.service.api;

import java.io.IOException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

import javax.transaction.Transactional;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3URI;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.dabeen.dnd.model.network.Header;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Transactional
@Service
public class PicApiService {
    @Autowired
    private AmazonS3 s3Client; // Aws S3 이용

    @Value("${amazonProperties.bucketName}")
    private String bucketName;

    // 프로필 사진의 경우, bucketName/user/{date} 디렉토리에 저장
    // 도움 사진의 경우, bucketName/help/{date} 디렉토리에 저장
    public Header<String> upload(MultipartFile multipartFile, String object) throws IOException {
        SimpleDateFormat date = new SimpleDateFormat("yyyyMMdd");
        String path = bucketName + "/" + object + "/" + date.format(new Date());

        // 파일명이 겹치는 것을 방지하기 위해, UUID를 이용하여 파일의 저장 이름 변경
        String fileName = UUID.randomUUID().toString() + "_" + multipartFile.getOriginalFilename();
        
        ObjectMetadata omd = new ObjectMetadata();
        omd.setContentType(multipartFile.getContentType());
        omd.setContentLength(multipartFile.getSize());
        omd.setHeader("fileName", multipartFile.getOriginalFilename());

        s3Client.putObject(new PutObjectRequest(path, fileName, multipartFile.getInputStream(), omd)
                                    .withCannedAcl(CannedAccessControlList.PublicRead)); // 아무나 접근 가능하도록
        
        return Header.OK(s3Client.getUrl(path, fileName).toString());
    }
    
    public Header<?> delete(String url){
        AmazonS3URI awsUrl = new AmazonS3URI(url);
        s3Client.deleteObject(awsUrl.getBucket(), awsUrl.getKey());
    
        return Header.OK();
    }
}