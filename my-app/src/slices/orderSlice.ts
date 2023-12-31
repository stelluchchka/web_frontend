import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

interface OrderData {
  id: number;
  status: string;
  created_at: string;
  processed_at: string;
  completed_at: string;
}
interface DishesFromOrderData {
  id: number;
  title: string;
  price: number;
  tag: string;
  url: string;  
  quantity: number;
}

interface DataState {
  order_date: string;
  currentOrderId: number;
  currentOrderDate: string;
  orders: OrderData[];
  order: OrderData;
  dishes_from_order_data: DishesFromOrderData[];
}

const dataSlice = createSlice({
  name: "data",
  initialState: {
    order_date: '',
    currentOrderId: -1,
    currentOrderDate: '',
    orders: [],
    order: {
      id: -1,
      status: '',
      created_at: '',
      processed_at: '',
      completed_at: '',
    },
    dishes_from_order_data: []
  } as DataState, 
  reducers: {
    setCurrentOrderId(state, action: PayloadAction<number>) {
      state.currentOrderId = action.payload;
      console.log('order id is', action.payload)
    },
    setOrders(state, action: PayloadAction<OrderData[]>) {            // orders
      state.orders = action.payload;
      console.log('orders is', action.payload)
    },
    setOrder(state, action: PayloadAction<OrderData>) {
      state.order = action.payload;
      console.log('order is', action.payload)
    },
    setDishesFromOrderData(state, action: PayloadAction<DishesFromOrderData[]>) {
      state.dishes_from_order_data = action.payload;
      console.log('dishes_from_order_data is', action.payload)
    },
    setOrderDate(state, action: PayloadAction<string>) {
      state.order_date = action.payload;
      console.log('dishes_date is', action.payload)
    },
  },
});

export const useCurrentOrderId = () =>
  useSelector((state: { ordersData: DataState }) => state.ordersData.currentOrderId);

export const useOrders = () =>
  useSelector((state: { ordersData: DataState }) => state.ordersData.orders);

export const useOrder = () =>
  useSelector((state: { orderData: DataState }) => state.orderData.orders);

export const useDishesFromOrderData = () =>
  useSelector((state: { ordersData: DataState }) => state.ordersData.dishes_from_order_data);

export const useOrderDate = () =>
  useSelector((state: { ordersData: DataState }) => state.ordersData.order_date);

export const {
    setCurrentOrderId: setCurrentOrderIdAction,
    setOrders: setOrdersAction,
    setOrder: setOrderAction,
    setDishesFromOrderData: setDishesFromOrderDataAction,
    setOrderDate: setOrderDateAction
} = dataSlice.actions;

export default dataSlice.reducer;