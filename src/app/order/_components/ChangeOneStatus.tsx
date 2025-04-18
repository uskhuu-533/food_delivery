"use client";

import StatusLoader from "@/components/StautusLoader";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useOrder } from "@/provider/OrderProvider";
import { changeStatus } from "@/utils/orderRequest";
import { PopoverClose } from "@radix-ui/react-popover";
import { ChevronsUpDown } from "lucide-react";
import { useState } from "react";

type Props = {
  defaultStatus: string;
  orderId: string;
};
const ChangeOneStatus = ({ defaultStatus, orderId }: Props) => {
  const { getOrders } = useOrder()
  const [loading, setLoading]= useState(false)
  const handleChangeStatus = async (status: string) => {
    setLoading(true);
    try {
      await changeStatus(orderId, status);
      await getOrders();
    } catch (error) {
      console.error("Failed to change status:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className={`rounded-full bg-inherit text-black border ${
            defaultStatus === "PENDING" &&
            "border-[#EF4444] hover:bg-[#E11D481A] "
          }${
            defaultStatus === "DELIVERED" &&
            " border-green-300 hover:bg-green-300/30 "
          }`}
        >
          <div>{loading ? <StatusLoader/>:defaultStatus}</div>
          <ChevronsUpDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-2">
        <PopoverClose
          onClick={() => handleChangeStatus("PENDING")}
          className={`py-1 text-sm rounded-full bg-inherit text-black border border-[#EF4444] hover:bg-[#E11D481A]`}
        >
          <p>PENDING</p>
        </PopoverClose>
        <PopoverClose
          onClick={() => handleChangeStatus("DELIVERED")}
          className={`py-1 text-sm rounded-full bg-inherit text-black border border-green-300 hover:bg-green-300/30 "
      `}
        >
          <p>DELIVERED</p>
        </PopoverClose>
        <PopoverClose
          onClick={() => handleChangeStatus("CANCELED")}
          className={`py-1 text-sm rounded-full bg-inherit text-black border `}
        >
          <p>CANCELED</p>
        </PopoverClose>
      </PopoverContent>
    </Popover>
  );
};
export default ChangeOneStatus;
