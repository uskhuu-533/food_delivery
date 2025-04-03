/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
"use client";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Image, X } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  defaultPreview: string | null;
  image: File | undefined;
  setImage: (image: File | undefined) => void;
};
const ImageInput = ({ defaultPreview, image, setImage }: Props) => {
  const [preview, setPreview] = useState<string | null>(defaultPreview);

  const clearPreview = () => {
    setImage(undefined);
  };
  useEffect(() => {
    if (image instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  }, [image]);
  const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImage(e.target.files ? e.target.files[0] : undefined);
  };
  return (
    <FormItem className="relative">
      <FormLabel className="flex flex-col gap-2 cursor-pointer">
        <p>Food Image</p>
        <div>
          {preview ? (
            <div className="relative">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-[150px] object-cover rounded-lg"
              />
            </div>
          ) : (
            <div className="w-full h-[150px] flex border-dashed border items-center justify-center bg-[#2563EB0D] border-[#2563EB33]">
              <Image />
            </div>
          )}
        </div>
        <FormControl>
          <input
            className="hidden"
            type="file"
            accept="image/*"
            onChange={(e) => uploadImage(e)}
          />
        </FormControl>
      </FormLabel>
      {preview && (
        <Button
          onClick={clearPreview}
          className="absolute rounded-full top-5 right-2 z-10 w-1 h-auto"
        >
          <X size={4} />
        </Button>
      )}
      <FormMessage>{!preview ? "image required" : null}</FormMessage>
    </FormItem>
  );
};
export default ImageInput;
