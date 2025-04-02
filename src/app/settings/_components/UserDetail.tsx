import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

import { User } from "@/provider/UsersProvider";
import { PopoverContent } from "@radix-ui/react-popover";
import { format } from "date-fns";
import { ChevronsUpDownIcon } from "lucide-react";

export function UserDetail({ user }: { user: User }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-full bg-inherit border text-black">
          see details
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[905px] ">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="flex p-5">
          <div className="w-1/2 h-full">
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Email:</TableCell>
                  <TableCell className="font-medium">{user.email}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Phone number:</TableCell>
                  <TableCell className="font-medium">
                    {user.phoneNumber ? user.phoneNumber : ""}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Joined at:</TableCell>
                  <TableCell className="font-medium">
                    {user.createdAt ? format(user.createdAt, "yyyy-MM-dd") : ""}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Role:</TableCell>
                  <TableCell className="font-medium">
                    <Popover>
                      <PopoverTrigger className="rounded-full border px-3 py-1 flex gap-2 items-center">
                        {user.role} <ChevronsUpDownIcon size={16} />
                      </PopoverTrigger>
                      <PopoverContent className="flex flex-col gap-2 p-2 ">
                        <Button className="rounded-full">ADMIN</Button>
                        <Button className="rounded-full">USER</Button>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <div className="w-1/2 h-full px-4 flex flex-col items-center border rounded-md overflow-hidden">
          <div className="py-3">Order history</div>
          {user.orderedFood.map((order)=>(
            <div className="w-full flex justify-between" key={order._id}>
                <div> date: {format(order.createdAt, "yyyy-LLL-dd --- hh-mm")}</div>
                <div> price: {order.totalPrice}</div>
            </div>
          ))}
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
