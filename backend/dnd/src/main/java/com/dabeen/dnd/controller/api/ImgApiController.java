// ImgApiController.java
// 이미지 업로드를 위한 컨트롤러
// 작성자 : 이은비
package com.dabeen.dnd.controller.api;

import java.io.IOException;
import java.net.URLEncoder;

import com.dabeen.dnd.exception.FileSaveFailedException;
import com.dabeen.dnd.model.network.Header;
import com.dabeen.dnd.service.api.ImgApiService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("api/img")
public class ImgApiController {
    @Autowired
    private ImgApiService imgApiService;

    @PostMapping("/upload")
    public Header<String> upload(@RequestParam MultipartFile img) {
        try {
            return imgApiService.upload(img, "user");
        } catch (IOException e) {
            throw new FileSaveFailedException();
        }
    }

    // URL 자체를 넘겨야 하므로 Post 사용
    @PostMapping("/delete")
    public Header<?> delete(@RequestParam String url){
        return imgApiService.delete(url);
    }
}