package com.Siequichh.ProductsCrud.service;

import com.Siequichh.ProductsCrud.DTO.User.AuthRequestDTO;
import com.Siequichh.ProductsCrud.DTO.User.AuthResponseDTO;
import com.Siequichh.ProductsCrud.DTO.User.RegisterRequestDTO;

public interface UserService {
    AuthResponseDTO login(AuthRequestDTO authRequestDTO);
    AuthResponseDTO register(RegisterRequestDTO registerRequestDTO);
}
