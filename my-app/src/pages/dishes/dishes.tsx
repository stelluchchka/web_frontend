import React from 'react';
import { ChangeEvent } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import OneCard from '../../components/card';
import styles from './dishes.module.scss';
import Breadcrumps from '../../components/breadcrumps';
import axios from 'axios';
import { toast } from 'react-toastify';
import {useDispatch} from "react-redux";
import {useTitleValue, useDishes, setTitleValueAction, setDishesAction, setMinPriceValueAction, 
    setMaxPriceValueAction, useMaxPriceValue, useMinPriceValue, useTagValue, setTagValueAction} from "../../slices/mainSlice";
import { useLinksMapData, setLinksMapDataAction } from '../../slices/detailedSlice';
import { setCurrentOrderIdAction, setDishesFromOrderDataAction, setOrderDateAction, useCurrentOrderId } from '../../slices/orderSlice';


export type Dish = {
    id: number,
    title: string,
    price: number,
    url: string,
    tags: string,
}

export type ReceivedUserData = {
    id: number,
    email: string,
    first_name: string,
    last_name: string,
    password: string,
    is_superuser: boolean,
}
const tags = [ 
    {
        key: "tag",
        value: "тег"
    },
     {
        key: "hot",
        value: "остро"
    },
    {
        key: "veg",
        value: "вег"
    }
]
const mockDishes = [
    {
        id: 1,
        title: "бургер99",
        price: 100,
        url: "https://png.pngtree.com/png-clipart/20190921/original/pngtree-hand-drawn-delicious-burger-illustration-png-image_4752009.jpg",
        tags: "вег"
    },
    {
        id: 2,
        title: "сок",
        price: 200,
        url: "https://madeindream.com/image/data/statya/sravnenie-domashnego-soka-i-pokupnogo/mid-komissiya-sok-iz-magazina-1-big.png",
        tags: "остро"
    },
    {
        id: 3,
        title: "бургер1",
        price: 300,
        url: "https://png.pngtree.com/png-clipart/20190921/original/pngtree-hand-drawn-delicious-burger-illustration-png-image_4752009.jpg",
        tags: "вег"
    },
    {
        id: 4,
        title: "бургер2",
        price: 400,
        url: "https://png.pngtree.com/png-clipart/20190921/original/pngtree-hand-drawn-delicious-burger-illustration-png-image_4752009.jpg",
        tags: "вег"
    },
    {
        id: 5,
        title: "сок2",
        price: 500,
        url: "https://madeindream.com/image/data/statya/sravnenie-domashnego-soka-i-pokupnogo/mid-komissiya-sok-iz-magazina-1-big.png",
        tags: "остро"
    }
]

interface DishesFromOrder {
    id: number;
    title: string;
    price: number;
    tag: string;
    url: string;
    quantity: number;
}

