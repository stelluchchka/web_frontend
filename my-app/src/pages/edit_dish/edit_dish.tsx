// import styles from './detailed.module.scss'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumps from '../../components/breadcrumps';
import {useDispatch} from "react-redux";
import { useDish, useLinksMapData, setLinksMapDataAction } from '../../slices/detailedSlice';
import styles from './edit_dish.module.scss'

import axios from 'axios';
import { Button } from 'react-bootstrap';

const EditDishPage = () => {  
  const dispatch = useDispatch();
  const dish = useDish();
  console.log(dish)
  const params = useParams();
  const id = params.id === undefined ? '' : Number(params.id);
  const linksMap = useLinksMapData();
  const [titleValue, setTitleValue] = useState(dish.title);
  const [urlValue, setUrlValue] = useState(dish.url);
  const [chefUrlValue, setChefUrlValue] = useState(dish.chef_url);
  const [chef_nameValue, setChef_nameValue] = useState(dish.chef_name);
  const [chef_postValue, setChef_postValue] = useState(dish.chef_post);
  const [weightValue, setWeightValue] = useState(dish.weight);
  const [priceValue, setPriceValue] = useState(dish.price);
  const [energyValue, setEnergyValue] = useState(dish.energy_value);
  const [dateValue, setDateValue] = useState(dish.expiry_date);
  const [contentValue, setContentValue] = useState(dish.content);

  const getDish = async () => {
      try {
          const response = await axios.get(`http://127.0.0.1:8000/dishes/${id}`);
          console.log(response.data)
          const newLinksMap = new Map<string, string>(linksMap);
          newLinksMap.set("Изменить блюдо " + response.data.title, '/dishes/' + id);
          dispatch(setLinksMapDataAction(newLinksMap))
        } catch(error) {
          throw error
        }
  };

  useEffect(() => {
      getDish();
  }, []);

  const handleEditButtonClick = () => {
    console.log("1")
  }
  return (
    <div className={styles['body']}>
      <Breadcrumps links={linksMap}/>
      <div className={styles['container']}> 
        <div>
          <div className= {styles['title']} >Информация о поваре </div>   
          <div style={{display: 'flex', justifyContent: 'center', marginBottom: '5%'}}>
            <div style={{marginRight:'40%'}}>
              <input value={chef_nameValue} placeholder='имя повара' name="chef_post" onChange={e => setChef_nameValue(e.target.value)} className={styles['dish-chef-p']} style={{textAlign: 'left', width:'35%'}}/> <br/><br/>
              <input value={chef_postValue} placeholder='пост повара' name="chef_post" onChange={e => setChef_postValue(e.target.value)} className={styles['dish-chef-p']} style={{textAlign: 'left', width:'35%'}}/>
            </div>
              {/* <div >
              <p style={{fontSize: '18px', fontFamily: 'sans-serif'}}>фото повара:</p>
              <input type="file" value={dish.chef_url} onChange={e=>setChefUrlValue(e.target.value)}/>
            </div> */}
          </div>
          <div className= {styles['title']} >Информация о блюде </div>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <input value={titleValue} placeholder='название блюда' name="title" className={styles['title']} onChange={e => setTitleValue(e.target.value)} style={{marginRight:'10%', fontSize: '20px', height: '40px', width: '40%', fontWeight: '400'}}/>
              {/* <div> 
              <p style={{fontSize: '18px', fontFamily: 'sans-serif'}}>фото блюда:</p>
              <input type="file" value={dish.url} onChange={e=>setUrlValue(e.target.value)}/><br/><br/>
            </div> */}

          </div>
          <br/>
        </div> 

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
            onClick={() => handleEditButtonClick()}>
              Изменить!
          </Button>
        </div>
      </div>


      </div>
    </div>
  );
}

export default EditDishPage;
