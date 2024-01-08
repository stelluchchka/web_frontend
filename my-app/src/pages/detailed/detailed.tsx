// import styles from './detailed.module.scss'
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Breadcrumps from '../../components/breadcrumps';
import {useDispatch} from "react-redux";
import { useDish, setDishAction, useLinksMapData, setLinksMapDataAction } from '../../slices/detailedSlice';
import styles from './detailed.module.scss'

import axios from 'axios';
import { Button } from 'react-bootstrap';

export type Dish = {
  id: number,
  title: string,
  price: number,
  url: string,
  tag: string,
  weight: number,
  energy_value: number,
  content: string,
  chef_name: string,
  chef_post: string,
  chef_url: string,
  expiry_date: string
}

export type ReceivedDishData = {
  id: number,
  title: string,
  price: number,
  tags: string,
  url: string,
}

const mockDishes = [
  {
      id: 1,
      title: "бургер99",
      price: 100,
      url: "https://png.pngtree.com/png-clipart/20190921/original/pngtree-hand-drawn-delicious-burger-illustration-png-image_4752009.jpg",
      tag: "блюдо",
      status: "есть",
      weight: 100,
      energy_value: 1,
      content: "dd",
      chef_name: "иван",
      chef_post: "кондитер",
      chef_url: "https://madeindream.com/image/data/statya/sravnenie-domashnego-soka-i-pokupnogo/mid-komissiya-sok-iz-magazina-1-big.png",
      expiry_date: "12 суток"
  },
  {
      id: 2,
      title: "сок",
      price: 200,
      url: "https://png.pngtree.com/png-clipart/20190921/original/pngtree-hand-drawn-delicious-burger-illustration-png-image_4752009.jpg",
      tag: "напиток",
      status: "есть",
      weight: 100,
      energy_value: 1,
      content: "dd",
      chef_name: "иван",
      chef_post: "кондитер",
      chef_url: "https://madeindream.com/image/data/statya/sravnenie-domashnego-soka-i-pokupnogo/mid-komissiya-sok-iz-magazina-1-big.png",
      expiry_date: "12 суток"
  },
  {
      id: 3,
      title: "бургер1",
      price: 300,
      url: "https://png.pngtree.com/png-clipart/20190921/original/pngtree-hand-drawn-delicious-burger-illustration-png-image_4752009.jpg",
      tag: "блюдо",
      status: "есть",
      weight: 100,
      energy_value: 1,
      content: "dd",
      chef_name: "анна",
      chef_post: "шеф",
      chef_url: "https://velobaza.ru/upload/medialibrary/6fe/gornii_velosiped_3.jpg",
      expiry_date: "12 суток"
  },
  {
      id: 4,
      title: "бургер2",
      price: 400,
      url: "https://png.pngtree.com/png-clipart/20190921/original/pngtree-hand-drawn-delicious-burger-illustration-png-image_4752009.jpg",
      tag: "блюдо",
      status: "есть",
      weight: 100,
      energy_value: 1,
      content: "dd",
      chef_name: "анна",
      chef_post: "шеф",
      chef_url: "https://madeindream.com/image/data/statya/sravnenie-domashnego-soka-i-pokupnogo/mid-komissiya-sok-iz-magazina-1-big.png",
      expiry_date: "12 суток"
  },
  {
      id: 5,
      title: "сок2",
      price: 500,
      url: "https://png.pngtree.com/png-clipart/20190921/original/pngtree-hand-drawn-delicious-burger-illustration-png-image_4752009.jpg",
      tag: "напиток",
      status: "есть",
      weight: 100,
      energy_value: 1,
      content: "dd",
      chef_name: "анна",
      chef_post: "шеф",
      chef_url: "https://madeindream.com/image/data/statya/sravnenie-domashnego-soka-i-pokupnogo/mid-komissiya-sok-iz-magazina-1-big.png",
      expiry_date: "12 суток"
  }
]

