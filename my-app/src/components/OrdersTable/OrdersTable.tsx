import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import styles from './OrdersTable.module.scss'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ModalWindow from '../../components/ModalWindow'
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

interface OrderData {
  id: number;
  status: string;
  created_at: string;
  processed_at: string;
  completed_at: string;
}

export type ReceivedDishData = {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

export type DishesTableProps = {
  orders: OrderData[];
  className?: string;
};

const OrdersTable: React.FC<DishesTableProps> = ({orders, className}) => {
  useDispatch();
  const [currentDishes, setCurrentDishes] = useState<ReceivedDishData[]>([])

  
  const getCurrentOrder = async (id: number) => {
    try {
      const response = await axios(`http://localhost:8000/orders/${id}`, {
        method: 'GET',
        withCredentials: true,
      })
      console.log("data", response.data)
      const newArr = response.data.dishes.map((raw: ReceivedDishData) => ({
        id: raw.id,
        title: raw.title,
        price: raw.price,
        quantity: raw.quantity
    }));
    setCurrentDishes(newArr)
    } catch(error) {
      throw error;
    }
  }

  const handleDetailedButtonClick = (id: number) => {
    getCurrentOrder(id);
    // setIsModalWindowOpened(true)
  };

  return (
    <>
    <div className={styles.table__container}>
    <Table responsive borderless className={!className ? styles.table : cn(styles.table, className)}>
        <thead>
          <tr className={styles.tableHead}>
            <th>№</th>
            <th>Статус</th>
            <th>Дата создания</th>
            <th>Дата формирования</th>
            <th>Дата завершения</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order: OrderData, index: number) => (
            <tr key={order.id}>
              <td>{++index}</td>
              <td>{order.status}</td>
              <td>{order.created_at}</td>
              <td>{order.processed_at ? order.processed_at : '-'}</td>
              <td>{order.completed_at ? order.completed_at : '-'}</td>
              <td className={styles.table__action}>
                <Link to={`/order`}>
                  <Button>Подробнее</Button>
                </Link>
                {/* <Link to={`/orders/${order.id}`}> */}
                  {/* <Button onClick={() => handleDetailedButtonClick(order.id)}>Подробнее</Button> */}
                {/* </Link> */}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>

      {/* <ModalWindow handleBackdropClick={() => setIsModalWindowOpened(false)} className={styles.modal} active={isModalWindowOpened}>
      {/* <h3 className={styles.modal__title}>Добавленные блюда</h3> */}
      {/* <div className={styles.modal__list}>
        {currentDishes.map((dish: ReceivedDishData) => (
          <div className={styles['modal__list-item']}>
            <div className={styles['modal__list-item-title']}>
              {dish.title}
            </div>
            <b>{dish.quantity} x {dish.price} ₽</b>
          </div>
        ))}
      </div>
      </ModalWindow> */}
    </>
  );
}

export default OrdersTable