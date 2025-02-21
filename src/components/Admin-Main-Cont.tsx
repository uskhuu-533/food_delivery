'use client'

import { useEffect, useState } from "react";
import AdminHeader from "./Admin-Header"
import CategoryFoods from "./Category-Foods"

type Response = {
    title : string,
    _id : object,
    foods : Array<newfood>
}
type newfood = {
  food_name: string,
  price: string,
  food_description: string,
  food_image : File | undefined,
  title : string 
}
const AdminCont = () => {
      const [categories, setCategory] = useState<Response[]>([]);
      const [added, setAdded] = useState(true)
     const fetchCategory = async () => {
        try {
          const response = await fetch(`http://localhost:3000/category`);
          const results = await response.json();
          setCategory(results);
        } catch (err) {
          console.log(err);
        }
      };
      useEffect(() => {
        fetchCategory();
      },[added]);
    return(
        <div className="flex max-w-[1171px] w-full flex-col gap-6 ml-[235px] items-center mt-8 relative">
            <AdminHeader setAdded={setAdded}/>
            <div className="flex flex-col w-full gap-6 pb-10">
                {categories.map((category:Response, index)=>
                (<CategoryFoods key={index} category={category}/>))
            }
            </div>
        </div>
    )
}
export default AdminCont