import { Outlet } from 'react-router-dom'

import SideBar from '../SideBar/SideBar'

import styles from './Layout.module.css'

const Layout = (props) => {

    const { user, isSigned, toggleSignIn } = props

    return (
        <div className={styles.wrapper}>
            <SideBar user={user} isSigned={isSigned} toggleSignIn={toggleSignIn}/>
            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default Layout