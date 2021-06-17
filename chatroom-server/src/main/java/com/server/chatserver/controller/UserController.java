package com.server.chatserver.controller;


import com.server.chatserver.model.RoomModel;
import com.server.chatserver.request.CreateRoom;
import com.server.chatserver.service.RoomService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class UserController {

    Logger logger= LoggerFactory.getLogger(UserController.class);

    @Autowired
    RoomService roomService;


    @MessageMapping("/{userId}/createRoom")
    @SendTo("/topic/private/{userId}")
    private void createPublicRoom(@Payload CreateRoom createRoom ,@DestinationVariable String userId){
        logger.info(createRoom.getRoomName());
        roomService.CreateRoom(createRoom, userId);
    }

    @MessageMapping("/rooms.showAll")
    @SendTo("/topic/public/rooms")
    private List<RoomModel> showAllRooms(){
        return roomService.ShowAllRooms();
    }




}
