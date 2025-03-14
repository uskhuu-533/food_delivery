"use client";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { uploadImage } from "@/utils/image-upload";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Image } from "lucide-react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  food_name: z.string().min(1, { message: "Field food name is required." }),
  price: z.number().min(1, { message: "Field price is required." }),
  food_description: z
    .string()
    .min(1, { message: "Field ingredients are required." }),
  food_image: z
    .instanceof(File)
    .optional()
    .refine((file) => file && file.size > 0, {
      message: "Field image is required and must not be empty.",
    }),
});
type Props = {
  category: string;
  getFood(): Promise<void>;
};
const FormHook = ({ category, getFood }: Props) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      food_name: "",
      price: 0,
      food_description: "",
      food_image: undefined,
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = form;
  const selectedFile = watch("food_image");
  if (selectedFile instanceof File) {
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(selectedFile);
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (values.food_image) {
      try {
        setLoading(true);
        const imageUploadRes = await uploadImage(values.food_image);

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
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="food_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Food Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter food name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter price"
                  {...field}
                  type="number"
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="food_description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Enter description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem>
          <FormLabel>
            <p>Food Image</p>
            <div>
              {preview ? (
                <div>
                  <p>Image Preview:</p>
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-[150px] object-cover rounded-lg"
                  />
                </div>
              ) : (
                <div className="w-full h-[150px] flex border-dashed border items-center justify-center bg-[#2563EB0D] border-[#2563EB33]">
                  <Image />
                  <p></p>
                </div>
              )}
            </div>
          </FormLabel>
          <FormControl>
            <input
              className="hidden"
              type="file"
              accept="image/*"
              onChange={(e) =>
                setValue("food_image", e.target.files?.[0] || undefined)
              }
            />
          </FormControl>
          <FormMessage>{errors.food_image?.message}</FormMessage>
        </FormItem>

        <Button type="submit">Submit</Button>
      </form>
    </FormProvider>
  );
};

export default FormHook;
