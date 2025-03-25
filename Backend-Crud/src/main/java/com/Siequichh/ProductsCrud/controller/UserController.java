package com.Siequichh.ProductsCrud.controller;

import com.Siequichh.ProductsCrud.DTO.User.AuthRequestDTO;
import com.Siequichh.ProductsCrud.DTO.User.AuthResponseDTO;
import com.Siequichh.ProductsCrud.DTO.User.RegisterRequestDTO;
import com.Siequichh.ProductsCrud.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@Tag(name = "Users API", description = "Operations related to users")
public class UserController {
    @Autowired
    private UserService userService;

    @Operation(summary = "Login", description = "Post username and Email to Login")
    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@Valid @RequestBody AuthRequestDTO authRequestDTO) {
        return ResponseEntity.ok(userService.login(authRequestDTO));
    }

    @Operation(summary = "Register a new user", description = "Post a new user to register")
    @PostMapping("/register")
    public ResponseEntity<AuthResponseDTO> register(@Valid @RequestBody RegisterRequestDTO registerRequestDTO) {
        return new ResponseEntity<>(userService.register(registerRequestDTO), HttpStatus.CREATED);
    }
}
