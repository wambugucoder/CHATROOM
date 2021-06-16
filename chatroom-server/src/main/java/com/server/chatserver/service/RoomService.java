package com.server.chatserver.service;

import com.server.chatserver.model.RoomModel;
import com.server.chatserver.model.UserModel;
import com.server.chatserver.repository.RoomModelRepository;
import com.server.chatserver.repository.UserModelRepository;
import com.server.chatserver.request.CreateRoom;
import com.server.chatserver.socket_response.SocketResponse;
import com.server.chatserver.socket_response.SocketResponseType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomService {

    @Autowired
    SimpMessageSendingOperations simpMessageSendingOperations;

    @Autowired
    UserModelRepository userModelRepository;

    @Autowired
    RoomModelRepository roomModelRepository;


    public List<UserModel> ShowAllRooms(){
        return userModelRepository.findAll();
    }

    public void CreateRoom(CreateRoom createRoom,String userId){
        UserModel user= userModelRepository.findById(userId).get();
        RoomModel roomModel= new RoomModel();
        roomModel.setName(createRoom.getRoomName());
        roomModel.setDescription(createRoom.getDescription());
        roomModel.setCreatedBy(user);
        roomModel.setMax_no_of_people(createRoom.getTotal_users());
        //SAVE ROOM
        roomModelRepository.save(roomModel);
        //SEND A RESPONSE TO USER
        SocketResponse socketResponse= new SocketResponse();
        socketResponse.setContent("Your Room Has Been Created");
        socketResponse.setMessageType(SocketResponseType.CREATE_ROOM);
        //SEND SOCKET MESSAGE
        simpMessageSendingOperations.convertAndSend("/topic/private/"+ userId, socketResponse);

    }

}
