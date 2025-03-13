"use client";

import axios from "axios";
import { useEffect, useState } from "react";
type Props = {
  category: Response;
};
type Response = {
  title: string;
  _id: string;
};
const FoodCount = ({ category }: Props) => {
  const [foods, setFoods] = useState([]);
  const getFood = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/food/${category._id}`
      );

      setFoods(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getFood();
  }, []);

  return (
    <div className="py-[2px] text-white text-sm px-[10px] rounded-full bg-black">
      {foods.length}
    </div>
  );
};
export default FoodCount;
