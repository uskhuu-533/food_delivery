"use client";

import { Button } from "@/components/ui/button";
import { uploadImage } from "@/utils/image-upload";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import FormsField from "./Form-Field";
import ImageInput from "./ImageInput";

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
  getFood(): Promise<void>;
};
const FormHook = ({ category, getFood }: Props) => {
  const [image, setImage] = useState<File | undefined>(undefined);
  const [loading, setLoading] = useState(false);
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
        setLoading(true);
        const imageUploadRes = await uploadImage(image);
        const foodData = {
          food_name: values.food_name,
          price: values.price,
          food_description: values.food_description,
          food_image: imageUploadRes,
        };
        const response = await axios.post(
          `http://localhost:3000/food/${category}`,
          foodData
        );
        console.log(response);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
        getFood();
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
        <Button type="submit">Submit</Button>
      </form>
    </FormProvider>
  );
};

export default FormHook;
