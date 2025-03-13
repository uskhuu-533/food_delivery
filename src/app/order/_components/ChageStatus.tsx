

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import axios from "axios";
import { useState } from "react";
type Props ={
    checkedOrders : string[]
    getOrders() : Promise<void>
}


const ChangeStatus =({checkedOrders, getOrders}:Props) => {
    const [status, setStatus] = useState('')
    const handleChangeStatus = async () => {
        try {
            const res = await axios.put(`http://localhost:3000/foodorder`, {ids : checkedOrders, status : status})
            console.log(res);
            getOrders()
        } catch (error) {
            console.log(error);
            
        }
      };
    return(
        <Dialog>
      <DialogTrigger asChild>
      <Button
          className={`${
            checkedOrders.length === 0 ? "bg-gray-400 hover:bg-gray-400" : "bg-black"
          } border py-2 px-4 rounded-full`}
        >
          Change delivery state
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change delivery state</DialogTitle>
          <DialogDescription>
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-4">
          <Button className="bg-[#F4F4F5] text-black rounded-full px-4 py-2" onClick={()=>setStatus("PENDING")}>Pending</Button>
          <Button className="bg-[#F4F4F5] text-black rounded-full px-4 py-2" onClick={()=>setStatus("DELIVERD")}>Deliverd</Button>
          <Button className="bg-[#F4F4F5] text-black rounded-full px-4 py-2" onClick={()=>setStatus("CANCELlED")}>Cancelled</Button>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleChangeStatus}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    )
}
export default ChangeStatus