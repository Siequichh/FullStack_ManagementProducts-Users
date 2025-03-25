package com.Siequichh.ProductsCrud.controller;

import com.Siequichh.ProductsCrud.DTO.ProductRequestDTO;
import com.Siequichh.ProductsCrud.DTO.ProductResponseDTO;
import com.Siequichh.ProductsCrud.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@Tag(name = "Product API", description = "Operations related to products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @Operation(summary = "Get all products", description = "Retrieves a list of all products")
    @GetMapping
    public ResponseEntity<List<ProductResponseDTO>> getProducts() {
        return ResponseEntity.ok(productService.findAll());
    }

    @Operation(summary = "Get product by ID", description = "Retrieve a specific product by its ID")
    @GetMapping("/{id}")
    public ResponseEntity<ProductResponseDTO> getProduct(@PathVariable Long id) {
        return ResponseEntity.ok(productService.findById(id));
    }

    @Operation(summary = "Get product by Name", description = "Retrieve a specific product by its Name")
    @GetMapping("/name/{name}")
    public ResponseEntity<List<ProductResponseDTO>> getProductByName(@PathVariable String name) {
        return ResponseEntity.ok(productService.findByName(name));
    }

    @Operation(summary = "Create a new product", description = "Only accessible to ADMIN")
    @SecurityRequirement(name = "bearerAuth")
    @PostMapping("/createProduct")
    public ResponseEntity<ProductResponseDTO> createProduct(@Valid @RequestBody ProductRequestDTO productRequestDTO) {
        return new ResponseEntity<>(productService.save(productRequestDTO),HttpStatus.CREATED);
    }

    @Operation(summary = "Update a product", description = "Only accessible to ADMIN")
    @SecurityRequirement(name = "bearerAuth")
    @PatchMapping("/updateProduct/{id}")
    public ResponseEntity<ProductResponseDTO> updateProduct(@PathVariable Long id ,@Valid @RequestBody ProductRequestDTO productRequestDTO) {
        return new ResponseEntity<>(productService.update(id, productRequestDTO),HttpStatus.OK);
    }

    @Operation(summary = "Delete a product", description = "Only accessible to ADMIN")
    @SecurityRequirement(name = "bearerAuth")
    @DeleteMapping("/deleteProduct/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
