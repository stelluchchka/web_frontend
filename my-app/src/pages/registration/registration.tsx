import * as React from 'react';
import { useState } from 'react';
import { ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import styles from './registration.module.scss'
import axios, { AxiosResponse } from 'axios';
import { useDispatch } from "react-redux";
import { setUserAction, setIsAuthAction } from "../../slices/authSlice";
import { toast } from 'react-toastify';

const RegistrationPage: React.FC = () => {
    console.log("gag")
    const dispatch = useDispatch();
    const [emailValue, setEmailValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')
    const [firstNameValue, setFirstNameValue] = useState('')
    const [lastNameValue, setLastNameValue] = useState('')
    const [passwordError, setPasswordError] = useState('init')
    const [emailError, setEmailError] = useState('init')
    const [firstNameError, setFirstNameError] = useState('init')
    const [lastNameError, setLastNameError] = useState('init')
    const [isDataValid, setIsDataValid] = useState(false)

    const emailValidation = (value: string): void => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value) && value.length !== 0) {
            setEmailError('Неправильный формат email!');
        } else if(value.length === 0)  {
            setEmailError('Это обязательное поле!');
        } else {
            setEmailError('');
        }
    };

    const  passwordValidation = (value: string): void => {
        if ((value.length < 8 || value.length > 20) && value.length !== 0) {
            setPasswordError('Пароль должен быть от 8 до 20 символов!');
        } else if (value.length === 0) {
            setPasswordError('Это обязательное поле!');
        } else {
            setPasswordError('');
        }
    }

    const firstNameValidation = (value: string): void => {
        const words = value.trim().split(/\s+/);
        if ((words.length > 1) && value.length !== 0) {
            setFirstNameError('слишком много для 1 имени!');
        } else if (value.length === 0) {
            setFirstNameError('это обязательное поле!');
        } else {
            setFirstNameError('');
        }
    };

    const lastNameValidation = (value: string): void => {
        const words = value.trim().split(/\s+/);
        if ((words.length > 2) && value.length !== 0) {
            setLastNameError('слишком много для 1 фамилии!');
        } else if (value.length === 0) {
            setFirstNameError('это обязательное поле!');
        } else {
            setLastNameError('');
        }
    };


    React.useEffect(() => {
        if (!emailError && !passwordError && !firstNameError && !lastNameError) {
            setIsDataValid(true)
        } else {
            setIsDataValid(false)
        }
    }, [emailError, passwordError, firstNameError, lastNameError])

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      try {
        const formData = new FormData();
        formData.append('email', emailValue);
        formData.append('first_name', firstNameValue)
        formData.append('last_name', lastNameValue)
        formData.append('password', passwordValue);
        const response: AxiosResponse = await axios.post('http://localhost:8000/user/', formData, {
          withCredentials: true, // Включаем передачу кук в запросах
        });

        dispatch(setIsAuthAction(true))

        dispatch(setUserAction({
            email: response.data.email,
            first_name: response.data.first_name,
            last_name: response.data.last_name,
            isSuperuser: response.data.is_superuser
        }));

        toast.success("поздравляем! регистрация пройдена успешно🥹");
      } catch (error) {
        toast.error("такой пользователь уже существует🥹");
        throw error
      }
    };

    const handleEmailValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        emailValidation(event.target.value)
        setEmailValue(event.target.value)
    };

    const handlePasswordValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        passwordValidation(event.target.value)
        setPasswordValue(event.target.value)
    };

    const handleFirstNameValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        firstNameValidation(event.target.value)
        setFirstNameValue(event.target.value)
    };

    const handleLastNameValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        lastNameValidation(event.target.value)
        setLastNameValue(event.target.value)
    };

    return (
        <div className={styles.registration__page}>
            <div style={{position: 'relative'}}className={styles['registration__page-wrapper']}>
                <Form  onSubmit={handleFormSubmit}
                className={styles['form']}>
                    <h3 className={styles['registration__page-title']}>Регистрация</h3>
                    <div className={styles.form__item}>
                        <Form.Group style={{height: 50}} className='w-100 mb-3' controlId="search__sub.input__sub">
                            <Form.Control onChange={handleEmailValueChange} value={emailValue} style={{height: '100%', borderColor: '#3D348B', fontSize: 18}} type="email" placeholder="e-mail" />
                            <span className={styles['form__item-error']}>{emailError !== 'init' && emailError}</span>
                        </Form.Group>
                    </div>
                    <div className={styles.form__item}>
                        <Form.Group style={{height: 50}} className='w-100 mb-3' controlId="search__sub.input__sub">
                            <Form.Control onChange={handleFirstNameValueChange} value={firstNameValue} style={{height: '100%', borderColor: '#3D348B', fontSize: 18}} type="text" placeholder="имя" />
                            <span className={styles['form__item-error']}>{firstNameError !== 'init' && firstNameError}</span>
                        </Form.Group>
                    </div>
                    <div className={styles.form__item}>
                        <Form.Group style={{height: 50}} className='w-100 mb-3' controlId="search__sub.input__sub">
                            <Form.Control onChange={handleLastNameValueChange} value={lastNameValue} style={{height: '100%', borderColor: '#3D348B', fontSize: 18}} type="tel" placeholder="фамилия" />
                            <span className={styles['form__item-error']}>{lastNameError !== 'init' && lastNameError}</span>
                        </Form.Group>
                    </div>
                    <div className={styles.form__item}>
                        <Form.Group style={{height: 50}} className='w-100 mb-3' controlId="search__sub.input__sub">
                            <Form.Control onChange={handlePasswordValueChange} value={passwordValue} style={{height: '100%', borderColor: '#3D348B', fontSize: 18}} type="password" placeholder="пароль" />
                            <span className={styles['form__item-error']}>{passwordError !== 'init' && passwordError}</span>
                        </Form.Group>
                    </div>
                    
                    {
                        isDataValid ? <Button type='submit' style={{backgroundColor: "#2787F5", padding: "10px 20px", borderColor: "#000", fontSize: 18, height: 50}}>зарегистрироваться</Button>
                        : <Button disabled type='submit' style={{backgroundColor: "#2787F5", padding: "10px 20px", borderColor: "#000", fontSize: 18, height: 50}}>зарегистрироваться</Button>
                    }
                    <Link className={styles['registration__page-link']} to='/login'>у вас уже есть аккаунт?</Link>
                </Form>
            </div>
        </div>
    )
};
  
export default RegistrationPage;