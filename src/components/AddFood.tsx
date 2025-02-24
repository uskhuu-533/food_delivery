'use client'
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
import axios from "axios";
import { Plus } from "lucide-react";
import { useState } from "react";
type Props = {
   category : Response,
   getFood :Function
}
type Response ={
    title:string
}
type newfood = {
    food_name: string;
    price: string;
    food_description: string;
    food_image: File | undefined;
    category: string;
  };
const AddNewFood = ({category, getFood}:Props) => {
    const [newFood, setNewFood] = useState<newfood>({
        food_name: "",
        price: "",
        food_description: "",
        food_image: undefined,
        category: category.title,
      });
     
      const addNewFood = async () => {
    
        try {
    const response =await axios.post(`http://localhost:3000/food/${category}`, newFood)
    console.log(newFood);
        } catch (err) {
          console.log("Error posting food:", err);

          
        }finally{
          getFood()
        }
      };
      const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.type == "file" && e.target.files) {
          const file = e.target.files[0];
          const formData = new FormData();
    
          try {
            if (file) {
              const formData = new FormData();
              formData.append("file", file);
              formData.append("upload_preset", "food12345");
    
              const response = await fetch(
                `https://api.cloudinary.com/v1_1/dqhu3nn3p/auto/upload`,
                {
                  method: "POST",
                  body: formData,
                }
              );
    
              const result = await response.json();
              setNewFood({ ...newFood, food_image: result.secure_url });
    
              if (response.ok) {
                console.log(result);
              }
            }
          } catch (err) {
            console.log(err);
          }
        }
      };
    return(
        <div className="w-[271px] h-[257px] rounded-md border-[#EF4444] border-2 border-dashed flex gap-6 items-center justify-center">
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
                <label>Ingredients</label>
                <input
                  className="px-3 py-2 border rounded-md"
                  placeholder="Ingredients..."
                  onChange={(e) =>
                    setNewFood({ ...newFood, food_description: e.target.value })
                  }
                />
              </div>
              <div>
                <label>Food Image</label>
                <input type="file" onChange={(e) => uploadImage(e)} />
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
    )
}
export default AddNewFood