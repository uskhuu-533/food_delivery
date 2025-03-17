"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";
import axios from "axios";
import { ChevronsUpDown } from "lucide-react";

type Props = {
  defaultStatus: string;
  orderId: string;
  getOrders() : Promise<void>
};
const ChangeOneStatus = ({ defaultStatus, orderId, getOrders }: Props) => {
  const handleChangeStatus = async (status: string) => {
    try {
      const res = await axios.put(
        `http://localhost:3000/foodorder/${orderId}`,
        { status: status }
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }finally{
        getOrders()
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
          <p>{defaultStatus}</p>
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
