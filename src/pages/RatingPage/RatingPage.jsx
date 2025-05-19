import { useEffect, useState } from 'react'

import { db, auth } from '../../api/firebase/firebase.api'
import { collection, query, where, getDocs } from 'firebase/firestore'

import crown from '../../img/crown.png'
import styles from './RatingPage.module.css'

const RatingPage = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Выгружаем всех пользователей с Cloud Storage, сортируем по рекордам и записываем в state
        const q = query(collection(db, "users"), where("uid", "!=", "default uid"));
        const querySnapshot = getDocs(q)
        querySnapshot
            .then(data => {
                const docs = data.docs;
                const recievedUsers = docs.map(doc => {
                    const user = doc.data()
                    return user
                })
                const filteredUsers = recievedUsers.filter(user => user.record !== 0)
                filteredUsers.sort((a, b) => a.record - b.record)
                setUsers(filteredUsers)
            })
            .catch(e => {
                console.log(e)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    const usersRatings = users.map((user, index) => {
        const isCurrentUser = auth.currentUser.uid === user.uid
        if (index > 9) return
        return (
            <p className={`${styles.rating_line} ${isCurrentUser && styles.current_user}`} key={user.uid}>
                <span>{index === 0 ? <img src={crown} style={{height: "20px", width: "20px"}}></img>: index + 1}</span>
                <span>{user.userName}</span>
                <span>{user.record}</span>
            </p>
        )
    })

    if (loading) {
        return (
            <>
                <div className={styles.rating_container}>
                    <header className={styles.rating_header}>
                        <span>Загрузка...</span>
                    </header>
                </div>
            </>
        )
    }


    return (
        <>
            <div className={styles.rating_container}>
                <header className={styles.rating_header}>
                    <span>Лучшие результаты</span>
                </header>
                <p className={styles.rating_line_headers}>
                    <span>#</span>
                    <span>Имя</span>
                    <span>Ходов</span>
                </p>
                {usersRatings}
            </div>
        </>
    )
}

export default RatingPage
