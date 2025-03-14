"use client";

import axios from "axios";
import { useEffect, useState } from "react";
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
import { useQueryState, parseAsInteger } from 'nuqs'
import { PaginationComponent } from "@/components/Pagination";
type Response = {
  _id: string;
  userData: UserData;
  orderItems: item[];
  createdAt: Date;
  totalPrice: number;
  status: string;
};
type UserData = {
  email: string;
  address: string;
};
type item = {
  food: { food_name: string; food_image: string };
  quantity: number;
};

type Order = {
  id: string;
  index: number;
  customer: string;
  item: item[];
  createdAt: string;
  totalPrice: string;
  address: string;
  status: string;
};

type Data = {
  orders : Order[]
  totalPages : number
  totalResults : number
}
const OrderCont = () => {
  const [data, setData] = useState<Data>({
    orders: [],
    totalPages : 1,
    totalResults : 0
  });
  const [checkedBox, setCheckedBox] = useState<string[]>([]);
  const [page] = useQueryState("page", parseAsInteger.withDefault(1))
  const transformOrders = (data: Response[]) => {
    return data.map((order, index) => ({
      id: order._id,
      index: index + 1,
      customer: order.userData.email,
      item: order.orderItems,
      createdAt: new Date(order.createdAt).toLocaleDateString(),
      totalPrice: `$${order.totalPrice.toFixed(2)}`,
      address: order.userData.address,
      status: order.status,
    }));
  };
  const getOrders = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/foodorder/admin/${page}`);
      console.log(response);
      const transformedOrders = transformOrders(response.data.data);
      console.log(transformedOrders);
      setData({orders : transformedOrders, totalPages: response.data.totalPage, totalResults : response.data.totalResults});
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getOrders();
  }, [page]);
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
      setCheckedBox(data.orders.map((item) => item.id));
    }
  };

  return (
    <div className="ml-[200px] px-8 w-full py-10">
      <Avatar />
      <OrderHeader checkedBox={checkedBox} totalResults={data.totalResults}  getOrders={getOrders}/>
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
            <TableHead>Date</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Delivery address</TableHead>
            <TableHead>Delivery status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>
                <input
                  onChange={() => handleCheckBox(order.id)}
                  type="checkbox"
                  checked={checkedBox.includes(order.id)}
              
                />
              </TableCell>
              <TableCell className="font-medium">{order.index}</TableCell>
              <TableCell>{order.customer}</TableCell>
              <TableCell className="flex justify-between">
                <div>{order.item.length}food</div>
                <OrderFoodDetai item={order.item} />
              </TableCell>
              <TableCell>{order.createdAt}</TableCell>
              <TableCell>{order.totalPrice}</TableCell>
              <TableCell>{order.address} </TableCell>
              <TableCell>{order.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow></TableRow>
        </TableFooter>
      </Table>
      <PaginationComponent totalPages={data.totalPages}/>
    </div>
  );
};
export default OrderCont;
