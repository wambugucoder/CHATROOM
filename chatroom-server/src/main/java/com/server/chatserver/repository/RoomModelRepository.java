package com.server.chatserver.repository;

import com.server.chatserver.model.RoomModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomModelRepository extends JpaRepository<RoomModel, String> {
}