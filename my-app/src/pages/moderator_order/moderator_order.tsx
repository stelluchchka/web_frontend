import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import styles from './moderator_order.module.scss'
import Button from 'react-bootstrap/Button'
import BreadCrumbs from '../../components/breadcrumps';
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import { useLinksMapData, setLinksMapDataAction } from '../../slices/detailedSlice';
import { useNavigate } from "react-router-dom"
import ModeratorDishesTable from '../../components/ModeratorDishesTable';

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
const ModeratorOrderPage = () => {
  const dispatch = useDispatch();
  const linksMap = useLinksMapData();
  const params = useParams();
  const [status, setStatus] = useState('')
  const OrderId = Number(params.id);
  const [dishesFromOrder, setDishesFromOrder] = useState<DishesFromOrder[]>([]);
  const navigate = useNavigate()

  React.useEffect(() => {
    const newLinksMap = new Map<string, string>(linksMap);
    newLinksMap.set(String(OrderId), '/orders/' + OrderId);
    dispatch(setLinksMapDataAction(newLinksMap))
    getDishesFromOrder();
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
      setStatus(order_response.data.status)
    }
    catch(error) {
      throw error;
    }
  };

  const acceptOrder = async () => {
    try {
      const formData = new FormData();
      formData.append('status', "готов");
      await axios.put(`http://localhost:8000/orders/${OrderId}/confirm`, formData, {
          method: 'PUT',
          withCredentials: true,
      })
      toast.success("Заказ успешно принят!");
      navigate("/orders")
    }
    catch(error) {
      throw error;
    }
  }

  const cancelOrder = async () => {
    try {
      const formData = new FormData();
      formData.append('status', "отказ");
      await axios.put(`http://localhost:8000/orders/${OrderId}/confirm`, formData, {
          method: 'PUT',
          withCredentials: true,
      })
      toast.success("Заказ успешно удален!");
      navigate("/orders")
    }
    catch(error) {
      throw error;
    }
  }

  const handleAcceptButtonClick = () => {
    acceptOrder();
  }

  const handleCancelButtonClick = () => {
    cancelOrder();
  }

  return (
    <div className={styles.order}>
      <div className={styles['order-wrapper']}>
        <BreadCrumbs links={linksMap}></BreadCrumbs>
        {dishesFromOrder.length > 0 &&
        <div>
          <br />
          <div className={styles['order-info']}>

            <ModeratorDishesTable dishes={dishesFromOrder} className={styles['order-info-table']}/>
            {status == "сформирован" &&
              <div className={styles['order-info-btns']}>
                <Button onClick={() => handleAcceptButtonClick()} className={styles['order-info-btn']}>Одобрить</Button>
                <Button onClick={() => handleCancelButtonClick()} className={styles['order-info-btn']}>Отказ</Button>
              </div>            
            }

          </div>
        </div>
      }
      {dishesFromOrder.length == 0 && 
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

export default ModeratorOrderPage