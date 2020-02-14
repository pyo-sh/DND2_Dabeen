package com.dabeen.dnd.model.pk;

import java.io.Serializable;
import java.time.LocalDateTime;

import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Getter
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class MsgPK implements Serializable{

    private static final long serialVersionUID = 1L;

    private String chatNum;

    private String msgWriterNum;

    private LocalDateTime msgSendDttm;

}