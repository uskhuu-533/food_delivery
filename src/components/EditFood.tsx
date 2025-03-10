import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { uploadImage } from "@/utils/image-upload";
import axios from "axios";
import { Edit2, Trash, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner"
type Props = {
  food: Food;
  getFood : Function
};
type Food = {
  food_name: string;
  price: string;
  food_description: string;
  food_image: string | null;
  category: string;
  _id : object
}
type Response = {
    title : string,
    _id : string,
    foods : Array<Food>
}
const EditFood = ({ food , getFood}: Props) => {
  const [categories, setCategories] = useState([]);
  const [editedFood, setEditedFood] = useState({
    category: food.category,
    food_name: food.food_name,
    food_description: food.food_description,
    food_image: food.food_image,
    price: food.price,
  });
  const [isLoading, setIsLoading] = useState(false)
  const editFood = async () => {
    try {
      const response = axios.put(`http://localhost:3000/food/${food._id}`, editedFood);
      console.log(response);
      console.log(editedFood);
      
      
    } catch (error) {
      console.log(error);
    }finally{
        getFood()
    }
  };
  const fetchCategory = async () => {
    try {
      const response = await fetch(`http://localhost:3000/category`);
      const results = await response.json();
      setCategories(results);
    } catch (err) {
      console.log(err);
    }
  };
  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setIsLoading(true)
      const URL = await uploadImage(e)
      setEditedFood({...editedFood, food_image:URL})
    } catch (error) {
      console.log(error);
    }finally{
      setIsLoading(false)
    }
  };
  const deleteFood = async () =>{
    try {
        const response = await axios.delete(`http://localhost:3000/food/${food._id}`)
        console.log(response);
        
    } catch (error) {
        console.log(error);
        
    }finally{ 
        getFood()
        toast("Event has been created", {
            description: "Sunday, December 03, 2023 at 9:00 AM",
            action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
            },
          })
  }
}

  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          onClick={fetchCategory}
          variant="outline"
          className="absolute w-11 h-11 right-3 bottom-4 rounded-full"
        >
          <Edit2 size={5} stroke="#EF4444" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Dishes info</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="name" className="text-right">
              Dish name
            </label>
            <input
              value={editedFood.food_name}
              id="name"
              className="col-span-3 border rounded-md"
              onChange={(e) =>
                setEditedFood({ ...editedFood, food_name: e.target.value })
              }
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="username" className="text-right">
              Ingredients
            </label>
            <input
              value={editedFood.food_description}
              id="username"
              className="col-span-3 border rounded-md"
              onChange={(e) =>
                setEditedFood({
                  ...editedFood,
                  food_description: e.target.value,
                })
              }
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="username" className="text-right">
              Category
            </label>
            <select name="category" value={editedFood.category}   onChange={(e) => setEditedFood({...editedFood, category: e.target.value})}>
                {categories.map((category:Response, index)=>(
                    <option key={index} value={category._id} >{category.title}</option>
                ))}
            </select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="username" className="text-right">
              price
            </label>
            <input
              value={editedFood.price}
              id="username"
              className="col-span-3 border rounded-md"
              onChange={(e) =>
                setEditedFood({ ...editedFood, price: e.target.value })
              }
            />
          </div>
          <div className="w-full">
            <label htmlFor="username" className="text-right">
              Image
            </label>
            {isLoading === false ?(<>{editedFood.food_image === null && (
              <input
                className="p-4 border h-[150px] w-full rounded-md"
                type="file"
                placeholder="Choose a file or drag & drop it here"
                onChange={(e) => handleUploadImage(e)}
              />
            )}
            {editedFood.food_image && (
              <div className="w-full h-[150px] flex items-center relative overflow-hidden rounded-md">
                <img src={editedFood.food_image} className="w-full" />
                <Button className="absolute rounded-full w-4 h-8 top-2 right-2 z-20"
                   onClick={() => setEditedFood({ ...editedFood, food_image: null })}>
                  <X
                    size={4}
                  />
                </Button>
              </div>
            )}</>):(<div className="w-full h-[150px] animate-pulse bg-gray-400/30 rounded-md"></div>)}
          </div>
        </div>
        <DialogFooter className="flex justify-between">
          <Button onClick={deleteFood}>
            <Trash />
          </Button>
          <Button type="submit" onClick={editFood}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default EditFood;
