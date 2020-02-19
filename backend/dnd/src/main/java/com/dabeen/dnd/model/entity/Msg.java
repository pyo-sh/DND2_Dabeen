// Msg.java
// Msg 엔터티
// 작성자 : 권영인

package com.dabeen.dnd.model.entity;

import java.time.LocalDateTime;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.dabeen.dnd.model.pk.MsgPK;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Accessors(chain =  true)
public class Msg{

    @EmbeddedId
    @NotNull(message = " is not null")
    private MsgPK msgPK; // Msg PK (chat_num,msg_writer_num,msg_send_dttm)

    @NotNull(message = " is not null")
    private String cont; // Msg 내용

    /* 연관관계 설정 */

    @ManyToOne
    @JoinColumn(name = "chat_num")
    @MapsId("chatNum")
    @NotNull(message = " is not null")
    private Chat chat;

    @ManyToOne
    @JoinColumn(name ="msg_writer_num")
    @MapsId("msgWriterNum")
    @NotNull(message = " is not null")
    private User writerUser;

}