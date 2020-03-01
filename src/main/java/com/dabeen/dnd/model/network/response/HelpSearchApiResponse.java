package com.dabeen.dnd.model.network.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import com.dabeen.dnd.model.entity.Category;
import com.dabeen.dnd.model.entity.HelpPic;
import com.dabeen.dnd.model.entity.User;
import com.dabeen.dnd.model.enumclass.PymtWhet;
import com.dabeen.dnd.model.enumclass.Whether;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class HelpSearchApiResponse{

    private String helpNum;

    private LocalDateTime helpPstnDttm;

    private LocalDateTime helpEndDttm;

    private UserApiResponse cnsrUser;

    private String title;

    private String execLoc;

    private BigDecimal price;

    private Integer prefSupplNum;

    private LocalDateTime prefHelpExecDttm;

    private LocalDateTime helpAplyClsDttm;

    private String cont;

    private Whether helpAprvWhet;

    private PymtWhet pymtWhet;

    private List<HelpPicApiResponse> helpPics;
}