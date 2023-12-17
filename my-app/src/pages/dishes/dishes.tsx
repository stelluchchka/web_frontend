import React, { useEffect, useState } from 'react';
import { ChangeEvent } from 'react';
// import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import OneCard from '../../components/card';
import styles from './dishes.module.scss';
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
    tags: string,
    url: string,
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
        tag: "вег",
        status: "есть",
        weight: 100,
        energy_value: 1,
        content: "dd",
        chef_name: "aaaaa иван",
        chef_post: "шеф-повр",
        chef_url: "https://madeindream.com/image/data/statya/sravnenie-domashnego-soka-i-pokupnogo/mid-komissiya-sok-iz-magazina-1-big.png",
        expiry_date: "12 суток"
    },
    {
        id: 2,
        title: "сок",
        price: 200,
        url: "https://madeindream.com/image/data/statya/sravnenie-domashnego-soka-i-pokupnogo/mid-komissiya-sok-iz-magazina-1-big.png",
        tag: "остро",
        status: "есть",
        weight: 100,
        energy_value: 1,
        content: "dd",
        chef_name: "aaaaa щщщщ",
        chef_post: "шеф",
        chef_url: "https://madeindream.com/image/data/statya/sravnenie-domashnego-soka-i-pokupnogo/mid-komissiya-sok-iz-magazina-1-big.png",
        expiry_date: "12 суток"
    },
    {
        id: 3,
        title: "бургер1",
        price: 300,
        url: "https://png.pngtree.com/png-clipart/20190921/original/pngtree-hand-drawn-delicious-burger-illustration-png-image_4752009.jpg",
        tag: "вег",
        status: "есть",
        weight: 100,
        energy_value: 1,
        content: "dd",
        chef_name: "aaaaоооa",
        chef_post: "кондитер",
        chef_url: "https://madeindream.com/image/data/statya/sravnenie-domashnego-soka-i-pokupnogo/mid-komissiya-sok-iz-magazina-1-big.png",
        expiry_date: "12 суток"
    },
    {
        id: 4,
        title: "бургер2",
        price: 400,
        url: "https://png.pngtree.com/png-clipart/20190921/original/pngtree-hand-drawn-delicious-burger-illustration-png-image_4752009.jpg",
        tag: "вег",
        status: "есть",
        weight: 100,
        energy_value: 1,
        content: "dd",
        chef_name: "aaaaa",
        chef_post: "asdf",
        chef_url: "https://madeindream.com/image/data/statya/sravnenie-domashnego-soka-i-pokupnogo/mid-komissiya-sok-iz-magazina-1-big.png",
        expiry_date: "12 суток"
    },
    {
        id: 5,
        title: "сок2",
        price: 500,
        url: "https://madeindream.com/image/data/statya/sravnenie-domashnego-soka-i-pokupnogo/mid-komissiya-sok-iz-magazina-1-big.png",
        tag: "остро",
        status: "есть",
        weight: 100,
        energy_value: 1,
        content: "dd",
        chef_name: "aaaaa",
        chef_post: "asdf",
        chef_url: "https://madeindream.com/image/data/statya/sravnenie-domashnego-soka-i-pokupnogo/mid-komissiya-sok-iz-magazina-1-big.png",
        expiry_date: "12 суток"
    }
]

