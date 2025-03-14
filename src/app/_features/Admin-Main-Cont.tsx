'use client'

import { useEffect, useState } from "react";

import CategoryFoods from "./Category-Foods"
import FoodMenuHeader from "@/app/_features/Food-Menu-Header";

type Response = {
    title : string,
    _id : string,
    food_count : Array<foods>
}
type foods = {
  food_name: string,
  price: string,
  food_description: string,
  food_image : string | null,
  category : string ,
  _id : object
}
const AdminCont = () => {
      const [categories, setCategory] = useState<Response[]>([]);
 
     const fetchCategory = async () => {
        try {
          const response = await fetch(`http://localhost:3000/category`);
          const results = await response.json();
          console.log(results);
          
          setCategory(results);
        } catch (err) {
          console.log(err);
        }
      };
      useEffect(() => {
        fetchCategory();
      },[]);
    return(
        <div className="flex w-full flex-col gap-6 ml-[200px] items-center mt-8 relative px-8">
            <FoodMenuHeader fetchCategory={fetchCategory} categories={categories}/>
            <div className="flex flex-col w-full gap-6 pb-10">
                {categories.map((category:Response, index)=>
                (<CategoryFoods  key={index} category={category} categories={categories}/>))
            }
            </div>
        </div>
    )
}
export default AdminCont