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
import { CircleCheck, Edit2 } from "lucide-react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import FormsField from "./Form-Field";
import ImageInput from "./ImageInput";
import { useCategory } from "@/provider/CategoryProvider";
import { Food, useFood } from "@/provider/FoodProvider";
import { useLoading } from "@/provider/LoaderProvider";
import { toast } from "sonner";
import DeleteFood from "./DeleteFood";
type Props = {
  food: Food;
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
  const {editFood } = useFood();
  const { setLoading } = useLoading();
  const [image, setImage] = useState<File | undefined>(undefined);
  const { categories} = useCategory();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      food_name: food.food_name,
      price: food.price,
      food_description: food.food_description,
      category: food.category,
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
      await editFood(foodData, foodData.categoty, food._id);
      toast(
        <div className="flex itmes-center gap-6">
          Food edit successful <CircleCheck stroke="green" />
        </div>
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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
            <DialogClose
              className="bg-black text-white px-4 py-2 rounded-md w-full mt-5"
              type="submit"
            >
              Submit
            </DialogClose>
          </form>
        </FormProvider>
        <DeleteFood foodId={food._id} />
        <DialogFooter className="flex justify-between"></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default EditFood;
