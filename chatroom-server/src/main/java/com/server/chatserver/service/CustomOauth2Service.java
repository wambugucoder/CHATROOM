package com.server.chatserver.service;


import com.google.gson.Gson;
import com.server.chatserver.exceptions.OAuth2AuthenticationProcessingException;
import com.server.chatserver.model.AuthProvider;
import com.server.chatserver.model.UserModel;
import com.server.chatserver.oauth2.GithubEmailResponse;
import com.server.chatserver.oauth2.OAuth2UserInfo;
import com.server.chatserver.oauth2.OAuth2UserInfoFactory;
import com.server.chatserver.repository.UserModelRepository;
import com.server.chatserver.security.ChatUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.client.RestTemplate;

import java.util.Optional;

@Service
public class CustomOauth2Service extends DefaultOAuth2UserService {

    @Autowired
    UserModelRepository userModelRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oauth2user = super.loadUser(userRequest);
        try {
            return processOauth2User(userRequest, oauth2user);

        } catch (AuthenticationException ex) {
            throw ex;
        } catch (Exception ex) {
            throw new InternalAuthenticationServiceException(ex.getMessage(), ex.getCause());
        }


    }

    public OAuth2User processOauth2User(OAuth2UserRequest oAuth2UserRequest, OAuth2User oAuth2User) {
        OAuth2UserInfo oAuth2UserInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(oAuth2UserRequest.getClientRegistration().getRegistrationId(), oAuth2User.getAttributes());
        if (!StringUtils.hasText(oAuth2UserInfo.getEmail())) {
            if (oAuth2UserRequest.getClientRegistration().getRegistrationId().equalsIgnoreCase("github")) {
                oAuth2UserInfo.setEmail(requestEmail(oAuth2UserRequest.getAccessToken().getTokenValue()));
            } else {
                throw new OAuth2AuthenticationProcessingException("Email not found from OAuth2 provider");
            }
        }
        Optional<UserModel> userOptional = Optional.ofNullable(userModelRepository.findByEmail(oAuth2UserInfo.getEmail()));
        UserModel user;
        if (userOptional.isPresent()) {
            user = userOptional.get();
            if (!user.getProvider().equals(AuthProvider.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId()))) {
              user=updateExistingUser(user, oAuth2UserInfo, oAuth2UserRequest);
            }
        } else {
            user = registerNewUser(oAuth2UserRequest, oAuth2UserInfo);
        }
        return  ChatUserDetails.create(user, oAuth2User.getAttributes());
    }

    private String requestEmail(String token) {
        String url = "https://api.github.com/user/emails";
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "token " + token);
        HttpEntity request = new HttpEntity(headers);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, request, String.class, 1);

        if (response.getStatusCode() == HttpStatus.OK) {
            Gson g = new Gson();
            GithubEmailResponse[] emails = g.fromJson(response.getBody(), GithubEmailResponse[].class);

            String primaryEmail = "";
            for (GithubEmailResponse email : emails)
                if (email.isPrimary()) {
                    primaryEmail = email.getEmail();
                    break;
                }
            return primaryEmail;
        } else {
            throw new OAuth2AuthenticationProcessingException("Email not found from OAuth2 provider");
        }

    }

    private UserModel registerNewUser(OAuth2UserRequest oAuth2UserRequest, OAuth2UserInfo oAuth2UserInfo) {
        UserModel user = new UserModel();

        user.setProvider(AuthProvider.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId()));
        user.setUsername(oAuth2UserInfo.getName());
        user.setEmail(oAuth2UserInfo.getEmail());
        user.setImageUrl(oAuth2UserInfo.getImageUrl());

        System.out.println(AuthProvider.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId()));
        return userModelRepository.save(user);
    }

    private UserModel updateExistingUser(UserModel existingUser, OAuth2UserInfo oAuth2UserInfo, OAuth2UserRequest oAuth2UserRequest) {
        existingUser.setUsername(oAuth2UserInfo.getName());
        existingUser.setImageUrl(oAuth2UserInfo.getImageUrl());
        existingUser.setProvider(AuthProvider.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId()));
        return userModelRepository.save(existingUser);
    }
}