package com.dabeen.dnd.repository;

import com.dabeen.dnd.model.entity.Chat;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRepository extends JpaRepository<Chat,String>{

}