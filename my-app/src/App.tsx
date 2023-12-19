import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/header/header";
import MainPage from "./pages/main";
import DetailedPage from "./pages/detailed";
import RegistrationPage from "./pages/registration/registration";
import LoginPage from "./pages/login/login";
import Dishes from "./pages/dishes";
import Cookies from "universal-cookie";
import {setUserAction, setIsAuthAction, useIsAuth} from "../src/slices/authSlice";
import {useDispatch} from "react-redux";
import axios, {AxiosResponse} from 'axios';
import { setCurrentOrderIdAction} from '../src/slices/orderSlice'
import { setDishesAction} from "../src/slices/mainSlice";
import React from 'react';
import OrderPage from "./pages/order";
import OrdersPage from "./pages/orders";

const mockDishes = [
  {
      id: 1,
      title: "бургер99",
      price: 100,
      url: "https://png.pngtree.com/png-clipart/20190921/original/pngtree-hand-drawn-delicious-burger-illustration-png-image_4752009.jpg",
      tag: "вег",
      status: "есть",
      weight: 100,
      energy_value: 1,
      content: "dd",
      chef_name: "aaaaa иван",
      chef_post: "шеф-повр",
      chef_url: "https://madeindream.com/image/data/statya/sravnenie-domashnego-soka-i-pokupnogo/mid-komissiya-sok-iz-magazina-1-big.png",
      expiry_date: "12 суток"
  },
  {
      id: 2,
      title: "сок",
      price: 200,
      url: "https://madeindream.com/image/data/statya/sravnenie-domashnego-soka-i-pokupnogo/mid-komissiya-sok-iz-magazina-1-big.png",
      tag: "остро",
      status: "есть",
      weight: 100,
      energy_value: 1,
      content: "dd",
      chef_name: "aaaaa щщщщ",
      chef_post: "шеф",
      chef_url: "https://madeindream.com/image/data/statya/sravnenie-domashnego-soka-i-pokupnogo/mid-komissiya-sok-iz-magazina-1-big.png",
      expiry_date: "12 суток"
  },
  {
      id: 3,
      title: "бургер1",
      price: 300,
      url: "https://png.pngtree.com/png-clipart/20190921/original/pngtree-hand-drawn-delicious-burger-illustration-png-image_4752009.jpg",
      tag: "вег",
      status: "есть",
      weight: 100,
      energy_value: 1,
      content: "dd",
      chef_name: "aaaaоооa",
      chef_post: "кондитер",
      chef_url: "https://madeindream.com/image/data/statya/sravnenie-domashnego-soka-i-pokupnogo/mid-komissiya-sok-iz-magazina-1-big.png",
      expiry_date: "12 суток"
  },
  {
      id: 4,
      title: "бургер2",
      price: 400,
      url: "https://png.pngtree.com/png-clipart/20190921/original/pngtree-hand-drawn-delicious-burger-illustration-png-image_4752009.jpg",
      tag: "вег",
      status: "есть",
      weight: 100,
      energy_value: 1,
      content: "dd",
      chef_name: "aaaaa",
      chef_post: "asdf",
      chef_url: "https://madeindream.com/image/data/statya/sravnenie-domashnego-soka-i-pokupnogo/mid-komissiya-sok-iz-magazina-1-big.png",
      expiry_date: "12 суток"
  },
  {
      id: 5,
      title: "сок2",
      price: 500,
      url: "https://madeindream.com/image/data/statya/sravnenie-domashnego-soka-i-pokupnogo/mid-komissiya-sok-iz-magazina-1-big.png",
      tag: "остро",
      status: "есть",
      weight: 100,
      energy_value: 1,
      content: "dd",
      chef_name: "aaaaa",
      chef_post: "asdf",
      chef_url: "https://madeindream.com/image/data/statya/sravnenie-domashnego-soka-i-pokupnogo/mid-komissiya-sok-iz-magazina-1-big.png",
      expiry_date: "12 суток"
  }
]

const cookies = new Cookies();

export type ReceivedDishData = {
  id: number,
  title: string,
  price: number,
  tag: string,
  url: string
}

// interface DishesData {
//   id: number;
//   title: string;
//   price: number;
//   tag: string;
//   url: string;
// }
// interface RecievedDishesFromOrder {
//   id: number;
//   dish: DishesData
//   quantity: number;
// }
// interface RecievedDishesFromOrder {
//   id: number;
//   status: string;
//   created_at: string;
//   processed_at: string;
//   completed_at: string;
//   dish: DishFromOrder;
// }

function App() {
  const dispatch = useDispatch();
  const isAuth = useIsAuth();
  const getInitialUserInfo = async () => {

    console.log(cookies.get("session_id"))
    try {
      const response: AxiosResponse = await axios('http://localhost:8000/user_info',
      { 
        method: 'GET',
        withCredentials: true, 
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
      })

      console.log("got response data",response.data)
      dispatch(setIsAuthAction(true))
      dispatch(setUserAction({
        email: response.data.email,
        first_name: response.data.first_name,
        last_name: response.data.last_name,
        isSuperuser: response.data.is_superuser
      }))
      
    } 
    catch {
      console.log('Пользоатель не авторизован!!!')
    }
  }

  // const getCurrentOrder = async (id: number) => {
  //   try {
  //     const response = await axios(`http://localhost:8000/orders/${id}`, {
  //       method: 'GET',
  //       withCredentials: true,
  //     })
  //     dispatch(setCurrentOrderDateAction(response.data.created_at))
  //     const newDishArr = response.data.dishes.map((raw: ReceivedDishData) => ({
  //       id: raw.id,
  //       title: raw.title,
  //       price: raw.price,
  //       tag: raw.tag,
  //       url: raw.url
  //   }));
  //   dispatch(setDishFromOrderAction(newDishArr))
  //   console.log("newDishArr", response.data.dishes)
  // } catch(error) {
  //     throw error;
  //   }
  // }

  const getDishes = async () => {
    try {
        const response = await axios('http://localhost:8000/dishes', {
            method: 'GET',
            withCredentials: true 
        });
        const dishes = response.data.dishes;
        console.log("response.data", response.data)
        if (response.data.order.id) {
          dispatch(setCurrentOrderIdAction(response.data.order.id))
        }
        // const id = useCurrentOrderId()
        // console.log("id", id)
        const newArr = dishes.map((raw: ReceivedDishData) => ({
            id: raw.id,
            title: raw.title,
            price: raw.price,
            tag: raw.tag,
            url: raw.url,
        }));
        dispatch(setDishesAction(newArr));
    }
    catch {
      dispatch(setDishesAction(mockDishes));
    }
  };

  React.useEffect(() => {
    if (cookies.get("session_id")) {
      getInitialUserInfo();
    }
    getDishes();
    console.log("isAuth: ", isAuth)
  }, [])
    
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/dishes" element={<Dishes />} />
        <Route path="/dishes/:id" element={<DetailedPage />} />
        <Route>{!isAuth && <Route path='/registration' element={<RegistrationPage/>} />}</Route>
        <Route path='/login' element={<LoginPage/>} />
        {<Route path='/order' element={<OrderPage/>}/>}
        {<Route path='/orders' element={<OrdersPage/>}/>}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;