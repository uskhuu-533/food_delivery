import axios from "axios";
// const baseUrl = "https://food-service-cyan.vercel.app";
const baseUrl = "http://localhost:3000"
// const baseUrl = "https://food-backend-8ud7.onrender.com"
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

export const getUserEmail = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(`${baseUrl}/users`, {
      headers: {
        Authorization: token,
      },
    });
    console.log(response);
    
    return response.data;
  } catch (error) {
    console.log(error);
  }
};