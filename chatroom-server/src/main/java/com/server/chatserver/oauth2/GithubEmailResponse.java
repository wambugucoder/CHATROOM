package com.server.chatserver.oauth2;;

public class GithubEmailResponse {
    private String email;
    private boolean primary;
    private boolean verified;
    private String visibility;

    public GithubEmailResponse() {
        //EMPTY CONSTRUCTOR
    }

    public String getEmail() {
        return email;
    }

    public boolean isPrimary() {
        return primary;
    }

    public boolean isVerified() {
        return verified;
    }

    public String getVisibility() {
        return visibility;
    }
}
