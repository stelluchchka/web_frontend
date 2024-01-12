import React from 'react'
import styles from './AdminDishesTable.module.scss'
import Table from 'react-bootstrap/Table';
import cn from 'classnames';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { setDishAction, useDish } from '../../slices/detailedSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setDishesAction, useMaxPriceValue, useMinPriceValue, useTagValue, useTitleValue } from '../../slices/mainSlice';


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
};

const AdminDishesTable: React.FC<DishesTableProps> = ({dishes, className}) => {
  const navigate = useNavigate()
  const dish = useDish()
  const dispatch = useDispatch()
  const tagValue = useTagValue();
  const titleValue = useTitleValue();
  const minPriceValue = useMinPriceValue();
  const maxPriceValue = useMaxPriceValue();


  const handleDeleteButton = async (id: number) => {
    try {
        await axios(`http://localhost:8000/dishes/${id}`, {
            method: 'DELETE',
            withCredentials: true,
        })
        getDishes();
      }
    catch(error) {
        throw error;
    }
}

const getDishes = async () => {
  let url = 'http://127.0.0.1:8000/dishes'
  url += `?title=${titleValue}`
  url += `&max_price=${maxPriceValue}`
  url += `&min_price=${minPriceValue}`
  url += `&tag=${tagValue}`
  console.log(url)
  try {
      const response = await axios(url, {
          method: 'GET',
          withCredentials: true 
      });
      const newArr = response.data.dishes.map((raw: Dish) => ({
          id: raw.id,
          title: raw.title,
          price: raw.price,
          tags: raw.tags,
          url: raw.url,
          chef_post: raw.chef_post
      }))
      console.log(newArr)
      dispatch(setDishesAction(newArr));
  } catch(error) {
    throw error
  }
};

const handlePutButton = async (id: number) => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/dishes/${id}`);
        console.log(response.data)
        dispatch(setDishAction({
            id: Number(response.data.id),
            title: response.data.title,
            price: response.data.price,
            url: response.data.url,
            tag: response.data.tags,
            weight: response.data.weight,
            energy_value: response.data.energy_value,
            content: response.data.content,
            chef_name: response.data.chef_name,
            chef_post: response.data.chef_post,
            chef_url: response.data.chef_url,
            expiry_date: response.data.expiry_date
        }))
        console.log(dish)
        if(dish)
          navigate(`/edit_dish/${id}`)
      } catch(error) {
        throw error
      }
}
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
                <Button style={{padding: '0px 0px', marginBottom: "5px", marginRight: "5px", height: "40px", width: "40px"}} onClick={() => handlePutButton(dishes.id)} variant="primary">✏️</Button>
                <Button style={{padding: '0px 0px', marginBottom: "5px", height: "40px", width: "40px"}} onClick={() => handleDeleteButton(dishes.id)} variant="primary">🗑</Button>
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