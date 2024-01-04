import React from 'react'
import axios from 'axios'
import styles from './orders.module.scss'
// import ModalWindow from '../../components/ModalWindow'
import OrdersTable from '../../components/OrdersTable'
import BreadCrumbs from '../../components/breadcrumps'
import { useDispatch } from 'react-redux'
import { setOrdersAction, useOrders } from '../../slices/orderSlice'
import { setLinksMapDataAction, useLinksMapData } from '../../slices/detailedSlice'
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
    status: string;
    created_at: string;
    processed_at: string;
    completed_at: string;
}
const OrdersListPage = () => {
    const dispatch = useDispatch();
    const orders = useOrders();
    const linksMap = useLinksMapData();
    // const [isModalWindowOpened, setIsModalWindowOpened] = useState(false);

    const getAllOrders = async () => {
        try {
          const response = await axios('http://localhost:8000/orders', {
            method: 'GET',
            withCredentials: true
          })
          const OrderArr = response.data.map((raw: ReceivedOrderData) => ({
            id: raw.id,
            status: raw.status,
            created_at: raw.created_at,
            processed_at: raw.processed_at,
            completed_at: raw.completed_at,
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
                <h5 className={styles['orders__page-subtitle']}>
                </h5>
                <OrdersTable orders={orders}/>
                {/* <ModalWindow handleBackdropClick={() => setIsModalWindowOpened(false)} className={styles.modal} active={isModalWindowOpened}>
                    <h3 className={styles.modal__title}>Регистрация прошла успешно!</h3>
                </ModalWindow> */}
            </div>
        </div>
    )
}

export default OrdersListPage