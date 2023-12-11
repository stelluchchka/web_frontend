import styles from './main.module.scss'

const MainPage = () => {

    return (
        <div className={styles.main_page}>
        <div className={styles["hat"]}>
            <h5 className={styles["header__logo"]}>**логотип</h5>
            <h1 className={styles["header__title"]}>
            ЗАЯВКИ ДЛЯ ПОВАРОВ В БЫСТРОМ ПИТАНИИ
            </h1>
            <h4 className={styles["header__slogan"]}>
            нереально крутой слоган
            </h4>
            <div>
            <img style={{display: 'inline-block',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    width: '80px',
                    height: '80px',
                    marginTop: '2%',
                    marginLeft: '3%',
                    marginRight: '3%'}} src={'https://w7.pngwing.com/pngs/302/239/png-transparent-chef-cooking-bake-hand-cooking-cook.png'} alt="chef"/>
            <img style={{display: 'inline-block',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    width: '80px',
                    height: '80px',
                    marginTop: '2%',
                    marginLeft: '5%',
                    marginRight: '3%'}} src={'https://png.pngtree.com/element_our/20190603/ourlarge/pngtree-meal-chef-illustration-for-meal-image_1428889.jpg'} alt="chef"/>
            <img style={{display: 'inline-block',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    width: '80px',
                    height: '80px',
                    marginTop: '2%',
                    marginLeft: '5%',
                    marginRight: '3%'}} src={'https://img.freepik.com/premium-vector/cartoon-drawing-of-a-chef_29937-8125.jpg'} alt="chef"/>

            </div>
        </div>
            <div className={styles['main__page-wrapper']}>
                <div className={styles['main__page-about']}>
                    <div className={styles['main__page-about-wrapper']}>
                        <ul className={styles['main__page-about-info']}>
                            <br /><br />
                            <li className={styles['main__page-about-item']}>Наша компания специализируется на приготовлении блюд.</li>
                            <li className={styles['main__page-about-item']}>Мы очень хороши!</li>
                            <li className={styles['main__page-about-item']}>Прям очень очень хороши!!</li>
                            <li className={styles['main__page-about-item']}>(текст мог бы быть лучше но мне не платят🥹)</li>
                            <li className={styles['main__page-about-item']}>Мы сделаем все возможное, чтобы предоставить вам ответ в кратчайшие сроки.</li>
                            <li className={styles['main__page-about-item']}>Более того, у вас есть возможность просмотреть полную историю ваших заявок.</li>
                            <li className={styles['main__page-about-item']}>Если у вас возникнут вопросы, наша служба поддержки всегда готова помочь вам!</li>
                        </ul>
                        <div className={styles['main__page-stats']}>
                            <div className={styles['main__page-stats-item']}>
                            <h3 className={styles['main__page-stats-title']}>1500</h3>
                                <p className={styles['main__page-stats-subtitle']}>Зарегестрированных пользователей</p>
                            </div>

                            <div className={styles['main__page-stats-item']}>
                                <h3 className={styles['main__page-stats-title']}>65</h3>
                                <p className={styles['main__page-stats-subtitle']}>Уникальных блюд</p>
                            </div>

                            <div className={styles['main__page-stats-item']}>
                                <h3 className={styles['main__page-stats-title']}>40</h3>
                                <p className={styles['main__page-stats-subtitle']}>Лучших поваров</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        //         <div className={styles['main__page-categories']}>
        //             <h2 className={styles['main__page-part-title']}>Доступные категории</h2>
        //             <div className={styles['main__page-categories-cards']}>
        //                 {categories.map(category => (
        //                 category.title !== 'Все категории' && <div key={category.id} className={styles['main__page-categories-card']}>
        //                     <h3 className={styles['main__page-categories-title']}>{category.title}</h3>
        //                 </div>
        //                 ))}
        //             </div>
        //         </div>
        //     </div>
        // </div>
    )
}

export default MainPage