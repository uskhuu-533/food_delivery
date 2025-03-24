/* eslint-disable @next/next/no-img-element */
"use client";


import AddNewFood from "../_components/AddFood";
import EditFood from "../_components/EditFood";
import { useFood } from "@/provider/FoodProvider";
type Props = {
  category: Response;

};
type Response = {
  title: string;
  _id: string;
};
type Food = {
  category: string;
  food_name: string;
  price: number;
  food_description: string;
  food_image: string | null;
  _id: string;
};
const CategoryFoods = ({ category }:Props) => {
  const {foods} = useFood()

  return (
    <div className="w-full h-fit rounded-md p-6 bg-white flex flex-col gap-3">
      <p>{category.title}</p>
      <div className="flex flex-wrap gap-6">
        <AddNewFood category={category._id} />
        {foods.map((food:Food , index:number) => (
          <div
            key={index}
            className="w-[271px] h-[257px] rounded-md border-[#EF4444] border flex flex-col p-4"
          >
            <div className="w-full h-[70%] relative overflow-hidden rounded-md flex items-center justify-end">
              <img
                src={`${food.food_image}`}
                alt="food"
                className="w-full scale-100"
              />
              <EditFood  food={food}/>
            </div>
            <div className="w-full flex justify-between">
              <p>{food.food_name}</p>
              <p>{food.price}</p>
            </div>
            <div className="text-[12px]">{food.food_description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default CategoryFoods;
