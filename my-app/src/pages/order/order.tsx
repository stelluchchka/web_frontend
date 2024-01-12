import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import styles from './order.module.scss'
import Button from 'react-bootstrap/Button'
import BreadCrumbs from '../../components/breadcrumps';
import { setCurrentOrderIdAction, setDishesFromOrderDataAction, useCurrentOrderId, useDishesFromOrderData, useOrderDate } from '../../slices/orderSlice'
import DishesTable from '../../components/DishesTable'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import { useLinksMapData, setLinksMapDataAction } from '../../slices/detailedSlice';
import { useNavigate } from "react-router-dom"

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
  const linksMap = useLinksMapData();
  const CurrentDishesFromOrder = useDishesFromOrderData();
  const cur_order_date = useOrderDate();
  const params = useParams();
  const OrderId = Number(params.id);
  const [dishesFromOrder, setDishesFromOrder] = useState<DishesFromOrder[]>([]);
  const flag = (currentOrderId != OrderId)
  const navigate = useNavigate()
  const [isLoad, setLoad] = useState(false)

  React.useEffect(() => {

    if (currentOrderId == -1 && !flag) {
      navigate("/")
    }
    else if (!flag) {
      dispatch(setLinksMapDataAction(new Map<string, string>([
          ['Текущий заказ', `orders/${currentOrderId}`]
      ])))
    }
    else if (flag) {
      const newLinksMap = new Map<string, string>(linksMap);
      newLinksMap.set(String(OrderId), '/orders/' + OrderId);
      dispatch(setLinksMapDataAction(newLinksMap))
    } 
    else {
      deleteOrder()
      navigate("/")
      dispatch(setLinksMapDataAction(new Map<string, string>([
        ['Главная', `/`]
    ])))
    }

  if (OrderId != -1)
    getDishesFromOrder()
  }, [])

  const getDishesFromOrder = async () => {
    try {
      const order_response = await axios(`http://localhost:8000/orders/${OrderId}`, {
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
      setDishesFromOrder(newDishesFromOrderDataArr)
    }
    catch(error) {
      throw error;
    }
  };

  const if_success = async () => {
    
    try {
      const formData = new FormData();
      formData.append('order_id', String(currentOrderId));
      await axios.post(`http://localhost:8000/calc`, formData, {
            method: 'POST',
            withCredentials: true,
      });
      dispatch(setDishesFromOrderDataAction([]))
      dispatch(setCurrentOrderIdAction(-1))
      navigate("/")
    } catch(error) {
      console.log("Что-то пошло не так")
    }
  }

  const sendOrder = async () => {
    setLoad(true)
    try {
      const formData = new FormData();
      formData.append('status', "сформирован");
      await axios.put(`http://localhost:8000/orders/accept`, formData, {
          method: 'PUT',
          withCredentials: true,
      })
      toast.success("Заказ успешно оформлен!");
      setLoad(false)
    }
    catch(error) {
      setLoad(false)
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
      dispatch(setDishesFromOrderDataAction([]))
      dispatch(setCurrentOrderIdAction(-1))
      navigate("/")
    }
    catch(error) {
      throw error;
    }
  }

  const handleSendButtonClick = () => {
    sendOrder();
    if(!isLoad)
      if_success();  //async
  }

  const handleDeleteButtonClick = () => {
    deleteOrder();
  }

  return (
    <div className={styles.order}>
      <div className={styles['order-wrapper']}>
        <BreadCrumbs links={linksMap}></BreadCrumbs>
        {(OrderId == currentOrderId) && (CurrentDishesFromOrder.length > 0) &&
        <div>
          <br />
          <div className={styles['order-info']}>
              <h3 className={styles['order-info-title']} style={{textAlign: 'left'}}>Дата и время создания заказа: <b>{cur_order_date}</b></h3>

            <DishesTable dishes={CurrentDishesFromOrder} className={styles['order-info-table']}/>

            <div className={styles['order-info-btns']}>
              <Button onClick={() => handleSendButtonClick()} className={styles['order-info-btn']}>Заказать</Button>
              <Button onClick={() => handleDeleteButtonClick()} className={styles['order-info-btn']}>Отменить</Button>
            </div>
          </div>
        </div>
      }
        {(OrderId != currentOrderId) && (dishesFromOrder.length > 0) &&
        <div>
          <h1 className={styles['order-title']}>
            Заказ
          </h1><br />
          <div className={styles['order-info']}>

            <DishesTable dishes={dishesFromOrder} className={styles['order-info-table']} flag={flag}/>

          </div>
        </div>
      }
        {(OrderId != currentOrderId) && (dishesFromOrder.length == 0) && 
        <div>
          <h1 className={styles['order-title']}>
            Заказ пуст
          </h1><br />
        </div>
      }
      </div>
    </div>
  )
}

export default OrderPage