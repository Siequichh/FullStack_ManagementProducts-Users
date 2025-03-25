import axios from "axios";

class UserService{
    
    static async registerUser (email,username,password){
        const role = "USER";
        try {
          const res = await axios.post("http://localhost:8080/auth/register", {
            email,
            username,
            password,
            role,
          });
          return res.data;

        } catch (error) {
          return UserService.handleError(error)
        }
      }


      static handleError=(error) => {
        if (error.response) {
            console.error("API Error:", error.response.data);
            return { error: error.response.data }; 
        } else if (error.request) {
            console.error("Network Error: No response received.");
            return { error: "No response from server" };
        } else {
            console.error("Unexpected Error:", error.message);
            return { error: "An unexpected error occurred" };
        }
    }
    

}

export default UserService;