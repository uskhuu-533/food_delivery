import { Button } from "@/components/ui/button";
import DateFilter from "../_components/DateFilter";
import axios from "axios";
import ChangeStatus from "../_components/ChageStatus";

type Props = {
  orders: Order[];
  checkedBox: string[];
  getOrders() : Promise<void>
};
type Order = {
  id: string;
  index: number;
  customer: string;
  createdAt: string;
  totalPrice: string;
  address: string;
  status: string;
};
const OrderHeader = ({ orders, checkedBox , getOrders}: Props) => {
    
 
  return (
    <div className="w-full p-4 flex justify-between">
      <div className="flex flex-col">
        <div>Order</div>
        <div>{orders.length} items</div>
      </div>
      <div className="flex">
        <DateFilter />
       <ChangeStatus checkedOrders={checkedBox} getOrders={getOrders}/>
      </div>
    </div>
  );
};
export default OrderHeader;
