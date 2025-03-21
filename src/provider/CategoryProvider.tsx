"use client";

import { fetchCategories } from "@/utils/request";
import { useQuery } from "@tanstack/react-query";
import {
  createContext,
  ReactNode,
  useContext,
} from "react";

type Food = {
  food_name: string;
  price: string;
  food_description: string;
  food_image: string | null;
  category: string;
  _id: object;
};

type Response = {
  title: string;
  _id: string;
  food_count: Food[];
};

type CategoryContextType = {
  categories: Response[];
  refetchCategory: () => void;
};

const CategoryContext = createContext<CategoryContextType | null>(null);

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const { data: categories = [], refetch : refetchCategory } = useQuery({
    queryKey: ["foods"],
    queryFn: () => fetchCategories(),
    staleTime: 1000 * 60 * 5,
  });
  return (
    <CategoryContext.Provider value={{ categories, refetchCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};
export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategory must be used within a CategoryProvider");
  }
  return context;
};
