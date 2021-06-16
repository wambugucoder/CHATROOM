package com.server.chatserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;

@SpringBootApplication
@EnableJpaAuditing
@EnableWebSocketMessageBroker
public class ChatroomServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(ChatroomServerApplication.class, args);
    }

}
