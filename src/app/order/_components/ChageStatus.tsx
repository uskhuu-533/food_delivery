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
import { useLoading } from "@/provider/LoaderProvider";
import { useOrder } from "@/provider/OrderProvider";
import { chaneManyStatus } from "@/utils/orderRequest";
import { useState } from "react";
type Props = {
  checkedOrders: string[];
};
const ChangeStatus = ({ checkedOrders }: Props) => {
  const { getOrders } = useOrder();
  const {setLoading } = useLoading()
  const [status, setStatus] = useState("");
  const handleChangeStatus = async () => {
    try{
      setLoading(true)
      await chaneManyStatus(checkedOrders, status);
      await getOrders();
    }catch(error){
      console.log(error);
    }finally{
      setLoading(false)
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={`${
            checkedOrders.length === 0
              ? "bg-gray-400 hover:bg-gray-400"
              : "bg-black"
          } border py-2 px-4 rounded-full`}
        >
          Change delivery state
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change delivery state</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="flex gap-4">
          <Button
            className={`bg-[#F4F4F5] text-black w-full rounded-full px-4 py-2 ${
              status === "PENDING" && "bg-[#E11D481A] text-[#EF4444]"
            }`}
            onClick={() => setStatus("PENDING")}
          >
            Pending
          </Button>
          <Button
            className={`bg-[#F4F4F5] text-black w-full rounded-full px-4 py-2 ${
              status === "DELIVERED" && "bg-[#E11D481A] text-[#EF4444]"
            }`}
            onClick={() => setStatus("DELIVERED")}
          >
            Deliverd
          </Button>
          <Button
            className={`bg-[#F4F4F5] text-black w-full rounded-full px-4 py-2 ${
              status === "CANCELlED" && "bg-[#E11D481A] text-[#EF4444]"
            }`}
            onClick={() => setStatus("CANCELlED")}
          >
            Cancelled
          </Button>
        </div>
        <div>{checkedOrders.length} selected</div>
        <DialogFooter>
          <DialogClose
            type="submit"
            className="bg-black text-white px-4 py-2 rounded-md"
            onClick={handleChangeStatus}
          >
            Save changes
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default ChangeStatus;
