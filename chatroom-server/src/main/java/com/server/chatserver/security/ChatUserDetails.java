package com.server.chatserver.security;

import com.server.chatserver.model.UserModel;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.HashSet;
import java.util.Map;

public class ChatUserDetails implements OAuth2User {
    private UserModel userModel;
    private Map<String, Object> attributes;

    public ChatUserDetails(UserModel user) {
        this.userModel=user;
    }

    public static ChatUserDetails create(UserModel user) {
        return new ChatUserDetails(user);
    }

    public static ChatUserDetails create(UserModel user, Map<String, Object> attributes) {
        ChatUserDetails userPrincipal = ChatUserDetails.create(user);
        userPrincipal.setAttributes(attributes);
        return userPrincipal;
    }
    public String getId() {
        return userModel.getId();
    }

    public String getAvatar() {
        return userModel.getImageUrl();
    }

    public String getAuthProvider() {
        return userModel.getProvider().toString();
    }
    public LocalDateTime getCreatedAt(){
        return userModel.getCreatedAt();
    }
    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<GrantedAuthority> authorities = new HashSet<>();
        authorities.add(new SimpleGrantedAuthority("USER"));
        return authorities;
    }

    /**
     * Returns the name of the authenticated <code>Principal</code>. Never
     * <code>null</code>.
     *
     * @return the name of the authenticated <code>Principal</code>
     */
    @Override
    public String getName() {
        return userModel.getUsername();
    }

    public void setAttributes(Map<String, Object> attributes) {
        this.attributes = attributes;
    }
}
