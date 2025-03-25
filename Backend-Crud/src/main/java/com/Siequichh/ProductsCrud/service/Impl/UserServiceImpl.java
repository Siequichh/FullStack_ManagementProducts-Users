package com.Siequichh.ProductsCrud.service.Impl;

import com.Siequichh.ProductsCrud.DTO.User.AuthRequestDTO;
import com.Siequichh.ProductsCrud.DTO.User.AuthResponseDTO;
import com.Siequichh.ProductsCrud.DTO.User.RegisterRequestDTO;
import com.Siequichh.ProductsCrud.Utils.JWTUtils;
import com.Siequichh.ProductsCrud.entity.User;
import com.Siequichh.ProductsCrud.repository.UserRepository;
import com.Siequichh.ProductsCrud.service.UserService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;


@Service
public class UserServiceImpl implements UserService {
    @Autowired private UserRepository userRepository;
    @Autowired private JWTUtils jwtUtils;
    @Autowired private PasswordEncoder passwordEncoder;
    @Autowired private AuthenticationManager authenticationManager;



    @Override
    @Transactional
    public AuthResponseDTO login(AuthRequestDTO authRequestDTO){
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequestDTO.getEmail(), authRequestDTO.getPassword()));
        User user = userRepository.findByEmail(authRequestDTO.getEmail()).orElseThrow(() -> new RuntimeException("User not found"));
        String token = jwtUtils.generateToken(user);
        String refreshToken = jwtUtils.generateRefreshToken(new HashMap<>(),user);

        return new AuthResponseDTO(token, refreshToken);
    }

    @Override
    @Transactional
    public AuthResponseDTO register(RegisterRequestDTO registerRequestDTO) {
        User newUser = new User();
        newUser.setEmail(registerRequestDTO.getEmail());
        newUser.setUsername(registerRequestDTO.getUsername());
        newUser.setPassword(passwordEncoder.encode(registerRequestDTO.getPassword()));
        newUser.setRole(registerRequestDTO.getRole());

        userRepository.save(newUser);

        String token = jwtUtils.generateToken(newUser);
        String refreshToken = jwtUtils.generateRefreshToken(new HashMap<>(),newUser);

        return new AuthResponseDTO(token, refreshToken);
    }
}
