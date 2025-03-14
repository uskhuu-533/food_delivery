"use client";
import { useEffect, useState } from "react";

import axios from "axios";
import AddCategory from "../_components/AddCategory";
import Avatar from "../../components/Avatar";
type Response = {
  title: string;
  food_count: Array<foods>;
  _id: string;
};
type foods = {
  food_name: string;
  price: string;
  food_description: string;
  food_image: string | null;
  category: string;
  _id: object;
};
type Props = {
  fetchCategory: Function;
  categories: Response[];
};

const FoodMenuHeader = ({ fetchCategory, categories }: Props) => {
  const [foods, setFoods] = useState([]);

  const getAllFoods = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/food`);
      console.log(response);
      setFoods(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllFoods();
  }, []);

  return (
    <div className=" w-full h-fit top-6 flex flex-col gap-6">
      <Avatar />
      <div className="w-full h-fit rounded-md p-6 bg-white flex flex-col gap-3">
        <div className="text-xl font-bold text-black">Dishes category</div>
        <div className="flex flex-wrap gap-3">
          <button className="flex px-4 py-2 rounded-full text-black items-center border gap-2">
            <p>All dishes</p>
            <div className="py-[2px] text-white text-sm px-[10px] rounded-full bg-black">
              {foods.length}
            </div>
          </button>
          {categories?.map((category: Response, index) => (
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
          <AddCategory fetchCategory={fetchCategory} />
        </div>
      </div>
    </div>
  );
};
export default FoodMenuHeader;
