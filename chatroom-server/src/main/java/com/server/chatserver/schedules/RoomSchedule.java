package com.server.chatserver.schedules;

import com.google.gson.Gson;
import com.server.chatserver.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;


@Component
public class RoomSchedule {

    @Autowired
    RoomService roomService;

    @Autowired
    SimpMessageSendingOperations simpMessageSendingOperations;

    @Scheduled(fixedDelay = 1000)
    private void sendRoomDetails(){
        Gson gson=new Gson();

        simpMessageSendingOperations.convertAndSend("/topic/public/rooms",gson.toJson(roomService.ShowAllRooms()));

    }
}
