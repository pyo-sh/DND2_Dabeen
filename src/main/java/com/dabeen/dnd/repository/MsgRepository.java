package com.dabeen.dnd.repository;

import com.dabeen.dnd.model.entity.Msg;
import com.dabeen.dnd.model.pk.MsgPK;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MsgRepository extends JpaRepository<Msg,MsgPK>{ 

}