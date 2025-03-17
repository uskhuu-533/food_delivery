"use client";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Image, X } from "lucide-react";
import { useState } from "react";

type Props = {
  defaultPreview: string | null;
  image: File | undefined;
  setImage: (image: File | undefined) => void;
};
const ImageInput = ({ defaultPreview, image, setImage }: Props) => {
  const [preview, setPreview] = useState<string | null>(defaultPreview);
  if (image instanceof File) {
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(image);
  }
  return (
    <FormItem>
      <FormLabel className="flex flex-col gap-2">
        <p>Food Image</p>
        <div>
          {preview ? (
            <div className="relative">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-[150px] object-cover rounded-lg"
              />
              <Button
                onClick={() => setPreview(null)}
                className="absolute rounded-full top-2 right-2 w-1 h-auto"
              >
                <X size={4} />
              </Button>
            </div>
          ) : (
            <div className="w-full h-[150px] flex border-dashed border items-center justify-center bg-[#2563EB0D] border-[#2563EB33]">
              <Image />
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
            setImage(e.target.files ? e.target.files[0] : undefined)
          }
        />
      </FormControl>
      <FormMessage>{!preview ? "image required" : null}</FormMessage>
    </FormItem>
  );
};
export default ImageInput;
