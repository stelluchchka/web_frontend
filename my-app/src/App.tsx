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
import { setCurrentOrderIdAction, setDishesFromOrderDataAction, setOrderAction, setOrderDateAction } from '../src/slices/orderSlice'
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
      tags: "вег",
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
      tags: "остро",
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
      tags: "вег",
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
      tags: "вег",
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
      tags: "остро",
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

export type ReceivedOrderData = {
  id: number;
  status: string;
  created_at: string;
  processed_at: string;
  completed_at: string;
}

interface DishesFromOrder {
  id: number;
  title: string;
  price: number;
  tag: string;
  url: string;
  quantity: number;
}

function App() {
  const dispatch = useDispatch();
  const isAuth = useIsAuth();
  const getInitialUserInfo = async () => {
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

  const getDishesAndOrder = async () => {
    try {
        const response = await axios('http://localhost:8000/dishes', {
            method: 'GET',
            withCredentials: true 
        });
        console.log("response.data", response.data)
        if (response.data.order.id) {
          const order_id = response.data.order.id
          dispatch(setCurrentOrderIdAction(order_id))

          const order = response.data.order
          const NewOrderArr = {
            id: order.id,
            status: order.status,
            created_at: order.created_at,
            processed_at: order.processed_at,
            completed_at: order.completed_at,
          }
          const order_response = await axios(`http://localhost:8000/orders/${order_id}`, {
            method: 'GET',
            withCredentials: true,
          })
          const newDishesFromOrderDataArr = order_response.data.dishes.map((raw: DishesFromOrder) => ({
            id: raw.id,
            title: raw.title,
            price: raw.price,
            tag: raw.tag,
            url: raw.url,
            quantity: raw.quantity,
          }));
          dispatch(setDishesFromOrderDataAction(newDishesFromOrderDataArr))
          dispatch(setOrderAction(NewOrderArr));
          dispatch(setOrderDateAction(order_response.data.created_at))
        }
    }
    catch {
      dispatch(setDishesAction(mockDishes));
    }
  };

  React.useEffect(() => {
    if (cookies.get("session_id")) {
      getInitialUserInfo();
    }
    getDishesAndOrder();
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