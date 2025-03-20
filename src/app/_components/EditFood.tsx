"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { uploadImage } from "@/utils/image-upload";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit2, Trash, X } from "lucide-react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import FormsField from "./Form-Field";
import ImageInput from "./ImageInput";
import { deleteFood, putFood } from "@/utils/request";
import { useCategory } from "@/provider/CategoryProvider";
import { useFood } from "@/provider/FoodProvider";
import { useLoading } from "@/provider/LoaderProvider";
type Props = {
  food: Food;
};
type Food = {
  food_name: string;
  price: number;
  food_description: string;
  food_image: string | null;
  category: { _id: string; title: string };
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
const EditFood = ({ food }: Props) => {
  const { getFood } = useFood();
  const { setLoading } = useLoading();
  const [image, setImage] = useState<File | undefined>(undefined);
  const { categories } = useCategory();
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
      await putFood(foodData, foodData.categoty, food._id);
      await getFood();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteFood = async () => {
    setLoading(true);
    await deleteFood(food._id, setLoading);
    await getFood();
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
            <DialogClose
              className="bg-black text-white px-4 py-2 rounded-md w-full mt-5"
              type="submit"
            >
              Submit
            </DialogClose>
          </form>
        </FormProvider>
        <Button onClick={handleDeleteFood} className="w-[10%] bg-[#E11D481A] border border-[#EF4444]">
          <Trash stroke="#EF4444"/>
        </Button>
        <DialogFooter className="flex justify-between"></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default EditFood;
