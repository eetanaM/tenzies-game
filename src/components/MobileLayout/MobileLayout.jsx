import { Outlet, NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'

import Modal from '../Modal/Modal'

import menu_img from "../../img/menu50.png"
import image1 from "../../img/avatars/1.png"
import image2 from "../../img/avatars/2.png"
import image3 from "../../img/avatars/3.png"
import image4 from "../../img/avatars/4.png"
import emptyImage from "../../img/avatars/empty.png"

import styles from './MobileLayout.module.css'

const MobileLayout = ({ user, isSigned, toggleSignIn, isModalOpened, openModal, closeModal }) => {

    const [isMenuOpened, setIsMenuOpened] = useState(false)
    const [profileImage, setProfileImage] = useState(emptyImage)

    useEffect(() => {
        switch (user.userImage) {
            case 1:
                setProfileImage(image1);
                break;
            case 2:
                setProfileImage(image2);
                break;
            case 3:
                setProfileImage(image3);
                break;
            case 4:
                setProfileImage(image4);
                break;
        }
    }, [user.userImage])

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
                                <img src={profileImage} alt="Аватар" />
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
