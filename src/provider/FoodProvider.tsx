"use client";

import {  addFoodRequest, deleteFoodRequest, getFoods, putFood } from "@/utils/request";
import {
  createContext,
  ReactNode,
  useContext,
} from "react";
import { QueryObserverResult, useQuery } from "@tanstack/react-query";
import { useCategory } from "./CategoryProvider";

export type Food = {
  category: string;
  food_name: string;
  price: number;
  food_description: string;
  food_image: string | null;
  _id: string;
};
type food = {
  categoty: string;
  food_name: string;
  price: number;
  food_description: string;
  food_image: string | null;
};
type FoodProviderType = {
  foods: Food[];
  foodRefetch: ()=> Promise<QueryObserverResult<Food[], Error>>
  deleteFood : (foodId: string) => Promise<void>
  editFood : (foodData: food, category: string, id:string) => Promise<void>
  addFood :(foodData: Food, category: string) => Promise<void>
};

const FoodContext = createContext<FoodProviderType | null>(null);
export const FoodProvider = ({
  children,
  categoryId,
}: {
  children: ReactNode;
  categoryId: string;
}) => {
  const {refetchCategory} = useCategory()
  const { data: foods = [], refetch : foodRefetch} = useQuery({
    queryKey: ["foods", categoryId],
    queryFn: () => getFoods(categoryId),
    enabled : !!categoryId
  });
  const deleteFood = async (foodId:string) => {
    await deleteFoodRequest(foodId)
    await foodRefetch()
  }
  const editFood = async (foodData:food, category:string, id:string)=>{
    await putFood(foodData, category, id)
    await foodRefetch()
    await refetchCategory()
  }
  const addFood = async (foodData : Food, category:string) => {
    await addFoodRequest(foodData, category)
    await foodRefetch()
    await refetchCategory()
  }
  return (
    <FoodContext.Provider value={{ foods, foodRefetch, deleteFood, editFood, addFood}}>
      {children}
    </FoodContext.Provider>
  );
};
export const useFood = () => {
  const context = useContext(FoodContext);
  if (!context) {
    throw new Error("useCategory must be used within a CategoryProvider");
  }
  return context;
};
