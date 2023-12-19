import React from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import styles from './order.module.scss'
import Button from 'react-bootstrap/Button'
import BreadCrumbs from '../../components/breadcrumps';
import { useCurrentOrderId, useDishesFromOrderData } from '../../slices/orderSlice'
import DishesTable from '../../components/DishesTable'
import { useDispatch } from 'react-redux'
import { useCurrentOrderDate, setCurrentOrderDateAction, setDishFromOrderAction } from '../../slices/orderSlice'
import { useLinksMapData, setLinksMapDataAction } from '../../slices/detailedSlice';


// interface DishesData {
//   id: number;
//   title: string;
//   price: number;
//   tag: string;
//   url: string;
// }
// interface DishFromOrder {
//   id: number;
//   dish: DishesData;
//   quantity: number;
// }

// interface DishesData {
//   id: number;
//   title: string;
//   price: number;
//   tag: string;
//   url: string;
// }
// interface DishFromOrder {
//   id: number;
//   dish: DishesData
//   quantity: number;
// }
// interface RecievedDishesFromOrder {
//   id: number;
//   status: string;
//   created_at: string;
//   processed_at: string;
//   completed_at: string;
//   dish: DishFromOrder;
// }


const OrderPage = () => {
  const dispatch = useDispatch();
  const dishes = useDishesFromOrderData()
  console.log("dishes_from_order_data", dishes)

  const orderDate = useCurrentOrderDate();
  const currentOrderId = useCurrentOrderId();
  const linksMap = useLinksMapData();

  React.useEffect(() => {
    dispatch(setLinksMapDataAction(new Map<string, string>([
      ['Текущий заказ', '/order']
  ])))
  }, [])

  const sendOrder = async () => {
    try {
      const response = await axios(`http://localhost:8000/orders/accept`, {
        method: 'PUT',
        withCredentials: true
      })
      console.log(response)
      dispatch(setDishFromOrderAction([]));
      dispatch(setCurrentOrderDateAction(''));
      toast.success("Заказ успешно отправлен на проверку!");
    } catch(error) {
      throw error;
    }
  }

  const deleteOrder = async () => {
    try {
      await axios(`http://localhost:8000/orders/${currentOrderId}`, {
      method: 'DELETE',
      withCredentials: true
    })

    dispatch(setDishFromOrderAction([]));
    dispatch(setCurrentOrderDateAction(''));
    toast.success("Заказ успешно удален!");
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
          Ваш заказ
        </h1><br />

        {dishes.length !== 0 ? <div>
          {/* <h5 className={styles['order-subtitle']}>
            У вас есть возможность удалять блюда из заявки, удалить всю заявку или отправить заявку на проверку модераторам!
          </h5> */}

          <div className={styles['order-info']}>
            <h3 className={styles['order-info-title']} style={{textAlign: 'left'}}>Дата создания заказа: <br/><b>{orderDate}</b></h3>
            {/* <h3 className={styles['order-info-title']}>Добавленные блюда:</h3> */}
            <DishesTable dishes={dishes} className={styles['order-info-table']}/>

            <div className={styles['order-info-btns']}>
              <Button onClick={() => handleSendButtonClick()} className={styles['order-info-btn']}>Заказать</Button>
              <Button onClick={() => handleDeleteButtonClick()} className={styles['order-info-btn']}>Отменить</Button>
            </div>
          </div>
        </div>
        : <h5 className={styles['order-subtitle']}>
            На данный момент ваша заявка пустая!
          </h5>
      }
      </div>
    </div>
  )
}

export default OrderPage