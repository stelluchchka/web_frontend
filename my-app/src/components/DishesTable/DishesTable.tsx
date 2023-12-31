import React from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import styles from './DishesTable.module.scss'
import Table from 'react-bootstrap/Table';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import BasketIcon from '../Icons/BasketIcon';


interface DishFromOrder {
  id: number;
  title: string;
  price: number;
  tag: string;
  url: string;
  quantity: number;
}

export type DishesTableProps = {
  dishes: DishFromOrder[];
  className?: string;
  flag?: boolean;
};

const DishesTable: React.FC<DishesTableProps> = ({dishes, className, flag}) => {
  useDispatch();

  const deleteDishFromOrder = async (id: number) => {
    try {
      axios(`http://localhost:8000/dishes_orders/${id}`, {
        method: 'DELETE',
        withCredentials: true
      })
      toast.success("успешно удаленo!");
    } catch(error) {
      throw error;
    }
  }

  const reduceQuantity = async(id: number, quantity: number) => {
    try {
      const formData = new FormData();
      const new_num = String(quantity - 1)
      formData.append('quantity', new_num);
      await axios.put(`http://localhost:8000/dishes_orders/${id}`, formData, {
          method: 'PUT',
          withCredentials: true,
      })
      toast.success("успешно уменьшено!");
    }
    catch(error) {
      throw error;
    }
  }

  const increaseQuantity = async(id: number, quantity: number) => {
    try {
      const formData = new FormData();
      const new_num = String(quantity + 1)
      formData.append('quantity', new_num);
      await axios.put(`http://localhost:8000/dishes_orders/${id}`, formData, {
          method: 'PUT',
          withCredentials: true,
      })
      toast.success("успешно увеличено!");
    }
    catch(error) {
      throw error;
    }
  }

  const handleDeleteButtonClick = (id: number) => {
    deleteDishFromOrder(id)
  }
  const handleMinusClick = (id: number, quantity: number) => {
    reduceQuantity(id, quantity)
  }
  const handlePlusClick = (id: number, quantity: number) => {
    increaseQuantity(id, quantity)
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
            <th>Итого</th>
            {!flag && <th></th>}
          </tr>
        </thead>
        <tbody>
          {dishes.map((dishes: DishFromOrder, index: number) => (
            <tr key={dishes.id}>
              <td>{++index}</td>
              <td>{dishes.title}</td>
              <td>
              {!flag && <button style={{marginRight: '20px'}} onClick={() => handleMinusClick(dishes.id, dishes.quantity)}>-</button>
              }
              {dishes.quantity}
              {!flag &&
              <button style={{marginLeft: '20px'}} onClick={() => handlePlusClick(dishes.id, dishes.quantity)}>+</button>
              }
              </td>
              <td>{dishes.price} ₽</td>
              <td>{dishes.price * dishes.quantity} ₽</td>
              {!flag && <td className={styles.table__action}><BasketIcon onClick={() => handleDeleteButtonClick(dishes.id)}/></td>}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default DishesTable