const DishesPage: React.FC = () => {
    const dispatch = useDispatch()
    const dishes = useDishes();
    const tagValue = useTagValue();
    const titleValue = useTitleValue();
    const minPriceValue = useMinPriceValue();
    const maxPriceValue = useMaxPriceValue();
    const linksMap = useLinksMapData();
    const order_id = useCurrentOrderId()

    React.useEffect(() => {
        dispatch(setLinksMapDataAction(new Map<string, string>([
            ['Блюда  ', '/dishes']
        ])))
        getDishes()
        if (order_id == -1) {
            setOrderId();
        }
        if (order_id != -1)
            getDishesFromOrder()
    }, [])

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
            const jsonData = await response.data;
            const newArr = jsonData.dishes.map((raw: Dish) => ({
                id: raw.id,
                title: raw.title,
                price: raw.price,
                tags: raw.tags,
                url: raw.url,
            }))
            dispatch(setDishesAction(newArr));
        }
        catch {
            console.log("запрос не прошел !")
            if (tagValue && tagValue !== 'тег') {
                const filteredArray = mockDishes.filter(mockDishes => mockDishes.tags === tagValue);
                dispatch(setDishesAction(filteredArray));
            } else if (titleValue) {
                const filteredArray = mockDishes.filter(mockDishes => mockDishes.title.includes(titleValue));
                dispatch(setDishesAction(filteredArray));
            } else if (minPriceValue) {
                const filteredArray = mockDishes.filter(mockDishes => mockDishes.price >= minPriceValue);
                dispatch(setDishesAction(filteredArray));
            } else if (maxPriceValue) {
                const filteredArray = mockDishes.filter(mockDishes => mockDishes.price <= maxPriceValue);
                dispatch(setDishesAction(filteredArray));
            }
            else {
                dispatch(setDishesAction(mockDishes));
            }
        }
    };

    const getDishesFromOrder = async () => {
    try {
        const order_response = await axios(`http://localhost:8000/orders/${order_id}`, {
          method: 'GET',
          withCredentials: true,
        })

        const newDishesFromOrderDataArr = order_response.data.dishes.map((raw: DishesFromOrder) => ({
            id: raw.id,
            title: raw.title,
            price: raw.price,
            tag: raw.tag,
            url: raw.url,
            quantity: raw.quantity,
        }));
        dispatch(setDishesFromOrderDataAction(newDishesFromOrderDataArr))
      } catch(error) {
        throw error;
      }
    }

    const setOrderId = async () => {
        const response = await axios('http://localhost:8000/dishes', {
            method: 'GET',
            withCredentials: true 
        });
        if (response.data.order.id) {
            const order_id = response.data.order.id
            dispatch(setCurrentOrderIdAction(order_id))
        }
    }

    const postDishToOrder = async (id: number) => {
        try {
            const response = await axios(`http://localhost:8000/dishes/${id}/post`, {
                method: 'POST',
                withCredentials: true,
            })

            toast.success("Блюдо успешно добавлено в заказ!");
            getDishes()
            if (order_id == -1) {
                setOrderId();
            }
            if (order_id != -1)
                getDishesFromOrder()
            dispatch(setOrderDateAction(response.data.created_at))
        } catch {
            toast.error("Это блюдо уже добавлено в заказ!");
        }
    }

    const handleSearchButtonClick = () => {
        getDishes();
    }

    const handleTitleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(setTitleValueAction(event.target.value));
    };

    const handleMinPriceValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(setMinPriceValueAction(Number(event.target.value)));
    };

    const handleMaxPriceValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(setMaxPriceValueAction(Number(event.target.value)));
    };

    const handleTagSelect = (eventKey: string | null) => {
        if (eventKey) {
          const selectedTag = tags.find(tag => tag.key === eventKey);
          if (selectedTag) {
            dispatch(setTagValueAction(selectedTag.value));
          }
        }
    };
    return (
        <div className={styles.main_page}>
            <Breadcrumps links={linksMap}></Breadcrumps>
            <div className={styles["hat"]}>
                <h5 className={styles["header__logo"]}>**логотип</h5>
                <h1 className={styles["header__title"]}>
                ЗАЯВКИ ДЛЯ ПОВАРОВ В БЫСТРОМ ПИТАНИИ
                </h1>
                <h4 className={styles["header__slogan"]}>
                нереально крутой слоган
                </h4>
                    <div style={{display: 'flex', justifyContent: 'center' }}>
                            <Form.Group controlId="name">
                                <Form.Control type="text" placeholder="название" style={{ width: '95%', borderRadius: '10px 0px 0px 10px', height: '60px', fontSize: '18px', border: 'none', marginRight: '5px'}} onChange={handleTitleValueChange}/>
                            </Form.Group>
                            <Form.Group controlId="tag">
                                <Dropdown onSelect={handleTagSelect}>
                                    <Dropdown.Toggle style={{
                                        height: '60px',
                                        backgroundColor: "#ffff",
                                        color: '#827e7e',   //gray
                                        width: '95%',
                                        textAlign: 'left',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        borderRadius: '0 0 0 0',
                                        marginRight: '5px'
                                    }}
                                    variant="success"
                                    id="dropdown-basic">
                                        {tagValue || "тег"}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu style={{
                                        width: '16%',
                                        textAlign: 'left',
                                        textDecoration: 'none'
                                    }}>
                                        {tags.map(tag => (
                                            <Dropdown.Item key={tag.key} eventKey={tag.key}
                                            style={{display: 'block', backgroundColor: 'white', color: '#827e7e'}}>
                                                {tag.value}
                                            </Dropdown.Item>
                                        ))}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Form.Group>
                            <Form.Group controlId="min_price">
                                <Form.Control type="text" placeholder="цена от" style={{ width: '95%', borderRadius: '0px 0px 0px 0px', height: '60px', fontSize: '18px', border: 'none', marginRight: '5px' }} onChange={handleMinPriceValueChange}/>
                            </Form.Group>
                            <Form.Group controlId="max_price">
                                <Form.Control type="text" placeholder="цена до" style={{borderRadius: '0 10px 10px 0', width: '95%', height: '60px', fontSize: '18px', border: 'none' }} onChange={handleMaxPriceValueChange}/>
                            </Form.Group>
                            <Button variant="primary" type="submit" style={{color: 'white', 
                                    backgroundColor: '#f53100',
                                    border: 'none',
                                    height: '60px', 
                                    fontSize: '20px',
                                    borderRadius: '10px 10px 10px 10px',
                                    width: '18%', 
                                    marginLeft: '20px',
                                    fontFamily: 'sans-serif'}} 

                            onClick={() => handleSearchButtonClick()}>
                                Поиск
                            </Button>
                    </div>
                    <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'left', width: '100%', margin: '0 auto'}}>
                        {dishes.map((dish: Dish) => (
                            <OneCard key={dish.id} id={dish.id} url={dish.url} title={dish.title} tags={dish.tags} price={Number(dish.price)} onButtonClick={() => postDishToOrder(dish.id)}></OneCard>
                        ))}
                    </div>
                {dishes.length === 0 && <p className="dish-text"> <big>таких блюд у нас нет🥹</big></p>}
            </div>
        </div>
     )
};
  
export default DishesPage;