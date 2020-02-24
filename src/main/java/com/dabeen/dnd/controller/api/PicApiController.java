// ImgApiController.java
// 이미지 업로드를 위한 컨트롤러
// 작성자 : 이은비
package com.dabeen.dnd.controller.api;

import java.io.IOException;
import java.net.URLEncoder;

import javax.servlet.http.HttpServletRequest;

import com.dabeen.dnd.exception.FileSaveFailedException;
import com.dabeen.dnd.model.network.Header;
import com.dabeen.dnd.service.api.PicApiService;

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

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("api/pic")
@Slf4j
public class PicApiController {
    @Autowired
    private PicApiService picApiService;

    @PostMapping(value = {"/upload/user", "/upload/help"})
    public Header<String> upload(@RequestParam MultipartFile pic, HttpServletRequest request) {
        try {
            // 마지막이 help인지 user인지 알아내기 위해
            return picApiService.upload(pic, request.getRequestURI().substring(16));
        } catch (IOException e) {
            throw new FileSaveFailedException();
        }
    }

    // URL 자체를 넘겨야 하므로 Post 사용
    @PostMapping("/delete")
    public Header<?> delete(@RequestParam String url){
        return picApiService.delete(url);
    }
}