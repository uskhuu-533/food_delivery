"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Plus, X } from "lucide-react";
import { useState } from "react";
type Props = {
  fetchCategory: Function;
};
const AddCategory = ({ fetchCategory }: Props) => {
  const [newCategory, setNewCategory] = useState({ title: "" });
  const addNewCategory = async () => {
    if(newCategory.title.length === 0){
      return 
    }
    try {
      const response = await fetch("http://localhost:3000/category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCategory),
      });

      const text = await response.text();
      console.log("Response status:", response.status);
      console.log("Response text:", text);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      fetchCategory();
    } catch (err) {
      console.error("Error posting user:", err);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="px-3 py-3 bg-[#EF4444] rounded-full"
        >
          <Plus size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[460px] flex flex-col gap-8">
        <DialogHeader>
          <DialogTitle className="text-black text-xl">
            Add new category
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-2">
          <label>Category name</label>
          <input
            id="name"
            className="px-3 py-2 border rounded-md"
            placeholder="Type category name"
            onChange={(e) =>
              setNewCategory({ ...newCategory, title: e.target.value })
            }
          />
        </div>
        <DialogDescription></DialogDescription>

        <DialogFooter>
          <DialogClose type="submit" className="bg-black text-white px-4 py-2 rounded-md" onClick={addNewCategory}>
            add category
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default AddCategory;
