"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { changeStatus } from "@/utils/orderRequest";
import { PopoverClose } from "@radix-ui/react-popover";
import { ChevronsUpDown } from "lucide-react";
import { useState } from "react";

type Props = {
  defaultStatus: string;
  orderId: string;
};
const ChangeOneStatus = ({ defaultStatus, orderId }: Props) => {
  const [statusLocal, setStatus] = useState(defaultStatus)
  const handleChangeStatus = async (status: string) => {
    setStatus(status)    
    const response = await changeStatus(orderId, status);
    if (response?.status !== 200) {
      setStatus(defaultStatus)
    }
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className={`rounded-full bg-inherit text-black border ${
            statusLocal === "PENDING" &&
            "border-[#EF4444] hover:bg-[#E11D481A] "
          }${
            statusLocal === "DELIVERED" &&
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
