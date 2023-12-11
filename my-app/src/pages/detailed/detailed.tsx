import styles from './detailed.module.scss'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import Breadcrumps from '../../components/breadcrumps';

export type Dish = {
  id: number,
  title: string,
  price: number,
  url: string,
  tag: string,
  status: string,
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
  tag: string,
  url: string,
}

const mockDishes = [
  {
      id: 1,
      title: "бургер",
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


const OrderPage = () => {  
  const params = useParams();
  const id = params.id === undefined ? '' : params.id;

  const [dish, setDish] = useState<Dish>();
  let currentUrl = '/'
  const [linksMap, setLinksMap] = useState<Map<string, string>>(
    new Map<string, string>([['блюда', '/']])
  );
  const fetchDish = async () => {
      try {
          const response = await fetch(`http://127.0.0.1:8000/dishes/${id}`);
          const jsonData = await response.json();
          console.log(jsonData)
          setDish({
              id: Number(jsonData.id),
              title: jsonData.title,
              price: jsonData.price,
              url: jsonData.url,
              tag: jsonData.tag,
              status: jsonData.status,
              weight: jsonData.weight,
              energy_value: jsonData.energy_value,
              content: jsonData.content,
              chef_name: jsonData.chef_name,
              chef_post: jsonData.chef_post,
              chef_url: jsonData.chef_url,
              expiry_date: jsonData.expiry_date
          })
          const newLinksMap = new Map<string, string>(linksMap); // Копирование старого Map
          newLinksMap.set(jsonData.title, '/dishes/' + id);
          setLinksMap(newLinksMap)
      } catch {
          const dish = mockDishes.find(item => item.id === Number(id));
          setDish(dish)
      }
      
      currentUrl += 'dishes/' + id
  };
  useEffect(() => {
      fetchDish();
      // console.log(currentUrl)
  }, []);

  return (
    <div style={{backgroundColor: '#FBAF00', 
        minHeight: '100vh', 
        width: '100%',
        height: '100vh',
        position: 'relative'}}>
      {/* <Header/> */}
      <Breadcrumps links={linksMap}/>
    <div className={styles.fafa}></div>
      <div style={{backgroundColor: 'white', 
          height: '100%', 
          width: '70%', 
          marginLeft: '15%', 
          display: 'flex', 
          flexWrap: 'wrap', 
          justifyContent: 'space-around', 
          position: 'absolute'}}>
       
          <div style={{width: '40%'}}>
            <p style={{textAlign: 'left', borderRadius: '10px'}}>
              <div style={{fontSize: '25px',
                  fontFamily: 'sans-serif',
                  fontWeight: '600',
                  textAlign: 'center',
                  color: 'black',
                  marginBottom: '3%'}}>{dish?.title}</div>
              <img style={{width: '90%',
                  height: '30', 
                  marginTop: '3%', 
                  borderRadius: '15px', 
                  marginLeft: '10%', 
                  backgroundColor: 'white',}} 
                  src={dish?.url} alt="dish"/>
              <div style={{position: 'relative',
                    display: 'flex',
                    width: '80%',
                    margin: '0 auto'}}>
                  <img style={{display: 'inline-block',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    width: '80px',
                    height: '80px',
                    marginTop: '5%'}} src={dish?.chef_url} alt="chef"/>
                  <div>
                      <p style={{position: 'absolute',
                        width: '90%',
                        fontSize: '18px',
                        fontFamily: 'sans-serif',
                        fontWeight: '200',
                        color: '#3c3a3a',
                        textAlign: 'right',
                        fontStyle: 'italic'}}>{dish?.chef_name}
                      </p> 
                      <br /><br />
                      <p style={{position: 'absolute',
                        width: '90%',
                        fontSize: '18px',
                        fontFamily: 'sans-serif',
                        fontWeight: '200',
                        color: '#3c3a3a',
                        textAlign: 'right',
                        fontStyle: 'italic'}}>{dish?.chef_post}</p>
                  </div>
              </div>   
            </p>     
          </div>
          <div style={{width: '23%', marginTop: '3%'}}>
              <div className="weight-section" style={{display: 'flex', justifyContent: 'space-between'}}>
                <span style={{fontSize: '15px',
                  fontFamily: 'sans-serif',
                  fontWeight: '500',
                  color: '#3c3a3a',
                  textAlign: 'left',
                  marginTop: '3%',
                  wordWrap: 'break-word'}}>ВЕС, Г</span>
                <span style={{fontSize: '32px',
                  fontFamily: 'Merriweather',
                  fontWeight: '800',
                  color: '#FBAF00',
                  textAlign: 'right'}}>{dish?.weight}</span>
              </div>
              <div style={{marginBottom: '10%', marginTop: '10%', borderBottom: '1px solid #FBAF00'}}></div> 
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <span style={{fontSize: '15px',
                  fontFamily: 'sans-serif',
                  fontWeight: '500',
                  color: '#3c3a3a',
                  textAlign: 'left',
                  marginTop: '3%',
                  wordWrap: 'break-word'}}>ЦЕНА, $</span>
                <span style={{fontSize: '32px',
                  fontFamily: 'Merriweather',
                  fontWeight: '800',
                  color: '#FBAF00',
                  textAlign: 'right'}}>{dish?.price}</span>
              </div>
              <div style={{marginBottom: '10%', marginTop: '10%', borderBottom: '1px solid #FBAF00'}}></div> 
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <span style={{fontSize: '15px',
                  fontFamily: 'sans-serif',
                  fontWeight: '500',
                  color: '#3c3a3a',
                  textAlign: 'left',
                  marginTop: '3%',
                  wordWrap: 'break-word'}}>ЭНЕРГЕТИЧЕСКАЯ ЦЕННОСТЬ, ККАЛ/100 Г</span>
                <span style={{fontSize: '32px',
                  fontFamily: 'Merriweather',
                  fontWeight: '800',
                  color: '#FBAF00',
                  textAlign: 'right'}}>{dish?.energy_value}</span>
              </div>
              <div style={{marginBottom: '10%', marginTop: '10%', borderBottom: '1px solid #FBAF00'}}></div> 
              <span style={{fontSize: '15px',
                  fontFamily: 'sans-serif',
                  fontWeight: '500',
                  color: '#3c3a3a',
                  textAlign: 'left',
                  marginTop: '3%',
                  wordWrap: 'break-word'}}>СРОК ГОДНОСТИ</span>
              <div style={{marginBottom: '5%', marginTop: '5%', borderBottom: '1px solid #635f5f'}}></div>
              <span style={{fontSize: '15px',
                  fontFamily: 'sans-serif',
                  fontWeight: '500',
                  color: '#3c3a3a',
                  textAlign: 'left',
                  marginTop: '3%',
                  wordWrap: 'break-word'}}>{dish?.expiry_date}</span>
          </div>
          <div style={{width: '23%', marginTop: '3%'}}>
              <div>
                <span style={{fontSize: '15px',
                  fontFamily: 'sans-serif',
                  fontWeight: '500',
                  color: '#3c3a3a',
                  textAlign: 'left',
                  marginTop: '3%',
                  wordWrap: 'break-word'}}>СОСТАВ</span>
                <div style={{marginBottom: '10%', marginTop: '10%', borderBottom: '1px solid #FBAF00'}}></div> 
                <span style={{fontSize: '15px',
                  fontFamily: 'sans-serif',
                  fontWeight: '500',
                  color: '#3c3a3a',
                  textAlign: 'left',
                  marginTop: '3%',
                  wordWrap: 'break-word'}}>{dish?.content}</span>
              </div>
          </div>
      </div>
    </div>
  );
}

export default OrderPage;
