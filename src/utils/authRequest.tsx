import axios from "axios";

// const baseUrl = "https://food-service-cyan.vercel.app";
// const baseUrl = "http://localhost:3000";
const baseUrl = "https://food-backend-8ud7.onrender.com"
type User = {
  email: string;
  address: string;
  role: string;
};
export const login = async (form: { email: string; password: string }) => {
  try {
    const response = await axios.post(`${baseUrl}/users/login`, form, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const signUp = async (user: { email: string; password: string }) => {
  try {
    const response = await axios.post(`${baseUrl}/users`, user);
    console.log(response);

    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getUserEmail = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get<User>(`${baseUrl}/users`, {
      headers: {
        Authorization: token,
      },
    });
    console.log(response);

    return response.data || null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const getUsers = async (page: number, email: string) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(
      `${baseUrl}/users/admin/${page}?searchEmail=${email}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    console.log(response);

    return response.data;
  } catch (error) {
    console.log(error);
    return { users: [], totalResults: 0, totalPages: 0 };
  }
};
export const changeRole = async (role : string, userId : string) => {
  const token = localStorage.getItem("token");
  try {
    await axios.put(`${baseUrl}/users/role/${userId}`,{role :role}, {
      headers : {
        Authorization : token
      }
    });
  } catch (error) {
    console.log(error);
  }
};
