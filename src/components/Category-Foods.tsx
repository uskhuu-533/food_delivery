"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { FileInput, Plus } from "lucide-react";

import { useState } from "react";
import { CldImage } from 'next-cloudinary';


type props = {
  category: Response;
};
type Response = {
  title: string;
  _id:object,
  foods : Array<newfood>
};
type newfood = {
  food_name: string,
  price: string,
  food_description: string,
  food_image : File | undefined,
  title : string 
}
const CategoryFoods = ({ category }: props) => {
  const [newFood, setNewFood] = useState<newfood>({
    food_name: "",
    price: "",
    food_description: "",
   food_image : undefined,
    title : category.title 
  }); 
  const [image, setImage] = useState()
  const addNewFood = async () => {
    try {
      // const response = await axios.put(`http://localhost:3000/category`, {
      //   newFood
      // })
    
      const response = await fetch(`http://localhost:3000/category`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body:  JSON.stringify(newFood),
      });

      console.log(newFood);
      
  
      const result =await response.json()
      console.log("Response:", result);

    
    
    } catch (err) {
      console.error("Error posting food:", err);
    }
  };
  const uploadImage = async (e:React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.type == "file" && e.target.files){
      const file =  e.target.files[0]
      const formData = new FormData();
    
     
      try {
    if(file){
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'food12345');
          // formData.append('236836261763157', '1mYhVx65cBh8-vjpIGEZng5MNX4');
        
        const response = await fetch(
          `https://api.cloudinary.com/v1_1//auto/upload`,
          {
            method: 'POST',
            body: formData,
          }
        );
    
        const result = await response.json();
        setNewFood({...newFood, food_image:result.secure_url})

        if (response.ok) {
        
          console.log(result);
          
        }
      }
      } catch (err) 
      {
        console.log(err);
        
      }
    }}
 
  
  

  return (
    <div className="w-full h-fit rounded-md p-6 bg-white flex flex-col gap-3">
      <p>{category.title}</p>
      <div className="flex flex-wrap gap-6">
        <div className="w-[239px] h-[225px] rounded-md border-[#EF4444] border-2 border-dashed flex gap-6 items-center justify-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="px-3 py-3 bg-[#EF4444] rounded-full"
              >
                <Plus size={16} />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[460px] flex flex-col gap-8">
              <DialogHeader>
                <DialogTitle className="text-black text-xl">
                  Add new Dish to Appetizers
                </DialogTitle>
              </DialogHeader>
              <div className="flex">
                <div>
                  <label>Food name</label>
                  <input
                  className="px-3 py-2 border rounded-md"
                  placeholder="Type food name..."
                    onChange={(e) =>
                      setNewFood({ ...newFood, food_name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label>FoodPrice</label>
                  <input
                  placeholder="Enter the price..."
                  className="px-3 py-2 border rounded-md"
                    onChange={(e) =>
                      setNewFood({ ...newFood, price: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label>Category name</label>
                <input
                  className="px-3 py-2 border rounded-md"
                  placeholder="Type category name..."
                  onChange={(e) =>
                    setNewFood({ ...newFood, food_description: e.target.value })
                  }
                />
              </div>
              <div>
                <label>Food Image</label>
                <input type="file" onChange={(e)=>uploadImage(e)}/>
              </div>
              <DialogDescription></DialogDescription>
              <DialogFooter>
                <Button type="submit" onClick={addNewFood}>
                  add category
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        {category.foods.map((food:newfood, index)=>(
          <div key={index} className="w-[239px] h-[225px] rounded-md border-[#EF4444] border flex flex-col p-4">
            <div className="w-full h-[70%] overflow-hidden rounded-md flex items-center">
              <img src={`${food.food_image}`} alt="food" className="w-full scale-100"/>
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
