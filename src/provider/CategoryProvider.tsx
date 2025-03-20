"use client";

import { fetchCategories } from "@/utils/request";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
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
  fetchCategory: () => Promise<void>;
};

const CategoryContext = createContext<CategoryContextType | null>(null);

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [categories, setCategory] = useState<Response[]>([]);

  const fetchCategory = async () => {
    const data = await fetchCategories();
    setCategory(data);
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <CategoryContext.Provider value={{ categories, fetchCategory }}>
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
