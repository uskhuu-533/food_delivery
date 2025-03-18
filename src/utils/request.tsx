import axios from "axios";

 
const URL = "https://food-service-cyan.vercel.app"  
type Food ={
  categoty: string;
  food_name: string;
  price: number;
  food_description: string;
  food_image: string | null;
}
type food = {
  food_name: string;
  price: number;
  food_description: string;
  food_image: string;
}
 export   const fetchCategories = async () => {
    try {
      const response = await fetch(`${URL}/category`);
      const results = await response.json();
     return results
    } catch (err) {
      console.log(err);
    }
  };

  export const PostCategory = async (newCategory:{title : string}) => {
    try {
      const response = await axios.post(`${URL}/category`, newCategory)
      console.log(response); 
    } catch (error) {
      console.log(error);
    }
  }

export const putFood = async (foodData:Food, category:string, id:string) => {
  try {
    const res = await axios.put(`${URL}/food/${id}/${category}`,foodData)
    console.log(res);
    
  } catch (error) {
    console.log(error);
    
  }
}

export const addFood = async (foodData:food, category:string) => {
  try {
    const response = await axios.post(`${URL}/food/${category}`, foodData)
    console.log(response);
  } catch (error) {
    console.log(error);
    
  }
}

export const getFoods = async (category:string) => {
  try {
    const response = await axios.get(`${URL}/food/${category}`)
    console.log(response);
    return response.data
    
  } catch (error) {
    console.log(error);
    
  }
}

export const getAllFood = async () => {
  try {
    const response = await axios.get(`${URL}/food`)
    console.log(response);
    return response.data
    
  } catch (error) {
    console.log(error);
    
  }
} 