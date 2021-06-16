package com.server.chatserver.repository;

import com.server.chatserver.model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserModelRepository extends JpaRepository<UserModel, String> {

    UserModel findByEmail(String email);

}