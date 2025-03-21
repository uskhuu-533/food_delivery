"use client";

import { getOdrersReq } from "@/utils/orderRequest";
import { useQuery } from "@tanstack/react-query";
import { addDays } from "date-fns";
import { parseAsInteger, useQueryState } from "nuqs";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type Order = {
  _id: string;
  userData: {
    email: string;
    address: string;
  };
  orderItems: item[];
  createdAt: string;
  totalPrice: number;
  status: string;
};
type item = {
  food: { food_name: string; food_image: string };
  quantity: number;
};
type Data = {
  orders: Order[];
  totalPages: number;
  totalResults: number;
};
type DateType = {
  from: Date;
  to: Date;
};

type OrderProviderType = {
  data: Data;
  getOrders:() => void;
  date: DateType;
  setDate: (_date: DateType) => void;
};

const OrderContext = createContext<OrderProviderType | null>(null);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [page] = useQueryState("page", parseAsInteger.withDefault(1));
  const [date, setDate] = useState<DateType>({
    from: addDays(new Date(), -20),
    to: new Date(),
  });
  const {
    data = { orders: [], totalPages: 0, totalResults: 0 },
    refetch : getOrders,
  } = useQuery({
    queryKey: ["orders", page, date],
    queryFn: () => getOdrersReq(page, date),
  });

  return (
    <OrderContext.Provider value={{ data, date, getOrders, setDate }}>
      {children}
    </OrderContext.Provider>
  );
};
export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useCategory must be used within a CategoryProvider");
  }
  return context;
};
