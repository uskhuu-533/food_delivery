"use client";

import { useEffect, useState } from "react";

import axios from "axios"
import AddNewFood from "../_components/AddFood";
import EditFood from "../_components/EditFood";
type props = {
  category: Response;
  categories : Response[]
};
type Response = {
  title: string;
  _id: string;
};
type Food = {
  food_name: string;
  price: string;
  food_description: string;
  food_image: string | null;
  category: string;
  _id : object
};
const CategoryFoods = ({ category, categories}: props) => {
  const [foods, setFoods] = useState([])

  const getFood = async () =>{
    try{
  
      const response = await axios.get(`http://localhost:3000/food/${category._id}`)  
      setFoods(response.data)
    }catch(error){
      console.log(error);
      
    }
  }
  useEffect(()=> {
    getFood()
  },[])

  return (
    <div className="w-full h-fit rounded-md p-6 bg-white flex flex-col gap-3">
      <p>{category.title}</p>
      <div className="flex flex-wrap gap-6">
        
        <AddNewFood category={category} getFood={getFood}/>
        {foods.map((food: Food, index) => (
          <div
            key={index}
            className="w-[271px] h-[257px] rounded-md border-[#EF4444] border flex flex-col p-4"
          >
            <div className="w-full h-[70%] relative overflow-hidden rounded-md flex items-center justify-end">
              <img
                src={`${food.food_image}`}
                alt="food"
                className="w-full scale-100"
              />
              <EditFood getFood={getFood}  food={food} categories={categories}/>
            </div>
            <div className="w-full flex justify-between">
              <p>{food.food_name}</p>
              <p>{food.price}</p>
            </div>
            <div className="text-[12px]">{food.food_description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default CategoryFoods;
