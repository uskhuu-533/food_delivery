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
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Edit2, Trash, X } from "lucide-react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import FormsField from "./Form-Field";
import ImageInput from "./ImageInput";
import { putFood } from "@/utils/request";
type Props = {
  food: Food;
  getFood(): Promise<void>;
  categories: Response[];
};
type Food = {
  food_name: string;
  price: number;
  food_description: string;
  food_image: string | null;
  category: Response;
  _id: string;
};
type Response = {
  title: string;
  _id: string;
};
const formSchema = z.object({
  food_name: z.string().min(1, { message: "Field food name is required." }),
  price: z
    .string()
    .min(1, { message: "Field price is required." })
    .transform((value) => parseInt(value)),
  food_description: z
    .string()
    .min(1, { message: "Field ingredients are required." }),
  category: z.string().min(1, { message: "category " }),
});
const EditFood = ({ food, getFood, categories }: Props) => {
  const [image, setImage] = useState<File | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      food_name: food.food_name,
      price: food.price,
      food_description: food.food_description,
      category: food.category._id,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      let foodImage = food.food_image;
      if (image) {
        foodImage = await uploadImage(image);
      }
      const foodData = {
        categoty: values.category,
        food_name: values.food_name,
        price: values.price,
        food_description: values.food_description,
        food_image: foodImage,
      };
      await putFood(foodData, foodData.categoty, food._id)
        getFood()
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const deleteFood = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/food/${food._id}`
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      getFood();
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="absolute w-11 h-11 right-3 bottom-4 rounded-full"
        >
          <Edit2 size={16} stroke="#EF4444" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Dishes info</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <FormsField
              name="food_name"
              type="text"
              form={form}
              label="Dish name"
              placeholder="Type food name..."
            />
            <FormsField
              name="price"
              type="number"
              form={form}
              label="price"
              placeholder="Enter price..."
            />
            <FormsField
              name="category"
              form={form}
              categories={categories}
              label="Dish category"
            />
            <FormsField
              name="food_description"
              form={form}
              type="text"
              label="Ingredients"
              placeholder="List ingredients..."
            />
            <ImageInput
              defaultPreview={food.food_image}
              image={image}
              setImage={setImage}
            />
            <Button onClick={deleteFood}>
              <Trash />
            </Button>
            <Button type="submit">Save changes</Button>
          </form>
        </FormProvider>
        <DialogFooter className="flex justify-between"></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default EditFood;


