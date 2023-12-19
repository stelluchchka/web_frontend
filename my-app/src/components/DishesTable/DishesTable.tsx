import React from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import styles from './DishesTable.module.scss'
import Table from 'react-bootstrap/Table';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import BasketIcon from '../Icons/BasketIcon';


// interface OrderData {
//   id: number;
//   status: string;
//   created_at: string;
//   processed_at: string;
//   completed_at: string;
// }
// interface DishOrderData {
//   id: number;
//   dish: DishesData;
//   order: OrderData;
//   quantity: number;
// }

interface DishesData {
  id: number;
  title: string;
  price: number;
  tag: string;
  url: string;
}
interface DishFromOrder {
  id: number;
  dish: DishesData;
  quantity: number;
}
// interface DishesFromOrder {
//   id: number;
//   status: string;
//   created_at: string;
//   processed_at: string;
//   completed_at: string;
//   dish: DishFromOrder[];
// }

export type DishesTableProps = {
  dishes: DishFromOrder[];
  className?: string;
  flag?: boolean;
};

const DishesTable: React.FC<DishesTableProps> = ({dishes, className, flag}) => {
  useDispatch();
  // const dishes_orders = useDishOrder();
  console.log("dishes", dishes)

  const deleteDishFromOrder = async (id: number) => {
    try {
      axios(`http://localhost:8000/dishes_orders/${id}`, {
        method: 'DELETE',
        withCredentials: true
      })

      // dispatch(setDishesFromOrderAction(dishes.dish.filter(dish => dish.id !== id)))///////
      // localStorage.setItem('dish_orders', JSON.stringify([]));
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
          {dishes.map((dishes: DishFromOrder, index: number) => (
            <tr key={dishes.id}>
              <td>{++index}</td>
              <td>{dishes.dish.title}</td>
              <td>{dishes.quantity}</td>
              <td>{dishes.dish.price} ₽</td>
              {!flag && <td className={styles.table__action}><BasketIcon onClick={() => handleDeleteButtonClick(dishes.dish.id)}/></td>}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default DishesTable