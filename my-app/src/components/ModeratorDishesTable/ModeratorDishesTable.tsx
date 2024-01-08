import React from 'react'
import styles from './ModeratorDishesTable.module.scss'
import Table from 'react-bootstrap/Table';
import cn from 'classnames';

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
};

const ModeratorDishesTable: React.FC<DishesTableProps> = ({dishes, className}) => {

  React.useEffect(() => {
  }, [])

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
          </tr>
        </thead>
        <tbody>
          {dishes.map((dishes: DishFromOrder, index: number) => (
            <tr key={dishes.id}>
              <td>{++index}</td>
              <td>{dishes.title}</td>
              <td>
              {dishes.quantity}
              </td>
              <td>{dishes.price} ₽</td>
              <td>{dishes.price * dishes.quantity} ₽</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default ModeratorDishesTable