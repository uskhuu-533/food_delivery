"use client";

import { uploadImage } from "@/utils/image-upload";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import FormsField from "./Form-Field";
import ImageInput from "./ImageInput";
import { addFood } from "@/utils/request";
import { DialogClose } from "@/components/ui/dialog";
import { useFood } from "@/provider/FoodProvider";

const formSchema = z.object({
  food_name: z.string().min(1, { message: "Field food name is required." }),
  price: z
    .string()
    .min(1, { message: "Field price is required." })
    .transform((value) => parseInt(value)),
  food_description: z
    .string()
    .min(1, { message: "Field ingredients are required." }),
  category: z.string(),
});
type Props = {
  category: string;

};
const FormHook = ({ category}: Props) => {
  const {getFood , setLoadingFood} = useFood()
  const [image, setImage] = useState<File | undefined>(undefined);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      food_name: "",
      price: 0,
      food_description: "",
      category: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (image) {
      try {
        setLoadingFood(true);
        const imageUploadRes:string = await uploadImage(image);
        const foodData = {
          food_name: values.food_name,
          price: values.price,
          food_description: values.food_description,
          food_image: imageUploadRes,
        };
        await addFood(foodData, category)
        getFood()
      } catch (error) {
        console.log(error);
      } 
    }
  };
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormsField
          type="text"
          form={form}
          name="food_name"
          placeholder="Type food name..."
          label="Food name"
        />
        <FormsField
          type="number"
          form={form}
          name="price"
          placeholder="Enter price..."
          label="Food price"
        />
        <FormsField
          type="text"
          form={form}
          name="food_description"
          placeholder="List ingredients..."
          label="Ingredients"
        />
        <ImageInput setImage={setImage} image={image} defaultPreview={null} />
        <DialogClose  className="bg-black text-white px-4 py-2 rounded-md"  type="submit">Submit</DialogClose>
      </form>
    </FormProvider>
  );
};

export default FormHook;
