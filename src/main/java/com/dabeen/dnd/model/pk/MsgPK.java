// MsgPK.java
// Msg 엔터티의 복합키를 구현하기 위한 클래스
// 작성자 : 권영인

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