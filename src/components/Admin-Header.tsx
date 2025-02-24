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

import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import FoodCount from "./Food-Count";
import axios from "axios";
type Response = {
  title: string;
  count: number;
  foods :Array<foods>
};
type foods = {
    food_name : string
}
type Props = {
    setAdded: React.Dispatch<React.SetStateAction<boolean>>;
  };
  
const AdminHeader = ({setAdded}: Props) => {
  const [category, setCategory] = useState< Response[]>([]);
  const [newCategory, setNewCategory] = useState({ title: "" });
  const [foods, setFoods] =useState([])
  const fetchCategory = async () => {
    try {
      const response = await fetch(`http://localhost:3000/category`);
      const results = await response.json();
      setCategory(results);
      setAdded((prev) => !prev)
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchCategory();
  },[]);
  const addNewCategory = async () => {
    try {
      const response = await fetch("http://localhost:3000/category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCategory),
      });

      const text = await response.text();
      console.log("Response status:", response.status);
      console.log("Response text:", text);
    
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (err) {
      console.error("Error posting user:", err);
    }finally{
        fetchCategory()
       
    }
  };
  
  const getAllFoods = async () =>{
  
      try{
    
        const response = await axios.get(`http://localhost:3000/food/all%20dishes`)
        console.log(response);
        
        setFoods(response.data)
      }catch(error){
        console.log(error);
        
      
    }
  }
  useEffect(()=> {
    getAllFoods()
  },[])

  return (
    <div className=" w-full max-w-[1171px] h-fit top-6  flex flex-col gap-6">
      <div className="w-full h-fit flex justify-end">
        <div className="h-9 w-9 rounded-full bg-green-400"></div>
      </div>
      <div className="w-full h-fit rounded-md p-6 bg-white flex flex-col gap-3">
        <div className="text-xl font-bold text-black">Dishes category</div>
        <div className="flex flex-wrap gap-3">
        <button className="flex px-4 py-2 rounded-full text-black items-center border gap-2">
              <p>All dishes</p>
              <div className="py-[2px] text-white text-sm px-[10px] rounded-full bg-black">
               {foods.length}
              </div>
            </button>
          {category?.map((category: Response, index) => (
            <button key={index} className="flex px-4 py-2 rounded-full text-black items-center border gap-2">
              <p>{category.title}</p>
             <FoodCount category={category}/>
            </button>
          ))}

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
                  Add new category
                </DialogTitle>
              </DialogHeader>

              <div className="flex flex-col gap-2">
                <label>Category name</label>
                <input
                  id="name"
                  className="px-3 py-2 border rounded-md"
                  placeholder="Type category name"
                  onChange={(e) =>
                    setNewCategory({ ...newCategory, title: e.target.value })
                  }
                />
              </div>
              <DialogDescription></DialogDescription>
              <DialogFooter>
                <Button type="submit" onClick={addNewCategory}>
                  add category
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};
export default AdminHeader;