const MainPage: React.FC = () => {
    const [dishes, setDishes] = useState<Dish[]>([]);
    const [tagValue, setTagValue] = useState<string>('тег');
    const [titleValue, setTitleValue] = useState<string>('')
    const [minPriceValue, setMinPriceValue] = useState<number>(0);
    const [maxPriceValue, setMaxPriceValue] = useState<number>(10000000);

    const linksMap = new Map<string, string>([
        ['главная', '/']
    ]);

    const fetchDishes = async () => {
        let url = 'http://127.0.0.1:8000/dishes'
        url += `?title=${titleValue}`
        url += `&max_price=${maxPriceValue}`
        url += `&min_price=${minPriceValue}`
        url += `&tag=${tagValue}`
        console.log(url)
        try {
            const response = await fetch(url, {
                credentials: 'include'
            });
            const jsonData = await response.json();
            console.log(response)
            const newRecipesArr = jsonData.dishes.map((raw: ReceivedDishData) => ({
                id: raw.id,
                title: raw.title,
                price: raw.price,
                tag: raw.tags,
                url: raw.url,
            }))
            setDishes(newRecipesArr);
        }
        catch {
            if (tagValue && tagValue != 'тег') {
                const filteredArray = mockDishes.filter(mockDishes => mockDishes.tag === tagValue);
                setDishes(filteredArray);
            } else if (titleValue) {
                const filteredArray = mockDishes.filter(mockDishes => mockDishes.title.includes(titleValue));
                setDishes(filteredArray);
            } else if (minPriceValue) {
                const filteredArray = mockDishes.filter(mockDishes => mockDishes.price >= minPriceValue);
                setDishes(filteredArray);
            } else if (maxPriceValue) {
                const filteredArray = mockDishes.filter(mockDishes => mockDishes.price <= maxPriceValue);
                setDishes(filteredArray);
            }
            else {
                setDishes(mockDishes);
            }
        }
    };


    
    useEffect(() => {
        fetchDishes();
    }, []);

    const handleSearchButtonClick = () => {
        fetchDishes();
    }

    const handleTitleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTitleValue(event.target.value);
    };

    const handleMinPriceValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        setMinPriceValue(Number(event.target.value));
    };

    const handleMaxPriceValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        setMaxPriceValue(Number(event.target.value));
    };

    // const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    //     event.preventDefault();
    // };

    const handleTagSelect = (eventKey: string | null) => {
        if (eventKey) {
          const selectedTag = tags.find(tag => tag.key === eventKey);
          if (selectedTag) {
            setTagValue(selectedTag.value);
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
                                <Form.Control type="text" placeholder="название" style={{ width: '200px', borderRadius: '10px 0px 0px 10px', height: '60px', fontSize: '18px', border: 'none', marginRight: '5px'}} onChange={handleTitleValueChange}/>
                            </Form.Group>
                            <Form.Group controlId="tag">
                                <Dropdown onSelect={handleTagSelect}>
                                    <Dropdown.Toggle style={{
                                        height: '60px',
                                        backgroundColor: "#ffff",
                                        color: '#827e7e',   //gray
                                        width: '200px',
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
                                        width: '200px',
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
                                <Form.Control type="text" placeholder="цена от" style={{ width: '200px', borderRadius: '0px 0px 0px 0px', height: '60px', fontSize: '18px', border: 'none', marginRight: '5px' }} onChange={handleMinPriceValueChange}/>
                            </Form.Group>
                            <Form.Group controlId="max_price">
                                <Form.Control type="text" placeholder="цена до" style={{borderRadius: '0 10px 10px 0', width: '200px', height: '60px', fontSize: '18px', border: 'none' }} onChange={handleMaxPriceValueChange}/>
                            </Form.Group>
                            <Button variant="primary" type="submit" style={{color: 'white', 
                                    backgroundColor: '#f53100',
                                    border: 'none',
                                    height: '60px', 
                                    fontSize: '20px',
                                    borderRadius: '10px 10px 10px 10px',
                                    width: '200px', 
                                    marginLeft: '20px',
                                    fontFamily: 'sans-serif'}} 

                            onClick={() => handleSearchButtonClick()}>
                                Поиск
                            </Button>
                    </div>
                    <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'left', width: '100%', margin: '0 auto'}}>
                        {
                        dishes.map((dish: Dish) => (
                            <OneCard key={dish.id} id={dish.id} url={dish.url} chef={dish.chef_post} title={dish.title} tag={dish.tag} price={Number(dish.price)} onButtonClick={() => console.log('add to order')}></OneCard>
                        ))}
                    </div>
                {dishes.length === 0 && <p className="dish-text"> <big>таких блюд у нас нет🥹</big></p>}
            </div>
        </div>
     )
};
  
export default MainPage;