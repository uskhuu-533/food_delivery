"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Avatar from "../../../components/Avatar";
import OrderFoodDetai from "../_components/OrderFoodDetail";
import OrderHeader from "./Order-Header";
import { PaginationComponent } from "@/components/Pagination";
import ChangeOneStatus from "../_components/ChangeOneStatus";
import { ChevronsUpDown } from "lucide-react";
import { useOrder } from "@/provider/OrderProvider";
type Order = {
  _id: string;
  userData: {
    email: string;
    address: string;
  };
  orderItems: item[];
  createdAt: string;
  totalPrice: number;
  status: string;
};
type item = {
  food: { food_name: string; food_image: string };
  quantity: number;
};
type Data = {
  orders: Order[];
  totalPages: number;
  totalResults: number;
};
type DateType = {
  from: Date;
  to: Date;
};
const OrderCont = () => {
  const { data, setData } = useOrder();
  const [checkedBox, setCheckedBox] = useState<string[]>([]);
  const handleCheckBox = (id: string) => {
    if (checkedBox.includes(id)) {
      setCheckedBox((prev) => prev.filter((item) => item !== id));
    } else {
      setCheckedBox([...checkedBox, id]);
    }
  };
  const handleChangeAllStatus = () => {
    if (checkedBox.length === data?.orders.length) {
      setCheckedBox([]);
    } else {
      setCheckedBox(data.orders.map((item) => item._id));
    }
  };
  const sortOrderByStatus = () => {
    const sortedOrder = data.orders.sort((a, b) =>
      b.status.localeCompare(a.status)
    );
    console.log(sortedOrder);
    setData({ ...data, orders: sortedOrder });
  };
  return (
    <div className="px-8 w-full py-10">
  
      <Avatar />
      <OrderHeader checkedBox={checkedBox} />
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>
              <input
                type="checkbox"
                onChange={handleChangeAllStatus}
                checked={checkedBox.length === data.orders.length}
              />
            </TableHead>
            <TableHead className="w-[100px]">№</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Food</TableHead>
            <TableHead className="justify-between flex items-center">
              <p>Date</p>
              <ChevronsUpDown size={16} />
            </TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Delivery address</TableHead>
            <TableHead className="justify-between flex items-center">
              Delivery status
              <ChevronsUpDown onClick={sortOrderByStatus} size={16} />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.orders.map((order, index) => (
            <TableRow key={order._id}>
              <TableCell>
                <input
                  onChange={() => handleCheckBox(order._id)}
                  type="checkbox"
                  checked={checkedBox.includes(order._id)}
                />
              </TableCell>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{order.userData.email}</TableCell>
              <TableCell className="flex justify-between">
                <div>{order.orderItems.length}food</div>
                <OrderFoodDetai item={order.orderItems} />
              </TableCell>
              <TableCell>{order.createdAt}</TableCell>
              <TableCell>{order.totalPrice}</TableCell>
              <TableCell>{order.userData.address} </TableCell>
              <TableCell>
                <ChangeOneStatus
                  orderId={order._id}
                  defaultStatus={order.status}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow></TableRow>
        </TableFooter>
      </Table>
      <PaginationComponent totalPages={data.totalPages} />
    </div>
  );
};
export default OrderCont;
