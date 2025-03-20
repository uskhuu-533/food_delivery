"use client";

import { getFoods } from "@/utils/request";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type Food = {
  food_name: string;
  price: number;
  food_description: string;
  food_image: string | null;
  category: Response;
  _id: string;
};

type Response = {
  title: string;
  _id: string;
};

type FoodProviderType = {
  foods: Food[];
  getFood: () => Promise<void>;
};

const FoodContext = createContext<FoodProviderType | null>(null);

export const FoodProvider = ({
  children,
  categoryId,
}: {
  children: ReactNode;
  categoryId: string;
}) => {
  const [foods, setFoods] = useState<Food[]>([]);

  const getFood = async () => {
    const data = await getFoods(categoryId);
    setFoods(data);
  };

  useEffect(() => {
    getFood();
  }, []);

  return (
    <FoodContext.Provider value={{ foods, getFood }}>
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
