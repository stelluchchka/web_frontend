import React from 'react'
import styles from './OrdersTable.module.scss'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useUser } from '../../slices/authSlice';

interface OrderData {
  id: number;
  user: string;
  status: string;
  created_at: string;
  processed_at: string;
  completed_at: string;
  is_success: string;
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
  const user = useUser();

  return (
    <>
    <div className={styles.table__container}>
    <Table responsive borderless className={!className ? styles.table : cn(styles.table, className)}>
        <thead>
          <tr className={styles.tableHead}>
            <th>№</th>
            {user.isSuperuser && <th>Почта пользователя</th>}
            <th>Статус</th>
            <th>Дата создания</th>
            <th>Дата формирования</th>
            <th>Дата завершения</th>
            <th>Оплата</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order: OrderData, index: number) => (
            <tr key={order.id}>
              <td>{++index}</td>
              {user.isSuperuser &&
                <td>{order.user}</td>
              }
              <td>{order.status}</td>
              <td>{order.created_at}</td>
              <td>{order.processed_at ? order.processed_at : '-'}</td>
              <td>{order.completed_at ? order.completed_at : '-'}</td>
              <td>{order.is_success}</td>
              <td className={styles.table__action}>
              {!user.isSuperuser ?
                <Link to={`/orders/${order.id}`}>
                  <Button>Подробнее</Button>
                </Link>
                :
                <Link to={`/moderator_orders/${order.id}`}>
                  {order.status=="сформирован" ?
                  <Button style={{backgroundColor: '#f53100', color: 'white'}}>Подробнее</Button>
                  :
                  <Button>Подробнее</Button>
                  }
                </Link>
              }
                {/* <Link to={`/orders/${order.id}`}> */}
                  {/* <Button onClick={() => handleDetailedButtonClick(order.id)}>Подробнее</Button> */}
                {/* </Link> */}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>

    </>
  );
}

export default OrdersTable