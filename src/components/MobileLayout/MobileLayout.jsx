import { Outlet, NavLink } from 'react-router-dom'
import { useState } from 'react'

import Modal from '../Modal/Modal'

import styles from './MobileLayout.module.css'

const MobileLayout = ({ user, isSigned, toggleSignIn, isModalOpened, openModal, closeModal }) => {

    const [isMenuOpened, setIsMenuOpened] = useState(false)

    const openMenu = () => {
        setIsMenuOpened(true)
        openModal()
    }

    const closeMenu = () => {
        setIsMenuOpened(false)
        closeModal
    }

    return (
        <>
            {isModalOpened && isMenuOpened ?
                <Modal onClose={closeMenu}>
                    <button className={styles.btn_close} onClick={closeMenu}>x</button>
                    <nav className={`${styles.nav_container} ${!isSigned && styles.not_loged_in}`}>
                        {isSigned
                        ? <>
                            <div className={styles.nav_profile}>
                                <img src={`/img/avatars/${user.userImage}.png`} alt="Аватар" />
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
                            <img src={"/img/menu50.png"} alt="menu button image" />
                        </button>
                        <Outlet />
                    </div>
                </main>
            </div>
        </>
    )
}

export default MobileLayout
