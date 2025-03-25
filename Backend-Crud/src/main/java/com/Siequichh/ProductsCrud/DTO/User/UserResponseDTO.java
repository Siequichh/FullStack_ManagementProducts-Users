package com.Siequichh.ProductsCrud.DTO.User;

import com.Siequichh.ProductsCrud.Utils.Role;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserResponseDTO {
    private Long id;
    private String email;
    private String username;
    private String password;
    private Role role;
}
