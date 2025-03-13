import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
    <DropdownMenu>
      <DropdownMenuTrigger>
        <ChevronDown size={16}/>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel></DropdownMenuLabel>
        <DropdownMenuSeparator />
        {item.map((item: item, index) => (
          <DropdownMenuItem key={index} className="flex w-[263px] justify-between">
            <div className="flex h-full gap-2">
                <div className="overflow-hidden w-[80px] h-[60px] rounded-md flex ">
                    <img alt="food" className="w-full object-cover" src={item.food.food_image}/>
                </div>
                <div>{item.food.food_name}</div>
            </div>
            <div>{item.quantity}</div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default OrderFoodDetai;
