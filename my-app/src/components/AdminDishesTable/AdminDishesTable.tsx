import React from 'react'
import styles from './AdminDishesTable.module.scss'
import Table from 'react-bootstrap/Table';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';


export type Dish = {
  id: number,
  title: string,
  price: number,
  url: string,
  tags: string,
  chef_post: string
}

export type DishesTableProps = {
  dishes: Dish[];
  className?: string;
  onPutButtonClick?: React.MouseEventHandler;
  onDelButtonClick?: React.MouseEventHandler;
};

const AdminDishesTable: React.FC<DishesTableProps> = ({dishes, className, onPutButtonClick, onDelButtonClick}) => {

  React.useEffect(() => {
  }, [])

  return (
    <div className={styles.table__container}>
      <Table responsive borderless className={!className ? styles.table : cn(styles.table, className)}>
        <thead>
          <tr className={styles.tableHead}>
            <th>№</th>
            <th>Название блюда</th>
            <th>Пост повара</th>
            <th>Тег</th>
            <th>Цена</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {dishes.map((dishes: Dish, index: number) => (
            <tr key={dishes.id}>
              <td>{++index}</td>
              <td>{dishes.title}</td>
              <td>{dishes.chef_post}</td>
              { (dishes.tags == null) || (dishes.tags == '') ?
              <td>-</td>
              :
              <td>{dishes.tags}</td>
              }
              <td>{dishes.price} ₽</td>
              <td>
                <Button style={{padding: '0px 0px', marginBottom: "5px", marginRight: "5px", height: "40px", width: "40px"}} onClick={onPutButtonClick} variant="primary">✏️</Button>
                <Button style={{padding: '0px 0px', marginBottom: "5px", height: "40px", width: "40px"}} onClick={onDelButtonClick} variant="primary">🗑</Button>
              </td>
              <td>
                <Link to={`/dishes/${dishes.id}`}>
                  <Button>Подробнее</Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default AdminDishesTable