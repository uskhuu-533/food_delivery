'use client'

import ChangeStatus from "../_components/ChageStatus";
import { DatePicker } from "../_components/DatePicker";

type Props = {
  totalResults : number
  checkedBox: string[];
  getOrders() : Promise<void>
  setDate : (date:DateType)=> void
  date : DateType
};
type DateType = {
  to : Date
  from : Date
}

const OrderHeader = ({ totalResults, checkedBox , getOrders, setDate, date}: Props) => {
    
 
  return (
    <div className="w-full p-4 flex justify-between">
      <div className="flex flex-col">
        <div>Order</div>
        <div>{totalResults} items</div>
      </div>
      <div className="flex gap-3">
        <DatePicker setDate={setDate} date={date} getOrders={getOrders}/>
       <ChangeStatus checkedOrders={checkedBox} getOrders={getOrders}/>
      </div>
    </div>
  );
};
export default OrderHeader;
