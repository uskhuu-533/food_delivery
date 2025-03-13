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
import { Plus, X } from "lucide-react";
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
  food_image: string | null;
  category: string;
};
const AddNewFood = ({ category, getFood }: Props) => {
  const [newFood, setNewFood] = useState<newfood>({
    food_name: "",
    price: "",
    food_description: "",
    food_image: null,
    category: category._id,
  });
  const [isLoading, setIsLoading] = useState(false);
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
      setIsLoading(true);
      const URL = await uploadImage(e);
      setNewFood({ ...newFood, food_image: URL });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
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
        <DialogContent className="sm:max-w-[460px] flex flex-col gap-6">
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
            <label>Food Image
            {isLoading === false ?(<>{newFood.food_image === null && (
              <input
                className="p-4 border h-[150px] w-full rounded-md hidden"
                type="file"
                placeholder="Choose a file or drag & drop it here"
                onChange={(e) => handleUploadImage(e)}
              />
            )}
            {newFood.food_image && (
              <div className="w-full h-[150px] flex items-center relative overflow-hidden rounded-md">
                <img src={newFood.food_image} className="w-full" />
                <Button className="absolute rounded-full w-4 h-8 top-2 right-2 z-20"
                   onClick={() => setNewFood({ ...newFood, food_image: null })}>
                  <X
                    size={4}
                  />
                </Button>
              </div>
            )}</>):(<div className="w-full h-[150px] animate-pulse bg-gray-400/30 rounded-md"></div>)}</label>
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
