package com.Siequichh.ProductsCrud.service.Impl;

import com.Siequichh.ProductsCrud.DTO.ProductRequestDTO;
import com.Siequichh.ProductsCrud.DTO.ProductResponseDTO;
import com.Siequichh.ProductsCrud.entity.Product;
import com.Siequichh.ProductsCrud.repository.ProductRepository;
import com.Siequichh.ProductsCrud.service.ProductService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Override
    public List<ProductResponseDTO> findAll() {
        try{
            List<Product> products = productRepository.findAll();

            return products.stream()
                    .map(product -> new ProductResponseDTO(product.getId(),product.getName(),product.getPrice(),product.getStock()))
                    .collect(Collectors.toList());
        } catch (RuntimeException e) {
            e.printStackTrace();
            return null;
        }

    }

    @Override
    public ProductResponseDTO findById(Long id) {
        Product product = productRepository.findById(id).orElseThrow(() -> new RuntimeException("Product not found with ID: " + id));
        return new ProductResponseDTO(product.getId(),product.getName(),product.getPrice(),product.getStock());
    }

    @Override
    public List<ProductResponseDTO> findByName(String name) {
        List<Product> products = productRepository.findByNameContainingIgnoreCase(name);
        if (products.isEmpty()) {
            throw new RuntimeException("No products found with name: " + name);
        } else {
            return products.stream()
                    .map(product -> new ProductResponseDTO(product.getId(), product.getName(), product.getPrice(), product.getStock()))
                    .collect(Collectors.toList());
        }
    }

    @Override
    @Transactional
    public ProductResponseDTO save(ProductRequestDTO productRequestDTO) {
        Product newProduct = new Product();

        if (productRequestDTO == null) {
            throw new IllegalArgumentException("ProductRequestDTO cannot be null");
        }
        if (productRequestDTO.getName() == null || productRequestDTO.getName().isEmpty()) {
            throw new IllegalArgumentException("Product name cannot be null or empty");
        }
        if (productRequestDTO.getPrice() < 0) {
            throw new IllegalArgumentException("Product price cannot be negative");
        }
        if (productRequestDTO.getStock() < 0) {
            throw new IllegalArgumentException("Product stock cannot be negative");
        }
            newProduct.setName(productRequestDTO.getName());
            newProduct.setPrice(productRequestDTO.getPrice());
            newProduct.setStock(productRequestDTO.getStock());
            Product saveProduct = productRepository.save(newProduct);
            return new ProductResponseDTO(saveProduct.getId(),saveProduct.getName(),saveProduct.getPrice(),saveProduct.getStock());

    }

    @Override
    @Transactional
    public ProductResponseDTO update(Long id, ProductRequestDTO productRequestDTO) {
        Product actProduct = productRepository.findById(id).orElseThrow(() -> new RuntimeException("Product not found with ID: " + id));
        if(productRequestDTO.getName() !=null){
            actProduct.setName(productRequestDTO.getName());
        }
        if(productRequestDTO.getPrice() !=null){
          actProduct.setPrice(productRequestDTO.getPrice());
        }
        if(productRequestDTO.getStock() >=0){
            actProduct.setStock(productRequestDTO.getStock());
        }

        Product updateProduct = productRepository.save(actProduct);

        return new ProductResponseDTO(updateProduct.getId(),updateProduct.getName(),updateProduct.getPrice(),updateProduct.getStock());
    }

    @Override
    @Transactional
    public void delete(Long id) {
        Product product = productRepository.findById(id).orElseThrow(() -> new RuntimeException("Product not found with ID: " + id));
        productRepository.deleteById(product.getId());
    }
}
