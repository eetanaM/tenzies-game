import { Outlet, NavLink } from 'react-router-dom'
import { useState } from 'react'

import Modal from '../Modal/Modal'

import menu_img from "../../img/menu50.png"

import styles from './MobileLayout.module.css'

const MobileLayout = ({ user, isSigned, toggleSignIn, isModalOpened, openModal, closeModal }) => {

    return (
        <>
            {isModalOpened ?
                <Modal onClose={closeModal}>
                    <button className={styles.btn_close} onClick={closeModal}>x</button>
                    <nav className={`${styles.nav_container} ${!isSigned && styles.not_loged_in}`}>
                        {isSigned
                        ? <>
                            <div className={styles.nav_profile}>
                                <img src={`/src/img/avatars/${user.userImage}.png`} alt="Аватар" />
                                {user.userName}
                            </div>
                            <NavLink to="/" onClick={closeModal}>
                                Играть
                            </NavLink>
                            <NavLink to="/profile" onClick={closeModal}>
                                Профиль
                            </NavLink>
                            <NavLink to="/rating" onClick={closeModal}>
                                Рейтинг
                            </NavLink>
                            <button onClick={toggleSignIn}>
                                Выйти
                            </button>
                            </>
                        : <>
                            <button onClick={toggleSignIn}>
                                Войти гостем
                            </button>
                            </>
                        }
                    </nav>
                </Modal>
                :
                ""
            }
            <div className={styles.wrapper}>
                <main>
                    <div className='main--layout'>
                        <button
                            className={styles.menu_button}
                            onClick={openModal}
                        >
                            <img src={menu_img} alt="menu button image" />
                        </button>
                        <Outlet />
                    </div>
                </main>
            </div>
        </>
    )
}

export default MobileLayout
