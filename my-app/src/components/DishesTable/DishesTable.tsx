import React from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import styles from './DishesTable.module.scss'
import Table from 'react-bootstrap/Table';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import BasketIcon from '../Icons/BasketIcon';
import { setCurrentOrderIdAction, setDishesFromOrderDataAction, setOrderDateAction, useDishesFromOrderData } from '../../slices/orderSlice';
import { useNavigate } from 'react-router-dom';


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
  const dispatch = useDispatch();
  const dishesFromOrder = useDishesFromOrderData();
  const navigate = useNavigate()

  React.useEffect(() => {
    if (dishesFromOrder.length == 0) {
      dispatch(setCurrentOrderIdAction(-1));
      dispatch(setOrderDateAction(''))
      navigate("/")
    }
  }, [])

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

  const deleteDishFromOrder = async (id: number) => {
    try {
      await axios(`http://localhost:8000/dishes_orders/${id}`, {
        method: 'DELETE',
        withCredentials: true
      })
      toast.success("успешно удаленo!");
      const newDishesFromOrderDataArr = dishesFromOrder.filter((raw: DishFromOrder) => {
        return raw.id !== id
      });
      dispatch(setDishesFromOrderDataAction(newDishesFromOrderDataArr))
      if (dishesFromOrder.length == 1) {
        deleteOrder()
      }
    } catch(error) {
      throw error;
    }
  }

  const reduceQuantity = async(id: number, quantity: number) => {
    try {
      if (quantity <= 1)
        deleteDishFromOrder(id)
      else {
        const formData = new FormData();
        const new_num = String(quantity - 1)
        formData.append('quantity', new_num);
        const response = await axios.put(`http://localhost:8000/dishes_orders/${id}`, formData, {
            method: 'PUT',
            withCredentials: true,
        })
        toast.success("успешно уменьшено!");
        const newDishesFromOrderDataArr = dishesFromOrder.map((raw: DishFromOrder) => {
          if (raw.id === id) {
            return {
              id: raw.id,
              title: response.data.dish.title,
              price: response.data.dish.price,
              tag: response.data.dish.tag,
              url: response.data.dish.url,
              quantity: raw.quantity-1,
            };
          } else {
            return {
              id: raw.id,
              title: raw.title,
              price: raw.price,
              tag: raw.tag,
              url: raw.url,
              quantity: raw.quantity,
            };
          }
        });
        dispatch(setDishesFromOrderDataAction(newDishesFromOrderDataArr))
      }
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
      const response = await axios.put(`http://localhost:8000/dishes_orders/${id}`, formData, {
          method: 'PUT',
          withCredentials: true,
      })
      toast.success("успешно увеличено!");
      console.log(response.data.dish)
      const newDishesFromOrderDataArr = dishesFromOrder.map((raw: DishFromOrder) => {
        if (raw.id === id) {
          return {
            id: raw.id,
            title: response.data.dish.title,
            price: response.data.dish.price,
            tag: response.data.dish.tag,
            url: response.data.dish.url,
            quantity: raw.quantity+1,
          };
        } else {
          return {
            id: raw.id,
            title: raw.title,
            price: raw.price,
            tag: raw.tag,
            url: raw.url,
            quantity: raw.quantity,
          };
        }
      });      
      dispatch(setDishesFromOrderDataAction(newDishesFromOrderDataArr))
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