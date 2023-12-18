import React from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import styles from './DishesTable.module.scss'
import Table from 'react-bootstrap/Table';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { setDishOrderAction } from '../../slices/orderSlice'
import BasketIcon from '../Icons/BasketIcon';

interface DishesData {
  id: number;
  title: string;
  price: number;
  tag: string;
  url: string;
}
interface OrderData {
  id: number;
  status: string;
  created_at: string;
  processed_at: string;
  completed_at: string;
}
interface DishOrderData {
  id: number;
  dish: DishesData;
  order: OrderData;
  quantity: number;
}

export type DishesTableProps = {
  dishes_orders: DishOrderData[];
  className?: string;
  flag?: boolean;
};

const DishesTable: React.FC<DishesTableProps> = ({dishes_orders, className, flag}) => {
  const dispatch = useDispatch();
  console.log("dishes_orders", dishes_orders)

  const deleteDishFromOrder = async (id: number) => {
    try {
      axios(`http://localhost:8000/dishes_orders/${id}`, {
        method: 'DELETE',
        withCredentials: true
      })

      dispatch(setDishOrderAction(dishes_orders.filter(dish => dish.id !== id)))
      localStorage.setItem('dish_orders', JSON.stringify([]));
      toast.success("успешно удаленo!");
    } catch(error) {
      throw error;
    }
  }

  const handleDeleteButtonClick = (id: number) => {
    deleteDishFromOrder(id)
  }

  return (
    <div className={styles.table__container}>
      <Table responsive borderless className={!className ? styles.table : cn(styles.table, className)}>
        <thead>
          <tr className={styles.tableHead}>
            <th>№</th>
            <th> Название блюда </th>
            <th>Количество</th>
            <th>Цена</th>
            {!flag && <th></th>}
          </tr>
        </thead>
        <tbody>
          {dishes_orders.map((dish_order: DishOrderData, index: number) => (
            <tr key={dish_order.id}>
              <td>{++index}</td>
              <td>{dish_order.dish.title}</td>
              <td>{dish_order.quantity}</td>
              <td>{dish_order.dish.price} ₽</td>
              {!flag && <td className={styles.table__action}><BasketIcon onClick={() => handleDeleteButtonClick(dish_order.id)}/></td>}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default DishesTable