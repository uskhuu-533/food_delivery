'use client'

import { useOrder } from "@/provider/OrderProvider";
import ChangeStatus from "../_components/ChageStatus";
import { DatePicker } from "../_components/DatePicker";

type Props = {
  checkedBox: string[];
};

const OrderHeader = ({ checkedBox}: Props) => {
 const { data } = useOrder()
  return (
    <div className="w-full p-4 flex justify-between">
      <div className="flex flex-col">
        <div>Order</div>
        <div>{data?.totalResults} items</div>
      </div>
      <div className="flex gap-3">
        <DatePicker />
       <ChangeStatus checkedOrders={checkedBox}/>
      </div>
    </div>
  );
};
export default OrderHeader;
