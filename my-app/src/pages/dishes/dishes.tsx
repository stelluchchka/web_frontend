import React, { ChangeEvent } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
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
import { useUser } from '../../slices/authSlice';
import { Link } from 'react-router-dom';
import AdminDishesTable from '../../components/AdminDishesTable';


export type Dish = {
    id: number,
    title: string,
    price: number,
    url: string,
    tags: string,
    chef_post: string
}

export type ReceivedUserData = {
    id: number,
    email: string,
    first_name: string,
    last_name: string,
    password: string,
    is_superuser: boolean,
}
// const tags = [ 
//     {
//         key: "tag",
//         value: "тег"
//     },
//      {
//         key: "hot",
//         value: "остро"
//     },
//     {
//         key: "veg",
//         value: "вег"
//     }
// ]
const mockDishes = [
    {
        id: 1,
        title: "бургер99",
        price: 100,
        url: "https://png.pngtree.com/png-clipart/20190921/original/pngtree-hand-drawn-delicious-burger-illustration-png-image_4752009.jpg",
        tags: "вег",
        chef_post: "aa"
    },
    {
        id: 2,
        title: "сок",
        price: 200,
        url: "https://madeindream.com/image/data/statya/sravnenie-domashnego-soka-i-pokupnogo/mid-komissiya-sok-iz-magazina-1-big.png",
        tags: "остро",
        chef_post: "aa"
    },
    {
        id: 3,
        title: "бургер1",
        price: 300,
        url: "https://png.pngtree.com/png-clipart/20190921/original/pngtree-hand-drawn-delicious-burger-illustration-png-image_4752009.jpg",
        tags: "вег",
        chef_post: "aa"
    },
    {
        id: 4,
        title: "бургер2",
        price: 400,
        url: "https://png.pngtree.com/png-clipart/20190921/original/pngtree-hand-drawn-delicious-burger-illustration-png-image_4752009.jpg",
        tags: "вег",
        chef_post: "aa"
    },
    {
        id: 5,
        title: "сок2",
        price: 500,
        url: "https://madeindream.com/image/data/statya/sravnenie-domashnego-soka-i-pokupnogo/mid-komissiya-sok-iz-magazina-1-big.png",
        tags: "остро",
        chef_post: "aa"
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
    const order_id = useCurrentOrderId();
    const user = useUser();

    React.useEffect(() => {
        dispatch(setLinksMapDataAction(new Map<string, string>([
            ['Блюда  ', '/dishes']
        ])))
        getDishes()
        if (order_id == -1) {
            setOrderId();
        }
        if (order_id != -1)
            getDishesFromOrder(order_id)
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

    const getDishesFromOrder = async (id: number) => {
        try {
            const order_response = await axios(`http://localhost:8000/orders/${id}`, {
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
        } 
        catch(error) {
            throw error;
        }
    }

    const setOrderId = async () => {
        const response = await axios('http://localhost:8000/dishes', {
            method: 'GET',
            withCredentials: true 
        });
        if (response.data.order.id) {
            const id = response.data.order.id
            dispatch(setCurrentOrderIdAction(id))
        }
    }

    const postDishToOrder = async (id: number) => {
        try {
            const response = await axios(`http://localhost:8000/dishes/${id}/post`, {
                method: 'POST',
                withCredentials: true,
            })
            toast.success("Блюдо успешно добавлено в заказ!");
            dispatch(setCurrentOrderIdAction(response.data.id))
            dispatch(setOrderDateAction(response.data.created_at))  
            setOrderId()
            if (order_id != -1) {
                getDishesFromOrder(order_id)
            } 
            else 
                getDishesFromOrder(response.data.id)
        }
        catch(error) {
            throw error;
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

    const handleTagValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        // if (eventKey) {
        //   const selectedTag = tags.find(tag => tag.key === eventKey);
        //   if (selectedTag) {
        //     dispatch(setTagValueAction(selectedTag.value));
        //   }
        // }
        dispatch(setTagValueAction(event.target.value));
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
                                <Form.Control value={titleValue} type="text" placeholder="название" style={{ width: '95%', borderRadius: '10px 0px 0px 10px', height: '60px', fontSize: '18px', border: 'none', marginRight: '5px'}} onChange={handleTitleValueChange}/>
                            </Form.Group>

                            {/* <Form.Group controlId="tag">
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
                            </Form.Group> */}
                            <Form.Group controlId="tag">
                                <Form.Control value={tagValue} type="text" placeholder="тег" style={{ width: '95%', borderRadius: '0px 0px 0px 0px', height: '60px', fontSize: '18px', border: 'none', marginRight: '5px' }} onChange={handleTagValueChange}/>
                            </Form.Group>
                            <Form.Group controlId="min_price">
                                <Form.Control value={minPriceValue} type="text" placeholder="цена от" style={{ width: '95%', borderRadius: '0px 0px 0px 0px', height: '60px', fontSize: '18px', border: 'none', marginRight: '5px' }} onChange={handleMinPriceValueChange}/>
                            </Form.Group>
                            <Form.Group controlId="max_price">
                                <Form.Control value={maxPriceValue} type="text" placeholder="цена до" style={{borderRadius: '0 10px 10px 0', width: '95%', height: '60px', fontSize: '18px', border: 'none' }} onChange={handleMaxPriceValueChange}/>
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
                    {dishes.length === 0 && <p className="dish-text"> <big>таких блюд у нас нет🥹</big></p>}
                    <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'left', width: '100%', margin: '0 auto'}}>
                        {user.isSuperuser && 
                        <Link to={'/dishes/0/'} style={{marginLeft: '5%', marginTop: '2%'}}>
                            <div style={{fontSize: '20px', fontWeight: '500', color: 'black', backgroundColor: 'white', borderRadius: '5px', width: '115%'}}>Добавить новое блюдo</div>
                        </Link>
                        }
                        {!user.isSuperuser &&
                            dishes.map((dish: Dish) => (
                            <OneCard key={dish.id} id={dish.id} url={dish.url} title={dish.title} chef={dish.chef_post} tags={dish.tags} price={Number(dish.price)} onPlusButtonClick={() => postDishToOrder(dish.id)}></OneCard>))
                        }
                    </div>
            </div>
            {user.isSuperuser && (dishes.length > 0) &&
                <AdminDishesTable dishes={dishes}/>
            }
        </div>
     )
};
  
export default DishesPage;