// AWSConfiguration.java
// aws s3 사용을 위해
// 작성자 : 이은비
package com.dabeen.dnd.config;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.fasterxml.jackson.annotation.JsonBackReference;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;



@Configuration
public class AWSConfiguration implements WebMvcConfigurer{
    @Value("${amazonProperties.accessKey}") 
    private String accessKey;
    
    @Value("${amazonProperties.secretKey}")
    private String secretKey; 
    
    @Value("${amazonProperties.region}")
    private String region;

    @Bean
    public BasicAWSCredentials basicAWSCredentials(){
        return new BasicAWSCredentials(accessKey, secretKey);
    }

    @Bean
    public AmazonS3 amazonS3Client(AWSCredentials awsCredentials){
        AmazonS3 amazonS3Client = AmazonS3ClientBuilder.standard()
                                                        .withCredentials(new AWSStaticCredentialsProvider(awsCredentials))
                                                        .withRegion(region)
                                                        .build();
        return amazonS3Client;
    }
}