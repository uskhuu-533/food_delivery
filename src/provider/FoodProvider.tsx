"use client";

import {  addFoodRequest, deleteFoodRequest, getFoods, putFood } from "@/utils/request";
import {
  createContext,
  ReactNode,
  useContext,
} from "react";
import { QueryObserverResult, useQuery } from "@tanstack/react-query";
import { useCategory } from "./CategoryProvider";
import { useLoading } from "./LoaderProvider";

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
  const { setLoading} = useLoading()
  const { data: foods = [], refetch : foodRefetch} = useQuery({
    queryKey: ["foods", categoryId],
    queryFn: () => getFoods(categoryId),
    enabled : !!categoryId
  });
  const deleteFood = async (foodId:string) => {
    setLoading(true)
    await deleteFoodRequest(foodId)
    await foodRefetch()
    refetchCategory()
    setLoading(false)
  }
  const editFood = async (foodData:food, category:string, id:string)=>{
    setLoading(true)
    await putFood(foodData, category, id)
    await foodRefetch()
    refetchCategory()
    setLoading(false)
  }
  const addFood = async (foodData : Food, category:string) => {
    setLoading(true)
    await addFoodRequest(foodData, category)
    await foodRefetch()
    refetchCategory()
    setLoading(false)
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
