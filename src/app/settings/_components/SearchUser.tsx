'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SearchIcon } from "lucide-react";
import { useState } from "react";

const SearchUser = () => {
    const [find, setFind] = useState('email')
  return (
    <div className="flex pt-4 w-full gap-4">
      <Label className="flex items-center w-[500px]">
        <SearchIcon className="z-10 absolute left-2" />
        <Input className="rounded-full pl-10" placeholder="Search user" />
      </Label>
      <DropdownMenu>
        <DropdownMenuTrigger className="bg-white px-3 rounded-full ">find by {find} </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>find by...</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={()=>setFind('email')}>Find by email</DropdownMenuItem>
          <DropdownMenuItem onClick={()=>setFind('phone number')}>Find by phone number</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
export default SearchUser;
