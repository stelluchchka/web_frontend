import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";


interface DishesData {
  id: number;
  title: string;
  price: number;
  tags: string;
  url: string;
  chef_post: string
}

interface DataState {
  titleValue: string;
  tagValue: string;
  minPriceValue: number;
  maxPriceValue: number;
  dishes: DishesData[]

  emailValue: string;
  statusValue: string;
  start_dateValue: string;
  finish_dateValue: string;
}

const dataSlice = createSlice({
  name: "data",
  initialState: {
    titleValue: '',
    tagValue: '',
    minPriceValue: 0, 
    maxPriceValue: 10000,
    dishes: [],
    emailValue: '',
    statusValue: '',
    start_dateValue: '',
    finish_dateValue: ''
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
    setEmailValue(state, action: PayloadAction<string>) {
      state.emailValue = action.payload
    },
    setStatusValue(state, action: PayloadAction<string>) {
      state.statusValue = action.payload
    },
    setStartDateValue(state, action: PayloadAction<string>) {
      state.start_dateValue = action.payload
    },
    setFinishDateValue(state, action: PayloadAction<string>) {
      state.finish_dateValue = action.payload
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

export const useEmailValue = () =>
  useSelector((state: { mainData: DataState }) => state.mainData.emailValue);

export const useStatusValue = () =>
  useSelector((state: { mainData: DataState }) => state.mainData.statusValue);

export const useStartDateValue = () =>
  useSelector((state: { mainData: DataState }) => state.mainData.start_dateValue);

export const useFinishDateValue = () =>
  useSelector((state: { mainData: DataState }) => state.mainData.finish_dateValue);
// Action, который будем применять в различных обработках
export const {
    setTitleValue: setTitleValueAction,
    setTagValue: setTagValueAction,
    setMinPriceValue: setMinPriceValueAction,
    setMaxPriceValue: setMaxPriceValueAction,
    setDishes: setDishesAction,
    setEmailValue: setEmailValueAction,
    setStatusValue: setStatusValueAction,
    setStartDateValue: setStartDateValueAction,
    setFinishDateValue: setFinishDateValueAction
  } = dataSlice.actions;

export default dataSlice.reducer;