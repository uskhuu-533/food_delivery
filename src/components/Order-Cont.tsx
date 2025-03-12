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
} from "@/components/ui/table"
type Response = {
  _id : string
  userData : UserData
  orderItems : item[]
  createdAt : Date
  totalPrice : number,
  status : string
}
type UserData= {
  email : string,
  address : string
}
type item = {
  food : food
  quantity : number
}
type food = {
  food_name : string
}
type Order = {
  id: string;
  index: number;
  customer: string;
  food: string;
  createdAt: string;
  totalPrice: string;
  address: string;
  status: string;
};
const OrderCont = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const transformOrders = (data: Response[]) => {
    return data.map((order, index) => ({
      id : order._id, 
      index: index + 1, 
      customer: order.userData.email, 
      food: order.orderItems
        .map((item) => `${item.food.food_name} x${item.quantity}`) 
        .join(", "), 
      createdAt: new Date(order.createdAt).toLocaleDateString(), 
      totalPrice: `$${order.totalPrice.toFixed(2)}`,
      address: order.userData.address, 
      status :order.status
    }));
  };
  const getOrders = async () => {
 
    try {
      const response = await axios.get(`http://localhost:3000/foodorder/admin`);
      console.log(response);
      const transformedOrders = transformOrders(response.data); 
      console.log(transformedOrders);
      
      setOrders(transformedOrders);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(()=>{
    getOrders()
  },[])




  return (
    <div className="ml-[200px] px-8 w-full py-10">
      <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell className="font-medium">{order.index}</TableCell>
            <TableCell>{order.customer}</TableCell>
            <TableCell>{order.food}</TableCell>
            <TableCell>{order.createdAt}</TableCell>
            <TableCell className="text-right">{order.totalPrice}</TableCell>
            <TableCell>{order.address} </TableCell>
            <TableCell>{order.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
        </TableRow>
      </TableFooter>
    </Table>
    </div>
  );
};
export default OrderCont;
