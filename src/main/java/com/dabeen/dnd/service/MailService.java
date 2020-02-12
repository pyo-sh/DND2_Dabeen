// MailService.java
// 메일 전송을 위한 클래스
// 작성자 : 이은비

package com.dabeen.dnd.service;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;

import com.dabeen.dnd.exception.FailedMailSendException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;


@Service
public class MailService{
    @Autowired
    private JavaMailSender JavaMailSender;

    @Autowired
    private TemplateEngine templateEngine;

    public void sendMail(String to, String subject, String name, String text){
        try{
            MimeMessagePreparator message = mimeMessage -> {
                String content = build(to, name, subject, text);

                MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, true);

                messageHelper.setTo(to);
                messageHelper.setSubject("[다빈] " + subject);
                messageHelper.setText(content, true); // html 형식으로 보냄

                messageHelper.addInline("logo", new ClassPathResource("static/logo.png"), "image/png");
            };
            JavaMailSender.send(message);
        }catch(FailedMailSendException e){
            throw e;
        }
    }

    // Thymeleaf 세팅
    private String build(String to, String name, String subject, String text){
        Context context = new Context();
        
        context.setVariable("logo", "logo");
        context.setVariable("name", name);
        context.setVariable("email", to);
        context.setVariable("subject", subject);
        context.setVariable("text", text);

        return templateEngine.process("mail", context);
    }
}