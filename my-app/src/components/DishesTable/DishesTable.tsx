import React from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import styles from './DishesTable.module.scss'
import Table from 'react-bootstrap/Table';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { useDishesFromOrder, setDishesFromOrderAction } from '../../slices/orderSlice'
import BasketIcon from '../Icons/basketIcon';

interface DishData {
  id: number,
  title: string,
  price: number,
  tag: string,
  url: string,
}

export type DishesTableProps = {
  dishes: DishData[];
  className?: string;
  flag?: boolean;
};

const DishesTable: React.FC<DishesTableProps> = ({dishes, className, flag}) => {
  const dispatch = useDispatch();
  const subscripions = useDishesFromOrder()

  const deleteDishFromOrder = async (id: number) => {
    try {
      const response = axios(`http://localhost:8000/dishes_orders/${id}/delete`, {
        method: 'DELETE',
        withCredentials: true
      })

      console.log(id, subscripions)

      dispatch(setDishesFromOrderAction(subscripions.filter(dish => dish.id !== id)))

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
            <th>Тег</th>
            <th>Название</th>
            <th>Цена</th>
            {!flag && <th></th>}
          </tr>
        </thead>
        <tbody>
          {dishes.map((dish: DishData, index: number) => (
            <tr key={dish.id}>
              <td>{++index}</td>
              <td>{dish.tag}</td>
              <td>{dish.title}</td>
              <td>{dish.price} ₽</td>
              {!flag && <td className={styles.table__action}><BasketIcon onClick={() => handleDeleteButtonClick(dish.id)}/></td>}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default DishesTable