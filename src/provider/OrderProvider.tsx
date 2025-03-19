"use client";

import { getOdrersReq } from "@/utils/orderRequest";
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
  getOrders: () => Promise<void>;
  loadingOrder: boolean;
  setLoadingOrder: (_loadingFood: boolean) => void;
  date : DateType
  setData : (_data : Data) => void
  setDate : (_date : DateType) => void
};

const OrderContext = createContext<OrderProviderType | null>(null);

export const OrderProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
    const [page] = useQueryState("page", parseAsInteger.withDefault(1))
  const [data, setData] = useState<Data>({
    orders: [],
    totalPages: 0,
    totalResults: 0,
  });
  const [date, setDate] = useState<DateType>({
    from: addDays(new Date(), -20),
    to: new Date(),
  });
  const [loadingOrder, setLoadingOrder] = useState(false);

  const getOrders = async () => {
    const data: Data | undefined = await getOdrersReq(page, date);
    if (data) {
      setData(data);
    }
    setLoadingOrder(false);
  };

  useEffect(() => {
    getOrders();
  }, [date, page]);

  return (
    <OrderContext.Provider
      value={{ data, date, getOrders, loadingOrder, setLoadingOrder, setData, setDate }}
    >
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
