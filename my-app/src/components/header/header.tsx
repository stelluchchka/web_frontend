import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import styles from './header.module.scss'
import axios from 'axios';
import {useDispatch} from "react-redux";
import {useUser, useIsAuth, setIsAuthAction, setUserAction} from "../../slices/authSlice";
import Cookies from "universal-cookie";
import { toast } from 'react-toastify';
import { useCurrentOrderId } from '../../slices/orderSlice';
import ProfileIcon from '../../components/Icons/ProfileIcon';
import ApplicationIcon from '../../components/Icons/ApplicationIcon';
import BlackApplicationIcon from '../Icons/BlackApplicationIcon';

const cookies = new Cookies();

const Header: React.FC = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const isUserAuth = useIsAuth();
    let user = useUser();
    const order_id = useCurrentOrderId();
    const isSuperuser = user.isSuperuser;
    const navigate = useNavigate();

    const logout = async () => {
        try {
            console.log(cookies.get('session_id'))
            await axios('http://localhost:8000/logout',
            {
                method: "POST",
                withCredentials: true,
                headers: { 
                    "Content-type": "order/json; charset=UTF-8"
                }, 
            })

            cookies.remove("session_id", { path: "/" }); 

            dispatch(setIsAuthAction(false))
            dispatch(setUserAction({
                email: "",
                first_name: "",
                last_name: "",
                isSuperuser: false
            }))
            navigate('/dishes')
            toast.success("Выход выполнен  успешно");
        }
        catch(error) {
            console.log(error)
        }
    }    

    const handleSubmit = async () => {
        await logout();
    };
    return (
        <div className={styles.header}>
            <div className={styles.header__wrapper}>
                {isSuperuser ? <Link to='/' className={styles.header__logo} style={{color: 'red'}}>DISHES</Link>
                :
                <Link to='/' className={styles.header__logo}>DISHES</Link>
                }
                {isUserAuth && !isSuperuser && location.pathname === '/dishes' && (order_id != -1) &&
                        <div className={styles['application__icon-wrapper']}>
                            <Link to={`/orders/${order_id}`}>
                                <div style={{marginRight: "20px"}} className={styles['application__icon-circle']}> <ApplicationIcon/><br /> </div>
                            </Link>
                        </div>
                }
                {isUserAuth && !isSuperuser && location.pathname === '/dishes' && (order_id == -1) &&

                        <div className={styles['application__icon-wrapper']}>
                            <div style={{marginRight: "20px"}} className={styles['application__icon-circle']}> <BlackApplicationIcon/><br /> </div>
                        </div>
                }
                <div className={styles.header__profile} style={{display: 'flex'}}>
                    <Link className={styles.header__profile} to='/dishes' style={{marginTop: '8px'}}>Блюда</Link>
                    {isUserAuth && !isSuperuser && <Link className={styles.header__profile} to='/orders' style={{marginTop: '8px'}}>Мои заказы</Link>}
                    {isUserAuth && isSuperuser && <Link className={styles.header__profile} to='/orders' style={{marginTop: '8px'}}>Все заказы</Link>}
                    {isUserAuth && isSuperuser && <div style={{marginTop: '8px', marginRight: '10px'}}>менеджер</div>}
                    {isUserAuth && <div style={{marginTop: '8px'}}> {user.first_name} {user.last_name}</div>}
                    {isUserAuth && <button className={styles.header__profile} style={{backgroundColor: 'white', marginLeft: "50px"}} onClick={handleSubmit}>Выйти</button>}
                </div>
                {!isUserAuth && <Link to='/login' className={styles.header__profile}><ProfileIcon/></Link>}
            </div>
        </div>
    )
};

export default Header;