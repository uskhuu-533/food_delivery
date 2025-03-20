"use client";

import CategoryFoods from "./Category-Foods";
import FoodMenuHeader from "@/app/_features/Food-Menu-Header";
import ScreenLoader from "@/components/ScreenLoader";
import { useCategory } from "@/provider/CategoryProvider";
import { FoodProvider, useFood } from "@/provider/FoodProvider";

type Response = {
  title: string;
  _id: string;
  food_count: Array<foods>;
};
type foods = {
  food_name: string;
  price: string;
  food_description: string;
  food_image: string | null;
  category: string;
  _id: object;
};

const AdminCont = () => {
  const { categories } = useCategory();

  return (
    <>
      <div className="flex w-full flex-col gap-6 items-center mt-8 relative px-8">
        <FoodMenuHeader />
        <div className="flex flex-col w-full gap-6 pb-10">
          {categories.map((category: Response, index) => (
            <FoodProvider key={index} categoryId={category._id}>
              <CategoryFoods category={category} />
            </FoodProvider>
          ))}
        </div>
          <ScreenLoader/>
      </div>
    </>
  );
};
export default AdminCont;
