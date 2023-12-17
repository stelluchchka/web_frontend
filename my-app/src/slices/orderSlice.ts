import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

interface DishesData {
  id: number;
  title: string;
  price: number;
  tag: string;
  url: string;
}
interface OrderData {
  id: number;
  status: string;
  created_at: string;
  processed_at: string;
  completed_at: string;
}

interface DataState {
  currentOrderId: number | null;
  currentOrderDate: string;
  dishesFromOrder: DishesData[];
  orders: OrderData[];
}

const dataSlice = createSlice({
  name: "data",
  initialState: {
    currentOrderId: null,
    currentOrderDate: '',
    dishesFromOrder: [],
    orders: []
  } as DataState,
  reducers: {
    setCurrentOrderId(state, action: PayloadAction<number>) {
      state.currentOrderId = action.payload;
    },
    setCurrentOrderDate(state, action: PayloadAction<string>) {
      state.currentOrderDate = action.payload;
    },
    setDishesFromOrder(state, action: PayloadAction<DishesData[]>) {
      state.dishesFromOrder = action.payload;
    },
    setOrders(state, action: PayloadAction<OrderData[]>) {
      state.orders = action.payload;
      console.log('orders is', action.payload)
    }
  },
});


export const useCurrentOrderId = () =>
  useSelector((state: { ordersData: DataState }) => state.ordersData.currentOrderId);

export const useCurrentOrderDate = () =>
  useSelector((state: { ordersData: DataState }) => state.ordersData.currentOrderDate);

export const useDishesFromOrder = () =>
  useSelector((state: { ordersData: DataState }) => state.ordersData.dishesFromOrder);

export const useOrders = () =>
  useSelector((state: { ordersData: DataState }) => state.ordersData.orders);

export const {
    setCurrentOrderId: setCurrentOrderIdAction,
    setCurrentOrderDate: setCurrentOrderDateAction,
    setDishesFromOrder: setDishesFromOrderAction,
    setOrders: setOrdersAction

} = dataSlice.actions;

export default dataSlice.reducer;