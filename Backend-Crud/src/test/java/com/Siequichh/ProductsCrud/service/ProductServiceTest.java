package com.Siequichh.ProductsCrud.service;

import com.Siequichh.ProductsCrud.DTO.ProductResponseDTO;
import com.Siequichh.ProductsCrud.entity.Product;
import com.Siequichh.ProductsCrud.repository.ProductRepository;
import com.Siequichh.ProductsCrud.service.Impl.ProductServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class) // Enables Mockito in JUnit
public class ProductServiceTest {
    //We need the real object, but we would have to create a constructor, pass a productRepository,etc it's better a Mock
    @Mock // Fake repository (DOES NOT CALL THE DATABASE)
    private ProductRepository productRepository;

    @InjectMocks // Injects the fake repository into ProductService
    private ProductServiceImpl productService;

    @Test
    void findAllShouldReturnAllProducts(){
        Product product1 = new Product(1L, "Laptop", 1200.00, 15);
        Product product2 = new Product(2L, "Phone", 800.00, 20);

        when(productRepository.findAll()).thenReturn(Arrays.asList(product1, product2)); // Fake DB call

        // Act: Call the service method
        List<ProductResponseDTO> products = productService.findAll();

        // Assert: Check if the returned list is correct
        assertEquals(2, products.size());
        assertEquals("Laptop", products.get(0).getName());
        assertNotNull(products);
    }
}
