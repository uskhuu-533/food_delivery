import { Button } from "@/components/ui/button";
import DateFilter from "../_components/DateFilter";
import axios from "axios";
import ChangeStatus from "../_components/ChageStatus";

type Props = {
  totalResults : number
  checkedBox: string[];
  getOrders() : Promise<void>
};

const OrderHeader = ({ totalResults, checkedBox , getOrders}: Props) => {
    
 
  return (
    <div className="w-full p-4 flex justify-between">
      <div className="flex flex-col">
        <div>Order</div>
        <div>{totalResults} items</div>
      </div>
      <div className="flex">
        <DateFilter />
       <ChangeStatus checkedOrders={checkedBox} getOrders={getOrders}/>
      </div>
    </div>
  );
};
export default OrderHeader;
