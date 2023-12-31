import * as React from 'react';
import cn from 'classnames'
import styles from './ProfileWindow.module.scss';
import Button from 'react-bootstrap/Button'
import ProfileLogoIcon from '../../components/Icons/ProfileLogoIcon';

export type ModalProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    onClick?: () => void;
    className?: string;
    email: string;
    first_name: string | undefined;
    last_name: string | undefined;
};

const ProfileWindow: React.FC<ModalProps> = ({
    email,
    first_name,
    last_name,
    className,
    onClick,

}) => {
    return (
        <div className={cn(styles.modal, className)}>
            <div className={styles.title__block}>
            <ProfileLogoIcon></ProfileLogoIcon>
                <h3 className={styles.modal__title}>Ваш профиль</h3>
            </div>
            
            <div className={styles.info}>
                <div className={styles.username__info}>
                    <div>
                        <h4 className={styles.info__title}>E-mail: </h4>
                        <h5 className={styles.info__value}>{email}</h5>
                    </div>
                    <div>
                        <h4 className={styles.info__title}> Имя: </h4>
                        <h5 className={styles.info__value}>{first_name}</h5>
                    </div>
                    <div>
                        <h4 className={styles.info__title}>Фамилия: </h4>
                        <h5 className={styles.info__value}>{last_name}</h5>
                    </div>
                </div>
            </div>
            <Button style={{backgroundColor: '#f53100', color: 'white'}} className={styles.modal__btn} onClick={onClick}>Выйти</Button>
            
        </div>
    )
};

export default ProfileWindow;