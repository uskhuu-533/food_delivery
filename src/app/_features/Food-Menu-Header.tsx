"use client";

import AddCategory from "../_components/AddCategory";
import Avatar from "../../components/Avatar";
import { useCategory } from "@/provider/CategoryProvider";


const FoodMenuHeader = () => {
const { categories , foodLenght} = useCategory()
  return (
    <div className=" w-full h-fit top-6 flex flex-col gap-6">
      <Avatar />
      <div className="w-full h-fit rounded-md p-6 bg-white flex flex-col gap-3">
        <div className="text-xl font-bold text-black">Dishes category</div>
        <div className="flex flex-wrap gap-3">
          <button className="flex px-4 py-2 rounded-full text-black items-center border gap-2">
            <p>All dishes</p>
            <div className="py-[2px] text-white text-sm px-[10px] rounded-full bg-black">
              {foodLenght}
            </div>
          </button>
          {categories?.map((category, index) => (
            <button
              key={index}
              className="flex px-4 py-2 rounded-full text-black items-center border gap-2"
            >
              <p>{category.title}</p>
              <div className="py-[2px] text-white text-sm px-[10px] rounded-full bg-black">
                {category.food_count.length}
              </div>
            </button>
          ))}
          <AddCategory />
        </div>
      </div>
    </div>
  );
};
export default FoodMenuHeader;
