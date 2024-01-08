import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

interface DishData {
  id: number,
  title: string,
  price: number,
  tag: string,
  url: string,
  weight: number,
  energy_value: number,
  content: string,
  chef_name: string,
  chef_post: string,
  chef_url: string,
  expiry_date: string
}

interface DataState {
  dish: DishData,
  LinksMapData: Map<string, string>
}

const dataSlice = createSlice({
  name: "data",
  initialState: {
    dish: {},
    LinksMapData: new Map<string, string>([['Блюда', '/dishes']])
  } as DataState,
  reducers: {
    setDish(state, action: PayloadAction<DishData>) {
        state.dish = action.payload
    },
    setLinksMapData(state, action: PayloadAction<Map<string, string>>) {
      console.log(action.payload)
      state.LinksMapData = action.payload
  },
  },
});

export const useDish = () =>
  useSelector((state: { detailedData: DataState }) => state.detailedData.dish);

export const useLinksMapData = () =>
  useSelector((state: { detailedData: DataState }) => state.detailedData.LinksMapData);

export const {
    setDish: setDishAction,
    setLinksMapData: setLinksMapDataAction
} = dataSlice.actions;

export default dataSlice.reducer;