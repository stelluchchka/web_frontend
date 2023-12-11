import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import MainPage from "./pages/dishes";
import Header from "./components/header"
import DetailedPage from "./pages/detailed";
import Dishes from "./pages/dishes";
import Registration from "./pages/registration";
import Login from "./pages/login";
import { ToastContainer } from 'react-toastify';
import {useIsAuth, setUserAction, setIsAuthAction} from "../src/slices/authSlice";
import Cookies from "universal-cookie";
import {useDispatch} from "react-redux";
import axios, {AxiosResponse} from 'axios';
import React from 'react';


const cookies = new Cookies();
// console.log("2")


export type ReceivedCategoryData = {
  id: number;
  title: string;
  status: string;
}

export type ReceivedSubscriptionData = {
  id: number;
  title: string;
  price: number;
  info: string;
  src: string;
  id_category: number;
  category: string;
}




function App() {

  
  const dispatch = useDispatch();
  // const isAuth = useIsAuth();

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

      console.log(response.data)
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


React.useEffect(() => {
  if (cookies.get("session_id")) {
    getInitialUserInfo();
  }
}, [])

  return (
    <>
    <Header />
    <Routes>
              <Route path='/' element={<MainPage/>}/>
              <Route path="/dishes" element={<Dishes />} />
              <Route path="/dishes/:id"element={<DetailedPage />} />
              <Route path='/registration' element={<Registration/>} />
              <Route path='/login' element={<Login/>}></Route>

              <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
      <ToastContainer autoClose={1500} pauseOnHover={false} />
    </>
  );
}

export default App;