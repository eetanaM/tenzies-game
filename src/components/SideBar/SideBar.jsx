import { NavLink } from 'react-router-dom'

import userImage from '../../img/empty-user1.png'

import styles from './SideBar.module.css'

const SideBar = (props) => {
  const { user, isSigned, toggleSignIn } = props
  return (
      <>
          <div className={styles.sidebar_opener}></div>
          <aside className={`${styles.sidebar_container} ${!isSigned && styles.not_loged_in}`}>
              {isSigned
              ? <>
                  <div className={styles.sidebar_profile}>
                      <img src={userImage} alt="Аватар" />
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
