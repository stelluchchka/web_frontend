import React, { ChangeEvent } from 'react'
import axios from 'axios'
import styles from './orders.module.scss'
// import ModalWindow from '../../components/ModalWindow'
import OrdersTable from '../../components/OrdersTable'
import BreadCrumbs from '../../components/breadcrumps'
import { useDispatch } from 'react-redux'
import { setOrdersAction, useOrders } from '../../slices/orderSlice'
import { setLinksMapDataAction, useLinksMapData } from '../../slices/detailedSlice'
import { useUser } from '../../slices/authSlice'
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap'
import { setEmailValueAction, setFinishDateValueAction, setStartDateValueAction, setStatusValueAction, useEmailValue, useFinishDateValue, useStartDateValue, useStatusValue } from '../../slices/mainSlice'

// import { useLinksMapData, setLinksMapDataAction } from '../../slices/detailedSlice';

export type  DishesData = {
    id: number;
    title: string;
    price: number;
    tag: string;
    url: string;
}

export type DishFromOrderData = {
    id: number;
    dish: DishesData
    quantity: number;
}

export type ReceivedDishesFromOrderData = {
    id: number;
    status: string;
    created_at: string;
    processed_at: string;
    completed_at: string;
    dish: DishFromOrderData[];
}

export type ReceivedOrderData = {
    id: number;
    user: string;
    status: string;
    created_at: string;
    processed_at: string;
    completed_at: string;
    is_success: string;
}
const OrdersListPage = () => {
    const dispatch = useDispatch();
    const orders = useOrders();
    const linksMap = useLinksMapData();
    const user = useUser();
    const emailValue = useEmailValue();
    const statusValue = useStatusValue();
    const start_dateValue = useStartDateValue();
    const finish_dateValue = useFinishDateValue();

    const handleEmailValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(setEmailValueAction(event.target.value));
    };
    const handleStatusValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(setStatusValueAction(event.target.value));
    };
    const handleStartDateValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value)
        dispatch(setStartDateValueAction(event.target.value));
    };
    const handleFinishDateValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(setFinishDateValueAction(event.target.value));
    };
    const handleSearchButtonClick = () => {
        getAllOrders();
    }

    const getAllOrders = async () => {
        let url = 'http://localhost:8000/orders'
        url += `?start=${start_dateValue}`
        url += `&end=${finish_dateValue}`
        url += `&status=${statusValue}`
        url += `&email=${emailValue}`
        try {
          const response = await axios(url, {
            method: 'GET',
            withCredentials: true
          })
          const OrderArr = response.data.map((raw: ReceivedOrderData) => ({
            id: raw.id,
            user: raw.user,
            status: raw.status,
            created_at: raw.created_at,
            processed_at: raw.processed_at,
            completed_at: raw.completed_at,
            is_success: raw.is_success
        }));
        dispatch(setOrdersAction(OrderArr))
        } catch(error) {
          throw error
        }
    }

    React.useEffect(() => {
        dispatch(setLinksMapDataAction(new Map<string, string>([
            ['Заказы', '/orders']
        ])))
        getAllOrders()
    }, [])
    
    return (
        <div className={styles.orders__page}>
            <div className={styles['orders__page-wrapper']}>
                <BreadCrumbs links={linksMap}></BreadCrumbs> 
                <h1 className={styles['orders__page-title']}>История заказов</h1>
                {user.isSuperuser &&
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    {/* <form onSubmit={handleSubmit(onSubmit)} style={{display: 'flex', justifyContent: 'center'}}> */}
                    <Form.Group controlId="name">
                        <Form.Control type="text" value={emailValue} onChange={handleEmailValueChange} placeholder="пользователь" style={{ width: '95%', borderRadius: '10px 0px 0px 10px', height: '40px', fontSize: '18px', border: 'none', marginRight: '5px', backgroundColor: '#827e7a', marginTop: '15px', marginBottom: '10px'}}/>
                        {/* <Form.Control className={styles['status-search']} type="text" placeholder="название"/> */}
                    </Form.Group>
                    
                    {/* <div>
                        <select
                        name="status"
                        id="status"
                        required
                        aria-labelledby="status"
                        onChange={(event) => setStatusValue(event.target.value)}
                        style={{
                            height: '40px',
                            backgroundColor: "#827e7a",
                            color: 'black',
                            width: '100%',
                            textAlign: 'left',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderRadius: '0 0 0 0',
                            marginRight: '5px',
                            marginTop: "15px",
                            marginBottom: '10px',
                            fontSize: '18px'
                        }}>
                        <option value="">статус</option>
                        <option value="сформирован">сформирован</option>
                        <option value="отказ">отказ</option>
                        <option value="готов">готов</option>
                        </select>
                    </div>                     */}
                    <Form.Group controlId="status">
                    <Form.Control type="text" value={statusValue} onChange={handleStatusValueChange} placeholder="статус" style={{ width: '95%', borderRadius: '0px 0px 0px 0px', height: '40px', fontSize: '18px', border: 'none', marginRight: '5px', backgroundColor: '#827e7a', marginTop: '15px', marginBottom: '10px'}}/>
                    </Form.Group>

                    <Form.Group controlId="date_start">
                        <Form.Control type="date" value={start_dateValue} onChange={handleStartDateValueChange} placeholder="дата создания от" style={{ width: '95%', borderRadius: '0px 0px 0px 0px', height: '40px', fontSize: '18px', border: 'none', marginRight: '5px', backgroundColor: '#827e7a', marginTop: '15px', marginBottom: '10px'}}/>
                    </Form.Group>

                    <Form.Group controlId="date_finish">
                        <Form.Control type="date" value={finish_dateValue} onChange={handleFinishDateValueChange} placeholder="дата создания до" style={{ width: '95%', borderRadius: '0px 10px 10px 0px', height: '40px', fontSize: '18px', border: 'none', marginRight: '5px', backgroundColor: '#827e7a', marginTop: '15px', marginBottom: '10px'}}/>
                    </Form.Group>
                    {/* </form> */}

                    <Button variant="primary" type="submit" style={{color: 'white', 
                                    backgroundColor: '#f53100',
                                    border: 'none',
                                    height: '40px', 
                                    fontSize: '20px',
                                    borderRadius: '10px 10px 10px 10px',
                                    width: '18%', 
                                    marginLeft: '15px',
                                    fontFamily: 'sans-serif',
                                    marginTop: '15px', 
                                    marginBottom: '10px'}} 

                            onClick={() => handleSearchButtonClick()}>
                                Поиск
                    </Button>
                </div>
                }
                <h5 className={styles['orders__page-subtitle']}>
                </h5>
                {orders.length == 0 && <p>таких заказов нет🥹</p> }
                {orders.length > 0 && <OrdersTable orders={orders}/>}
            </div>
        </div>
    )
}

export default OrdersListPage