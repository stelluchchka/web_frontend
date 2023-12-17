import React from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import styles from './order.module.scss'
import Button from 'react-bootstrap/Button'
import BreadCrumbs from '../../components/breadcrumps';
import { useCurrentOrderId } from '../../slices/orderSlice'
import DishesTable from '../../components/DishesTable'
import { useDispatch } from 'react-redux'
import { useCurrentOrderDate, useDishesFromOrder,
  setCurrentOrderDateAction, setDishesFromOrderAction } from '../../slices/orderSlice'
import { useLinksMapData, setLinksMapDataAction } from '../../slices/detailedSlice';


export type ReceivedDishesData = {
  id: number;
  title: string;
  price: number;
  tag: string;
  url: string;
}

const OrderPage = () => {
  console.log("a")
  const dispatch = useDispatch();
  const dishes = useDishesFromOrder();
  const orderDate = useCurrentOrderDate();
  const currentOrderId = useCurrentOrderId();
  const linksMap = useLinksMapData();
  console.log("a")
  React.useEffect(() => {
    dispatch(setLinksMapDataAction(new Map<string, string>([
      ['Текущая заявка', '/order']
  ])))
  }, [])

  const sendOrder = async () => {
    try {
      const response = await axios(`http://localhost:8000/orders/accept`, {
        method: 'PUT',
        withCredentials: true
      })

      dispatch(setDishesFromOrderAction([]));
      dispatch(setCurrentOrderDateAction(''));
      toast.success("Заявка успешно отправлена на проверку!");
    } catch(error) {
      throw error;
    }
  }

  const deleteOrder = async () => {
    try {
      const response = await axios(`http://localhost:8000/orders/delete`, {
      method: 'DELETE',
      withCredentials: true
    })

    dispatch(setDishesFromOrderAction([]));
    dispatch(setCurrentOrderDateAction(''));
    toast.success("Заявка успешно удалена!");
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
        <BreadCrumbs links={linksMap}></BreadCrumbs>
        <h1 className={styles['order-title']}>
          Текущая заявка
        </h1>

        {dishes.length !== 0 ? <div>
          <h5 className={styles['order-subtitle']}>
            У вас есть возможность удалять блюда из заявки, удалить всю заявку или отправить заявку на проверку модераторам!
          </h5>

          <div className={styles['order-info']}>
            <h3 className={styles['order-info-title']}>Дата создания заявки: <br/><b>{orderDate}</b></h3>
            <h3 className={styles['order-info-title']}>Добавленные блюда:</h3>
            <DishesTable dishes={dishes} className={styles['order-info-table']}/>

            <div className={styles['order-info-btns']}>
              <Button onClick={() => handleSendButtonClick()} className={styles['order-info-btn']}>Отправить</Button>
              <Button onClick={() => handleDeleteButtonClick()} className={styles['order-info-btn']}>Удалить</Button>
            </div>
          </div>
        </div>
        : <h5 className={styles['order-subtitle']}>
            На данный момент ваша заявка пустая! Вы можете добавить различные блюда в заявку, и отправить ее на поверку модераторам!
          </h5>
      }
      </div>
    </div>
  )
}

export default OrderPage