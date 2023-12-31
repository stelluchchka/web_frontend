import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import styles from './order.module.scss'
import Button from 'react-bootstrap/Button'
import BreadCrumbs from '../../components/breadcrumps';
import { setDishesFromOrderDataAction, useCurrentOrderId, useDishesFromOrderData, useOrderDate } from '../../slices/orderSlice'
import DishesTable from '../../components/DishesTable'
import { useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom';
// import { useLinksMapData, setLinksMapDataAction } from '../../slices/detailedSlice';

interface DishesFromOrder {
  id: number;
  title: string;
  price: number;
  tag: string;
  url: string;
  quantity: number;
}
export type ReceivedDishData = {
  id: number,
  title: string,
  price: number,
  tag: string,
  url: string
}
const OrderPage = () => {
  const dispatch = useDispatch();
  const currentOrderId = useCurrentOrderId();
  // const linksMap = useLinksMapData();
  // const [isLoading, setIsLoading] = useState(true);
  const dishesFromOrder = useDishesFromOrderData();
  const order_date = useOrderDate();

  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    if (order_date) {
      const date = new Date(order_date);
      
      const formatted = `${date.toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' })} в 
                         ${date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}`;
      
      setFormattedDate(formatted);
    }
  }, [order_date]);

  if (currentOrderId == -1) {
    return <Navigate to="/" replace />;
  }

  React.useEffect(() => {
  //   dispatch(setLinksMapDataAction(new Map<string, string>([
  //     ['Текущий заказ', '/order']
  // ])))
    if (currentOrderId != -1)
      getDishesFromOrder()
  }, [])

  const getDishesFromOrder = async () => {
    try {
      const order_response = await axios(`http://localhost:8000/orders/${currentOrderId}`, {
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
      // setIsLoading(false);
    }
    catch(error) {
      throw error;
    }
  };

  const sendOrder = async () => {
    try {
      const formData = new FormData();
      formData.append('status', "сформирован");
      await axios.put(`http://localhost:8000/orders/accept`, formData, {
          method: 'PUT',
          withCredentials: true,
      })
      toast.success("Заказ успешно удален!");
      if (currentOrderId != -1)
        getDishesFromOrder()
    }
    catch(error) {
      throw error;
    }
  }

  const deleteOrder = async () => {
    try {
      const formData = new FormData();
      formData.append('status', "отменен");
      await axios.put(`http://localhost:8000/orders/accept`, formData, {
          method: 'PUT',
          withCredentials: true,
      })
      toast.success("Заказ успешно удален!");
      if (currentOrderId != -1)
        getDishesFromOrder()
    }
    catch(error) {
      throw error;
    }
  }

  const handleSendButtonClick = () => {
    sendOrder();
  }

  const handleDeleteButtonClick = () => {
    deleteOrder();
  }

  return (
    <div className={styles.order}>
      <div className={styles['order-wrapper']}>
        {/* <BreadCrumbs links={linksMap}></BreadCrumbs> */}
        <h1 className={styles['order-title']}>
          Ваш заказ
        </h1><br />
        {dishesFromOrder.length > 0 && <div>
          <div className={styles['order-info']}>
            <h3 className={styles['order-info-title']} style={{textAlign: 'left'}}>Дата создания заказа: <br/><b>{formattedDate}</b></h3>
            {/* <h3 className={styles['order-info-title']}>Добавленные блюда:</h3> */}
            <DishesTable dishes={dishesFromOrder} className={styles['order-info-table']}/>

            <div className={styles['order-info-btns']}>
              <Button onClick={() => handleSendButtonClick()} className={styles['order-info-btn']}>Заказать</Button>
              <Button onClick={() => handleDeleteButtonClick()} className={styles['order-info-btn']}>Отменить</Button>
            </div>
          </div>
        </div>
        
      }
      </div>
    </div>
  )
}

export default OrderPage