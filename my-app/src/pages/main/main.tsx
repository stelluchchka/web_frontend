import React, { useEffect, useState } from 'react';
import { ChangeEvent } from 'react';
// import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Header from '../../components/header';
import OneCard from '../../components/card';
import styles from './main.module.scss';

export type Dish = {
    id: number,
    title: string,
    price: number,
    src: string,
    tag: string,
    status: string,
    weight: number,
    energy_value: number,
    content: string,
    chef_name: string,
    chef_post: string,
    chef_src: string,
    expiry_date: string
}

export type ReceivedDishData = {
    id: number,
    title: string,
    price: number,
    tag: string,
    src: string,
}

const tags =[     {
        key: "dish",
        value: "блюдо"
    },
    {
        key: "drink",
        value: "напиток"
    },
]

const mockDishes = [
    {
        id: 1,
        title: "бургер",
        price: 100,
        src: "https://png.pngtree.com/png-clipart/20190921/original/pngtree-hand-drawn-delicious-burger-illustration-png-image_4752009.jpg",
        tag: "блюдо",
        status: "есть",
        weight: 100,
        energy_value: 1,
        content: "dd",
        chef_name: "aaaaa иван",
        chef_post: "шеф-повр",
        chef_src: "https://madeindream.com/image/data/statya/sravnenie-domashnego-soka-i-pokupnogo/mid-komissiya-sok-iz-magazina-1-big.png",
        expiry_date: "12 суток"
    },
    {
        id: 2,
        title: "сок",
        price: 200,
        src: "https://madeindream.com/image/data/statya/sravnenie-domashnego-soka-i-pokupnogo/mid-komissiya-sok-iz-magazina-1-big.png",
        tag: "напиток",
        status: "есть",
        weight: 100,
        energy_value: 1,
        content: "dd",
        chef_name: "aaaaa щщщщ",
        chef_post: "шеф",
        chef_src: "https://madeindream.com/image/data/statya/sravnenie-domashnego-soka-i-pokupnogo/mid-komissiya-sok-iz-magazina-1-big.png",
        expiry_date: "12 суток"
    },
    {
        id: 3,
        title: "бургер1",
        price: 300,
        src: "https://png.pngtree.com/png-clipart/20190921/original/pngtree-hand-drawn-delicious-burger-illustration-png-image_4752009.jpg",
        tag: "блюдо",
        status: "есть",
        weight: 100,
        energy_value: 1,
        content: "dd",
        chef_name: "aaaaоооa",
        chef_post: "кондитер",
        chef_src: "https://madeindream.com/image/data/statya/sravnenie-domashnego-soka-i-pokupnogo/mid-komissiya-sok-iz-magazina-1-big.png",
        expiry_date: "12 суток"
    },
    {
        id: 4,
        title: "бургер2",
        price: 400,
        src: "https://png.pngtree.com/png-clipart/20190921/original/pngtree-hand-drawn-delicious-burger-illustration-png-image_4752009.jpg",
        tag: "блюдо",
        status: "есть",
        weight: 100,
        energy_value: 1,
        content: "dd",
        chef_name: "aaaaa",
        chef_post: "asdf",
        chef_src: "https://madeindream.com/image/data/statya/sravnenie-domashnego-soka-i-pokupnogo/mid-komissiya-sok-iz-magazina-1-big.png",
        expiry_date: "12 суток"
    },
    {
        id: 5,
        title: "сок2",
        price: 500,
        src: "https://madeindream.com/image/data/statya/sravnenie-domashnego-soka-i-pokupnogo/mid-komissiya-sok-iz-magazina-1-big.png",
        tag: "напиток",
        status: "есть",
        weight: 100,
        energy_value: 1,
        content: "dd",
        chef_name: "aaaaa",
        chef_post: "asdf",
        chef_src: "https://madeindream.com/image/data/statya/sravnenie-domashnego-soka-i-pokupnogo/mid-komissiya-sok-iz-magazina-1-big.png",
        expiry_date: "12 суток"
    }
]

const MainPage: React.FC = () => {
    const [dishes, setDishes] = useState<Dish[]>([]);
    const [tagValue, setTagValue] = useState<string>('');
    const [titleValue, setTitleValue] = useState<string>('')
    const [minPriceValue, setMinPriceValue] = useState<number | undefined>(undefined);
    const [maxPriceValue, setMaxPriceValue] = useState<number | undefined>(undefined);

    const fetchDishes = async () => {
        let response = null;
        let url = 'http://127.0.0.1:8000/dishes'

        if (titleValue) {
            url += `?title=${titleValue}`
            if (maxPriceValue) {
                url += `&max_price=${maxPriceValue}`
            }
            if(minPriceValue) {
                url += `&min_price=${minPriceValue}`
            }
            if (tagValue){
                url += `&tag=${tagValue}`
            }
        } else if (tagValue) {
            url += `?tag=${tagValue}`
            if (maxPriceValue) {
                url += `&max_price=${maxPriceValue}`
            }
            if(minPriceValue) {
                url += `&min_price=${minPriceValue}`
            }
            if (titleValue){
                url += `&title=${titleValue}`
            }
        } else if (minPriceValue){
            url += `?min_price=${minPriceValue}`
            if (maxPriceValue) {
                url += `&max_price=${maxPriceValue}`
            }
            if(minPriceValue) {
                url += `&tag=${tagValue}`
            }
            if (titleValue){
                url += `&title=${titleValue}`
            }
        } else if (maxPriceValue){
            url += `?max_price=${maxPriceValue}`
            if (maxPriceValue) {
                url += `&min_price=${minPriceValue}`
            }
            if(minPriceValue) {
                url += `&tag=${tagValue}`
            }
            if (titleValue){
                url += `&title=${titleValue}`
            }
        }
        console.log(url)
        try {
            response = await fetch(url);

            const jsonData = await response.json();
            const newRecipesArr = jsonData.map((raw: ReceivedDishData) => ({
                id: raw.id,
                title: raw.title,
                price: raw.price,
                tag: raw.tag,
                src: raw.src,
            }))
            setDishes(newRecipesArr);
        }
        catch {
            if (tagValue) {
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
            <Header/>
            {/* <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link style={{color: 'black', textAlign: 'left', fontStyle: 'italic'}} to="/">блюда</Link>
                    </li>
                </ol>
            </nav> */}
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
                            <OneCard id={dish.id} src={dish.src} chef={dish.chef_post} title={dish.title} tag={dish.tag} price={Number(dish.price)} onButtonClick={() => console.log('add to order')}></OneCard>
                        ))}
                    </div>
                {dishes.length === 0 && <p className="dish-text"> <big>таких блюд у нас нет🥹</big></p>}
            </div>
        </div>
     )
};
  
export default MainPage;