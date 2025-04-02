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
import { useCategory } from "@/provider/CategoryProvider";
import { useLoading } from "@/provider/LoaderProvider";
import { PostCategory } from "@/utils/request";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useMutation } from "@tanstack/react-query";
import { CircleCheck, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const AddCategory = () => {
  const { refetchCategory } = useCategory();
  const { setLoading } = useLoading();
  const [newCategory, setNewCategory] = useState({ title: "" });
  const mutation = useMutation({
    mutationFn: PostCategory,
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: async () => {
      await refetchCategory();
      toast(<div className="flex itmes-center gap-6">Category added successful <CircleCheck stroke="green"/></div>)
    },
    onError: (error) => {
      console.log(error);
    },
    onSettled: () => {
      setLoading(false);
    },
  });
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
          <DialogClose
            type="submit"
            className="bg-black text-white px-4 py-2 rounded-md"
            onClick={() => mutation.mutate(newCategory)}
          >
            add category
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default AddCategory;
