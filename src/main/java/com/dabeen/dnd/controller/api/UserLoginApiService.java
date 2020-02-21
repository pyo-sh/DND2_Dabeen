// UserLoginApiService.java
// 사용자의 로그인 관련 서비스
// 사용자 관련 API가 많아 나눕니다.
// 작성자 : 이은비

package com.dabeen.dnd.controller.api;

import java.util.List;
import javax.transaction.Transactional;

import com.dabeen.dnd.repository.UserRepository;
import com.dabeen.dnd.exception.EmailWrongException;
import com.dabeen.dnd.exception.NotFoundException;
import com.dabeen.dnd.exception.PasswordWrongException;
import com.dabeen.dnd.model.entity.User;
import com.dabeen.dnd.model.enumclass.Whether;
import com.dabeen.dnd.model.network.Header;
import com.dabeen.dnd.model.network.request.FindApiRequest;
import com.dabeen.dnd.model.network.request.LoginApiRequest;
import com.dabeen.dnd.model.network.response.LoginApiResponse;
import com.dabeen.dnd.service.JwtService;
import com.dabeen.dnd.service.MailService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Transactional
@Service
public class UserLoginApiService{
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private JwtService jwtService;

    @Autowired
    private MailService mailService;

    // 로그인을 위한 메소드
    public Header<LoginApiResponse> login(Header<LoginApiRequest> request) {
        LoginApiRequest requestData = request.getData();
        User user = userRepository.findByUserId(requestData.getId())
                .orElseThrow(() -> new NotFoundException("The \'" + requestData.getId() + "\' ID"));

        if (!passwordEncoder.matches(requestData.getPwd(), user.getPwd()))
            throw new PasswordWrongException();

        // 해당 사용자가 공급자인지 아닌지 판단
        String role = user.getSupplWhet().equals(Whether.y) ? "suppler" : "user";

        return Header.OK(LoginApiResponse.builder()
                .token(jwtService.createToken(user.getUserNum(), user.getUserId(), role)).build());
    }


    // 아이디 찾기
    public Header<?> findId(Header<FindApiRequest> request) {
        FindApiRequest requestData = request.getData();
        List<User> users = userRepository.findByUserNameAndEmail(requestData.getName(), requestData.getEmail());

        if (users.isEmpty())
            throw new NotFoundException("User");

        // 해당 사용자의 아이디 목록 생성
        String ids = "";
        for (int i = 0; i < users.size(); i++) {
            ids += users.get(i).getUserId();

            if (i != users.size() - 1)
                ids += ", ";
        }

        mailService.sendMail(requestData.getEmail(), "아이디를 알려드립니다.", requestData.getName(),
                "고객님의 아이디는 [ " + ids + " ] 입니다.");

        return Header.OK();
    }

    // 비밀번호 찾기
    public Header<?> findPwd(Header<FindApiRequest> request) {
        FindApiRequest requestData = request.getData();
        User user = userRepository.findByUserId(requestData.getId())
                .orElseThrow(() -> new NotFoundException("The \'" + requestData.getId() + "\' user"));

        // 입력된 메일과 사용자의 메일이 동일하지 않은 경우
        if (!user.getEmail().equals(requestData.getEmail()))
            throw new EmailWrongException();

        // 12자리의 임시 비밀번호 생성
        String pwd = "";
        for (int i = 0; i < 12; i++) {
            pwd += (char) ((Math.random() * 26) + 97);
        }

        // 새로운 비밀번호로 변경
        user.setPwd(passwordEncoder.encode(pwd));
        userRepository.save(user);

        mailService.sendMail(user.getEmail(), "임시 비밀번호를 알려드립니다.", user.getUserName(), "고객님의 임시 비밀번호는 " + pwd + " 입니다.");

        return Header.OK();
    }
}