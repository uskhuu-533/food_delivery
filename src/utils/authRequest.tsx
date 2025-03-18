import axios from "axios";
const baseUrl = "https://food-service-cyan.vercel.app";
export const login = async (form: { email: string; password: string }) => {
  try {
    const response = await axios.post(`${baseUrl}/users/login`, form, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    
    return response
  } catch (error) {
    console.log(error);
    
  }
};
export const signUp = async (user:{ email: string; password: string }) => {
    try {
        const response = await axios.post(`${baseUrl}/users`, user)
        console.log(response);
        
        return response
    } catch (error) {
        console.log(error);
        
    }
}