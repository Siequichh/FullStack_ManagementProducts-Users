package com.Siequichh.ProductsCrud.service;

import com.Siequichh.ProductsCrud.DTO.ProductRequestDTO;
import com.Siequichh.ProductsCrud.DTO.ProductResponseDTO;

import java.util.List;

public interface ProductService {
    List<ProductResponseDTO> findAll();
    ProductResponseDTO findById(Long id);
    List<ProductResponseDTO> findByName(String name);
    ProductResponseDTO save(ProductRequestDTO productRequestDTO);
    ProductResponseDTO update(Long id,ProductRequestDTO productRequestDTO);
    void delete(Long id);

}
