"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Plus } from "lucide-react";
import FormHook from "./FormHook";
const AddNewFood = ({ category }: {category : string}) => {
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
          <FormHook category={category}  />

          <DialogDescription></DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default AddNewFood;
