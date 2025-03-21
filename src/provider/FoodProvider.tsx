"use client";

import { getFoods } from "@/utils/request";
import {
  createContext,
  ReactNode,
  useContext,
} from "react";
import { useQuery } from "@tanstack/react-query";

type Food = {
  category: string;
  food_name: string;
  price: number;
  food_description: string;
  food_image: string | null;
  _id: string;
};

type FoodProviderType = {
  foods: Food[];
  foodRefetch: () => void;
};

const FoodContext = createContext<FoodProviderType | null>(null);
export const FoodProvider = ({
  children,
  categoryId,
}: {
  children: ReactNode;
  categoryId: string;
}) => {
  const { data: foods = [], refetch : foodRefetch} = useQuery({
    queryKey: ["foods", categoryId],
    queryFn: () => getFoods(categoryId),
    enabled : !!categoryId
  });
  return (
    <FoodContext.Provider value={{ foods, foodRefetch }}>
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
