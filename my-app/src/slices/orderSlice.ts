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
interface DishesFromOrderData {
  id: number;
  dish: DishesData
  quantity: number;
}
interface DishOrder {
  id: number;
  dish: DishesData;
  order: OrderData;
  quantity: number;
}
interface DishesFromOrder {
  id: number;
  status: string;
  created_at: string;
  processed_at: string;
  completed_at: string;
  dish: DishesFromOrderData[];
}

interface DataState {
  currentOrderId: number | null;
  currentOrderDate: string;
  dishesFromOrder: DishesData[];
  orders: OrderData[];
  dishes_orders: DishOrder[];
  dishes_from_order: DishesFromOrder[];
  dishes_from_order_data: DishesFromOrderData[];
}

const dataSlice = createSlice({
  name: "data",
  initialState: {
    currentOrderId: null,
    currentOrderDate: '',
    dishesFromOrder: [],
    orders: [],
    dishes_orders: [],
    dishes_from_order: [],
    dishes_from_order_data: []
  } as DataState, 
  reducers: {
    setCurrentOrderId(state, action: PayloadAction<number>) {
      state.currentOrderId = action.payload;
    },
    setCurrentOrderDate(state, action: PayloadAction<string>) {
      state.currentOrderDate = action.payload;
    },
    setDishFromOrder(state, action: PayloadAction<DishesData[]>) {
      state.dishesFromOrder = action.payload;
    },
    setOrders(state, action: PayloadAction<OrderData[]>) {
      state.orders = action.payload;
      console.log('orders is', action.payload)
    },
    setDishOrder(state, action: PayloadAction<DishOrder[]>) {
      state.dishes_orders = action.payload;
      console.log('dish_orders is', action.payload)
    },
    setDishesFromOrder(state, action: PayloadAction<DishesFromOrder[]>) {
      state.dishes_from_order = action.payload;
      console.log('dishes_from_orders is', action.payload)
    },
    setDishesFromOrderData(state, action: PayloadAction<DishesFromOrderData[]>) {
      state.dishes_from_order_data = action.payload;
      console.log('dishes_from_order_data is', action.payload)
    }
  },
});


export const useCurrentOrderId = () =>
  useSelector((state: { ordersData: DataState }) => state.ordersData.currentOrderId);

export const useCurrentOrderDate = () =>
  useSelector((state: { ordersData: DataState }) => state.ordersData.currentOrderDate);

export const useDishFromOrder = () =>
  useSelector((state: { ordersData: DataState }) => state.ordersData.dishesFromOrder);

export const useOrders = () =>
  useSelector((state: { ordersData: DataState }) => state.ordersData.orders);

export const useDishOrder = () =>
  useSelector((state: { ordersData: DataState }) => state.ordersData.dishes_orders);

export const useDishesFromOrder = () =>
  useSelector((state: { ordersData: DataState }) => state.ordersData.dishes_from_order);

export const useDishesFromOrderData = () =>
  useSelector((state: { ordersData: DataState }) => state.ordersData.dishes_from_order_data);

export const {
    setCurrentOrderId: setCurrentOrderIdAction,
    setCurrentOrderDate: setCurrentOrderDateAction,
    setDishFromOrder: setDishFromOrderAction,
    setOrders: setOrdersAction,
    setDishOrder: setDishOrderAction,
    setDishesFromOrder: setDishesFromOrderAction,
    setDishesFromOrderData: setDishesFromOrderDataAction,
} = dataSlice.actions;

export default dataSlice.reducer;