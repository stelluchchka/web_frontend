import React from 'react';
import { Link } from 'react-router-dom'
import styles from './header.module.scss'
import { useState } from 'react';
import ProfileWindow from "../../components/ProfileWindow";
import { motion, AnimatePresence } from "framer-motion";
import axios from 'axios';
import {useDispatch} from "react-redux";
import {useUser, useIsAuth, setIsAuthAction, setUserAction} from "../../slices/authSlice";
import Cookies from "universal-cookie";
import { toast } from 'react-toastify';
import { useDishOrder } from '../../slices/orderSlice';
import ProfileIcon from '../../components/Icons/ProfileIcon';
import ApplicationIcon from '../../components/Icons/ApplicationIcon';



const cookies = new Cookies();

const Header: React.FC = () => {
    const dispatch = useDispatch();
    const [isProfileButtonClicked, setIsProfileButtonClicked] = useState(false);
    const isUserAuth = useIsAuth();
    const dishes_orders = useDishOrder();
    let user = useUser();

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
            // localStorage.setItem('dish_orders', JSON.stringify([]));
            dispatch(setUserAction({
                email: "",
                first_name: "",
                last_name: "",
                isSuperuser: false
            }))
            setIsProfileButtonClicked(false);
            toast.success("Выход выполнен  успешно");
        }
        catch(error) {
            console.log(error)
        }
    }    
    const handleProfileButtonClick = () => {
        setIsProfileButtonClicked(!isProfileButtonClicked);
    };
    const handleSubmit = async () => {
        await logout();
    };
    return (
        <div className={styles.header}>
            <div className={styles.header__wrapper}>
                <Link to='/' className={styles.header__logo}>DISHES</Link>
                {isUserAuth && 
                        <div className={styles['application__icon-wrapper']}>
                            <Link to={'/order'}>
                                <div className={styles['application__icon-circle']}> <ApplicationIcon/>{dishes_orders.length} <br /> </div>
                            </Link>
                        </div>
                    }
                <div className={styles.header__profile}>
                    <Link className={styles.header__profile} to='/dishes'>Блюда</Link>
                    {isUserAuth && <Link className={styles.header__profile} to='/orders'>Мои заказы</Link>}
                </div>
                {isUserAuth ? <ProfileIcon className={styles['header__profile-icon']} onClick={handleProfileButtonClick}/> : <Link to='/registration' className={styles.header__profile}><ProfileIcon/></Link>}


                <AnimatePresence>
                {isUserAuth && isProfileButtonClicked && (
                    <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.3 }}
                    style={{
                        marginTop: 400,
                        position: "absolute",
                        right: 0,
                    }}
                    >
                    <ProfileWindow
                        email={user.email}
                        first_name={user.first_name}
                        last_name={user.last_name}
                        onClick={handleSubmit}
                    />
                    </motion.div>
                )}
                </AnimatePresence>
                {/* <div>                a</div> */}
            </div>
        </div>
    )
};

export default Header;