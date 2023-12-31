import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";


interface DishesData {
  id: number;
  title: string;
  price: number;
  tags: string;
  url: string;
}

interface DataState {
  titleValue: string;
  tagValue: string;
  minPriceValue: number;
  maxPriceValue: number;
  dishes: DishesData[]
}

const dataSlice = createSlice({
  name: "data",
  initialState: {
    titleValue: '',
    tagValue: 'тег',
    minPriceValue: 0, 
    maxPriceValue: 10000000,
    dishes: []
  } as DataState,
  reducers: {
    setTitleValue(state, action: PayloadAction<string>) {
      state.titleValue = action.payload
    },
    setTagValue(state, action: PayloadAction<string>) {
      state.tagValue = action.payload
    },
    setMinPriceValue(state, action: PayloadAction<number>) {
      state.minPriceValue = action.payload
    },
    setMaxPriceValue(state, action: PayloadAction<number>) {
      state.maxPriceValue = action.payload
    },
    setDishes(state, action: PayloadAction<DishesData[]>) {
      console.log('pay is', action.payload)
      state.dishes = action.payload
    },
  },
});

// Состояние, которое будем отображать в компонентах
export const useTitleValue = () =>
  useSelector((state: { mainData: DataState }) => state.mainData.titleValue);

export const useTagValue = () =>
  useSelector((state: { mainData: DataState }) => state.mainData.tagValue);

export const useMinPriceValue = () =>
  useSelector((state: { mainData: DataState }) => state.mainData.minPriceValue);

export const useMaxPriceValue = () =>
  useSelector((state: { mainData: DataState }) => state.mainData.maxPriceValue);

export const useDishes = () =>
  useSelector((state: { mainData: DataState }) => state.mainData.dishes);
// Action, который будем применять в различных обработках
export const {
    setTitleValue: setTitleValueAction,
    setTagValue: setTagValueAction,
    setMinPriceValue: setMinPriceValueAction,
    setMaxPriceValue: setMaxPriceValueAction,
    setDishes: setDishesAction
  } = dataSlice.actions;

export default dataSlice.reducer;