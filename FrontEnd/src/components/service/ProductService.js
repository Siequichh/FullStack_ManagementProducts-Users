import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/api/products",
    headers: {
        "Content-Type": "application/json",
    }
});

class ProductService{

    static async getAllProducts(){
        try{
            const response = await api.get("");
            return response.data
        }catch(error){
            return ProductService.handleError(error);
        }
    }

    static async getProduct(idProducto){
        try{
            const response = await api.get(`/${idProducto}`)
            return response.data
        }catch(error){
            return ProductService.handleError(error);
        }

    }

    static async getProductByName(nameProducto){
        try{
            const response = await api.get(`/name/${nameProducto}`)
            return response.data
        }catch(error){
            return ProductService.handleError(error);
        }
    }

    static async createProduct(product){
        try{
            const response = await api.post("/createProduct",product);
            return response.data
        }catch(error){
            return ProductService.handleError(error);
        }
    }

    static async updateProduct(product,idProducto){
        try{    
            const response = await api.put(`/updateProduct/${idProducto}`,product);
            return response.data
        }catch(error){
            return ProductService.handleError(error);
        }
    }

    static async deleteProduct(idProducto){

        try{
            const response = await api.delete(`/deleteProduct/${idProducto}`);
            return response.data
        }catch(error){
            return ProductService.handleError(error);
        }

    }

    //handle errors
    static handleError=(error) => {
        if (error.response) {
            // If the error is from the backend (API returned an error response)
            console.error("API Error:", error.response.data);
            return { error: error.response.data };  // 👈 This is the key part!
        } else if (error.request) {
            // If the request was made, but no response was received (e.g., server is down)
            console.error("Network Error: No response received.");
            return { error: "No response from server" };
        } else {
            // If an unexpected error happens (e.g., a syntax error)
            console.error("Unexpected Error:", error.message);
            return { error: "An unexpected error occurred" };
        }
    }

    
}

export default ProductService;