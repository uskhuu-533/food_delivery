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
import { uploadImage } from "@/utils/image-upload";
import { DialogDescription } from "@radix-ui/react-dialog";
import axios from "axios";
import { Plus } from "lucide-react";
import { useState } from "react";
type Props = {
  category: Response;
  getFood: Function;
};
type Response = {
  title: string;
  _id: string;
};
type newfood = {
  food_name: string;
  price: string;
  food_description: string;
  food_image: File | undefined;
  category: string;
};
const AddNewFood = ({ category, getFood }: Props) => {
  const [newFood, setNewFood] = useState<newfood>({
    food_name: "",
    price: "",
    food_description: "",
    food_image: undefined,
    category: category._id,
  });

  const addNewFood = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/food/${category._id}`,
        newFood
      );
      console.log(newFood);
      console.log(response);
    } catch (err) {
      console.log("Error posting food:", err);
    } finally {
      getFood();
    }
  };
  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const URL = await uploadImage(e)
      setNewFood({...newFood, food_image:URL})
    } catch (error) {
      console.log(error);
      
    }
  };
  return (
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
            <input type="file" onChange={(e) => handleUploadImage(e)} />
          </div>
          <DialogDescription></DialogDescription>
          <DialogFooter>
            <Button type="submit" onClick={addNewFood}>
              Add dish{" "}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default AddNewFood;