const DetailesPage = () => {  
  const dispatch = useDispatch();
  const dish = useDish();
  const params = useParams();
  const id = params.id === undefined ? '' : Number(params.id);
  const linksMap = useLinksMapData();
  const navigate = useNavigate();
  const [titleValue, setTitleValue] = useState('');
  const [urlValue, setUrlValue] = useState('');
  const [chefUrlValue, setChefUrlValue] = useState('');
  const [chef_nameValue, setChef_nameValue] = useState('');
  const [chef_postValue, setChef_postValue] = useState('');
  const [weightValue, setWeightValue] = useState(0);
  const [priceValue, setPriceValue] = useState(0);
  const [energyValue, setEnergyValue] = useState(0);
  const [dateValue, setDateValue] = useState('');
  const [contentValue, setContentValue] = useState('');


  const getDish = async () => {
      try {
          const response = await axios.get(`http://127.0.0.1:8000/dishes/${id}`);
          const jsonData = await response.data;
          dispatch(setDishAction({
              id: Number(jsonData.id),
              title: jsonData.title,
              price: jsonData.price,
              url: jsonData.url,
              tag: jsonData.tag,
              weight: jsonData.weight,
              energy_value: jsonData.energy_value,
              content: jsonData.content,
              chef_name: jsonData.chef_name,
              chef_post: jsonData.chef_post,
              chef_url: jsonData.chef_url,
              expiry_date: jsonData.expiry_date
          }))
          const newLinksMap = new Map<string, string>(linksMap); 
          if (id == 0)
            newLinksMap.set("Новое блюдо", '/dishes/' + id);
          else
            newLinksMap.set(jsonData.title, '/dishes/' + id);
          dispatch(setLinksMapDataAction(newLinksMap))
      } catch {
          const dish = mockDishes.find(item => item.id === Number(id));
          if (dish) {
            dispatch(setDishAction(dish))
          }
      }
  };

  useEffect(() => {
      getDish();
  }, []);

  const createDish = async () => {
    try {
      const formData = new FormData();
      formData.append('title', titleValue);
      formData.append('price', String(priceValue));
      formData.append('weight', String(weightValue));
      formData.append('energy_value', String(energyValue));
      formData.append('content', contentValue);
      formData.append('chef_name', chef_nameValue);
      formData.append('pic', urlValue);
      formData.append('chef_post', chef_postValue);
      formData.append('chef_pic', chefUrlValue);
      formData.append('status', "есть");
      formData.append('expiry_date', dateValue);

      await axios.post(`http://localhost:8000/dishes/`, formData, {
          method: 'POST',
          withCredentials: true,
      })
      navigate("/dishes")
    }
    catch(error) {
      throw error;
    }
  }

  const handleCreateButtonClick = () => {
    createDish()
  }
  return (
    <div className={styles['body']}>
      <Breadcrumps links={linksMap}/>
      <div className={styles['container']}> 
        { id == 0 && 
        <div>
          <div className= {styles['title']} >Информация о поваре </div>   
          <div style={{display: 'flex', justifyContent: 'center', marginBottom: '5%'}}>
            <div style={{marginRight:'40%'}}>
              <input value={chef_nameValue} placeholder='имя повара' name="chef_post" onChange={e => setChef_nameValue(e.target.value)} className={styles['dish-chef-p']} style={{textAlign: 'left', width:'25%'}}/> <br/><br/>
              <input value={chef_postValue} placeholder='пост повара' name="chef_post" onChange={e => setChef_postValue(e.target.value)} className={styles['dish-chef-p']} style={{textAlign: 'left', width:'25%'}}/>
            </div>
            <div >
              <p style={{fontSize: '18px', fontFamily: 'sans-serif'}}>фото повара:</p>
              <input type="file" value={chefUrlValue} onChange={e=>setChefUrlValue(e.target.value)}/>
            </div>
          </div>
          <div className= {styles['title']} >Информация о блюде </div>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <input value={titleValue} placeholder='название блюда' name="title" className={styles['title']} onChange={e => setTitleValue(e.target.value)} style={{marginRight:'10%', fontSize: '20px', height: '40px', width: '40%', fontWeight: '400'}}/>
            <div> 
              <p style={{fontSize: '18px', fontFamily: 'sans-serif'}}>фото блюда:</p>
              <input type="file" value={urlValue} onChange={e=>setUrlValue(e.target.value)}/><br/><br/>
            </div>
          </div>
          <br/>
        </div>
        }
        {id != 0 ?
          <div className={styles['content-container']}>
            <div style={{width: '40%'}}>
              <div className={styles['title']}>{dish?.title}</div>
              <img className={styles['dish-img']} src={dish?.url} alt="dish"/>
              <div className={styles['dish-chef-div']}> 
                <img className= {styles['dish-chef-img']} src={dish?.chef_url} alt="chef"/>
                <div>
                  <p className={styles['dish-chef-p']}> {dish?.chef_name} </p>
                  <div><br /><br /><p className={styles['dish-chef-p']}>{dish?.chef_post}</p></div>
                </div>
              </div>   
            </div>
            <div style={{width: '23%', marginTop: '3%'}}>
              <div className={styles['weight-section']} style={{display: 'flex', justifyContent: 'space-between'}}>
                <span className={styles['dish-text']}>ВЕС, Г</span>
                <span className={styles['dish-digit']}>{dish?.weight}</span>
              </div>
              <div className={styles['line']}></div> 
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <span className={styles['dish-text']}>ЦЕНА, ₽</span>
                <span className={styles['dish-digit']}>{dish?.price}</span>
              </div>
              <div className={styles['line']}></div> 
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <span className={styles['dish-text']}>ЭНЕРГЕТИЧЕСКАЯ ЦЕННОСТЬ, ККАЛ/100 Г</span>
                <span className={styles['dish-digit']}>{dish?.energy_value}</span>
              </div>
              <div className={styles['line']}></div> 
              <span className={styles['dish-text']}>СРОК ГОДНОСТИ</span>
              <div className={styles['gray-line']}></div>
              <span className={styles['dish-text']}>{dish?.expiry_date}</span>
            </div>
            <div style={{width: '23%', marginTop: '3%'}}>
              <div>
                <span className={styles['dish-text']}>СОСТАВ</span>
                <div className={styles['line']}></div> 
                <span className={styles['dish-text']}>{dish?.content}</span>
              </div>
            </div>
          </div>
        :
        <div>
          <div style={{display:'flex', flex: 'space-around'}}>
          <div style={{width: '45%', marginLeft: '10%'}}>
            <div className={styles['weight-section']} style={{display: 'flex', justifyContent: 'space-between'}}>
              <span className={styles['dish-text']}>ВЕС, Г</span>
              <input value={weightValue} type="number" step="50" name="weight" className={styles['dish-digit']} onChange={e => setWeightValue(Number(e.target.value))} style={{width: '80px'}}/>
            </div>
            <div className={styles['line']}></div> 
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <span className={styles['dish-text']}>ЦЕНА, ₽</span>
              <input value={priceValue} type="number" step="50" name="price" className={styles['dish-digit']} onChange={e => setPriceValue(Number(e.target.value))} style={{width: '80px'}}/>
            </div>
            <div className={styles['line']}></div> 
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <span className={styles['dish-text']}>ЭНЕРГЕТИЧЕСКАЯ ЦЕННОСТЬ,<br/>ККАЛ/100 Г</span>
              <input value={energyValue} type="number" step="50" name="energy" className={styles['dish-digit']} onChange={e => setEnergyValue(Number(e.target.value))} style={{width: '80px'}}/>
            </div>
            <div className={styles['line']}></div> 
            <span className={styles['dish-text']}>СРОК ГОДНОСТИ</span>
            <input value={dateValue} placeholder='введите срок годности..' name="date" onChange={e => setDateValue(e.target.value)} className={styles['input']}  style={{marginTop: '4%'}}/>
          </div>
          <div style={{width: '35%', marginLeft: '5%'}}>
            <div>
              <span className={styles['dish-text']}>СОСТАВ</span>
              <textarea value={contentValue} placeholder='введите состав блюда..' name="content" onChange={e => setContentValue(e.target.value)} className={styles['input']} style={{height: '300px'}}/>
            </div>
          </div>
        </div>
        <div style={{textAlign: 'right', marginRight: '5%', marginTop: '1%'}}>
          <Button variant="primary" type="submit" style={{color: 'white', 
            backgroundColor: '#f53100',
            border: 'none',
            height: '40px', 
            fontSize: '20px',
            borderRadius: '10px 10px 10px 10px',
            width: '20%', 
            fontFamily: 'sans-serif'}} 
            onClick={() => handleCreateButtonClick()}>
              Создать!
          </Button>
        </div>
      </div>
        }
      </div>
    </div>
  );
}

export default DetailesPage;
