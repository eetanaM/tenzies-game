import { Outlet, NavLink } from 'react-router-dom'
import { useState } from 'react'

import Modal from '../Modal/Modal'

import menu_img from "../../img/menu50.png"
import userImage from '../../img/empty-user1.png'

import styles from './MobileLayout.module.css'

const MobileLayout = ({ user, isSigned, toggleSignIn }) => {

    const [isMenuShown, setIsMenuShown] = useState(false)

    function openMenu() {
        setIsMenuShown(true)
    }

    function closeMenu() {
        setIsMenuShown(false)
    }

    return (
        <>
            {isMenuShown ?
                <Modal onClose={closeMenu}>
                    <button className={styles.btn_close} onClick={closeMenu}>x</button>
                    <nav className={`${styles.nav_container} ${!isSigned && styles.not_loged_in}`}>
                        {isSigned
                        ? <>
                            <div className={styles.nav_profile}>
                                <img src={userImage} alt="Аватар" />
                                {user.userName}
                            </div>
                            <NavLink to="/" onClick={closeMenu}>
                                Играть
                            </NavLink>
                            <NavLink to="/profile" onClick={closeMenu}>
                                Профиль
                            </NavLink>
                            <NavLink to="/rating" onClick={closeMenu}>
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
                            onClick={openMenu}
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
