package com.server.chatserver.socket_response;

public class SocketResponse {
    private String content;
    private SocketResponseType messageType;

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public SocketResponseType getMessageType() {
        return messageType;
    }

    public void setMessageType(SocketResponseType messageType) {
        this.messageType = messageType;
    }
}
