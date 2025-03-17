import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";
type Props = {
  item: item[];
};
type item = {
  food: { food_name: string; food_image: string };
  quantity: number;
};

const OrderFoodDetai = ({ item }: Props) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <ChevronDown size={16} />
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-2">
        {item.map((item: item, index) => (
          <div
            key={index}
            className="flex w-[263px] justify-between items-center"
          >
            <div className="flex h-full gap-2">
              <div className="overflow-hidden w-[80px] h-[60px] rounded-md flex ">
                <img
                  alt="food"
                  className="w-full object-cover"
                  src={item.food?.food_image ? item.food.food_image : "" }
                />
              </div>
              <div className="h-[60px] flex items-center">
                <p>{item.food?.food_name}</p>
              </div>
            </div>
            <div>x{item.quantity}</div>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
};
export default OrderFoodDetai;

//
