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
import { DialogClose, DialogDescription } from "@radix-ui/react-dialog";
import axios from "axios";
import { Plus, X } from "lucide-react";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import FormHook from "./FormHook";

type Props = {
  category: Response;
  getFood(): Promise<void>;
};
type Response = {
  title: string;
  _id: string;
};
type newfood = {
  food_name: string;
  price: string;
  food_description: string;
  food_image: string;
  category: string;
};

const AddNewFood = ({ category, getFood }: Props) => {
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
          <FormHook category={category._id} getFood={getFood} />

          <DialogDescription></DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default AddNewFood;
