import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'

import image1 from "../../img/avatars/1.png"
import image2 from "../../img/avatars/2.png"
import image3 from "../../img/avatars/3.png"
import image4 from "../../img/avatars/4.png"
import emptyImage from "../../img/avatars/empty.png"

import styles from './SideBar.module.css'

const SideBar = ({ user, isSigned, toggleSignIn } ) => {
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
  return (
      <>
          <div className={styles.sidebar_opener}></div>
          <aside className={`${styles.sidebar_container} ${!isSigned && styles.not_loged_in}`}>
              {isSigned
              ? <>
                  <div className={styles.sidebar_profile}>
                      {/* Исправить src на импорты */}
                      <img src={`/src/img/avatars/${user.userImage}.png`} alt="Аватар" />
                      {user.userName}
                  </div>
                  <NavLink to="/">
                      Играть
                  </NavLink>
                  <NavLink to="/profile">
                      Профиль
                  </NavLink>
                  <NavLink to="/rating">
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
          </aside>
      </>
  )
}

export default SideBar
