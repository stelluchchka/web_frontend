// import styles from './detailed.module.scss'
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Breadcrumps from '../../components/breadcrumps';
import {useDispatch} from "react-redux";
import { useDish, useLinksMapData, setLinksMapDataAction } from '../../slices/detailedSlice';
import styles from './edit_dish.module.scss'

import axios from 'axios';
import { Button } from 'react-bootstrap';

interface PicData {
  pic?: File;
  chef_pic?: File; 
}

const EditDishPage = () => {  
  const dispatch = useDispatch();
  const dish = useDish();
  console.log(dish)
  const params = useParams();
  const id = params.id === undefined ? '' : Number(params.id);
  const linksMap = useLinksMapData();
  const navigate = useNavigate();
  const [titleValue, setTitleValue] = useState(dish.title);
  const [dict, setDict] = useState<PicData>({
    pic: undefined,
    chef_pic: undefined
  })
  const [chef_nameValue, setChef_nameValue] = useState(dish.chef_name);
  const [chef_postValue, setChef_postValue] = useState(dish.chef_post);
  const [weightValue, setWeightValue] = useState(dish.weight);
  const [priceValue, setPriceValue] = useState(dish.price);
  const [energyValue, setEnergyValue] = useState(dish.energy_value);
  const [dateValue, setDateValue] = useState(dish.expiry_date);
  const [contentValue, setContentValue] = useState(dish.content);
  const [tagValue, setTagValue] = useState(dish.tag);

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

  const editDish = async () => {
    try {
      const formData = new FormData();
      formData.append('title', titleValue);
      formData.append('price', String(priceValue));
      formData.append('weight', String(weightValue));
      formData.append('energy_value', String(energyValue));
      formData.append('content', contentValue);
      formData.append('chef_name', chef_nameValue);
      formData.append('chef_post', chef_postValue);
      formData.append('status', "есть");
      formData.append('expiry_date', dateValue);
      if (dict.chef_pic)
        formData.append('chef_pic', dict.chef_pic)
      if (dict.pic)
        formData.append('pic', dict.pic)
      formData.append('tags', tagValue);

      await axios.put(`http://localhost:8000/dishes/${id}`, formData, {
          method: 'PUT',
          withCredentials: true,
      })
      navigate("/dishes")
    }
    catch(error) {
      throw error;
    }
  }

  const handleEditButtonClick = () => {
    editDish()
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
              <div >
              <p style={{fontSize: '18px', fontFamily: 'sans-serif'}}>фото повара:</p>
              <input type="file" onChange={e=>{
                if (e.target.files && e.target.files.length > 0) {
                  const new_dict = { 
                    ...dict,
                    ['chef_pic']: e.target.files[0]
                  };
                  setDict(new_dict);
                }
              }}/>
            </div>
          </div>
          <div className= {styles['title']} >Информация о блюде </div>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <div style={{marginRight:'40%'}}>
              <input value={titleValue} placeholder='название блюда' name="title" onChange={e => setTitleValue(e.target.value)} className={styles['dish-chef-p']} style={{textAlign: 'left', width:'25%', fontWeight: '600'}}/><br/><br/>
              <input value={tagValue} placeholder='тег' name="tag" onChange={e => setTagValue(e.target.value)} className={styles['dish-chef-p']} style={{textAlign: 'left', width:'25%'}}/>
            </div>              
            <div> 
              <p style={{fontSize: '18px', fontFamily: 'sans-serif'}}>фото блюда:</p>
              <input type="file" onChange={e=>{
                if (e.target.files && e.target.files.length > 0) {
                  const new_dict = { 
                    ...dict,
                    ['pic']: e.target.files[0]
                  };
                  setDict(new_dict);
                }
              }}/>            
              </div>
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
