import { useEffect, useState } from 'react'

import { doc, updateDoc } from 'firebase/firestore'
import { auth, db, loadAllUsers } from '../../api/firebase/firebase.api'

import Modal from '../../components/Modal/Modal'
import ImageList from '../../components/ImageList/ImageList'

import style from './ProfilePage.module.css'

const ProfilePage = ({ user, isModalOpened, openModal, closeModal, updateUser }) => {

    if (user.userImage === 'empty') {
        user.userImage = 'empty-black'
    }

    const [isFormOpened, setIsFormOpened] = useState(false);
    const [isImageListOpened, setIsImageListOpened] = useState(false);
    const [users, setUsers] = useState([]);
    const [errors, setErrors] = useState({
        nameIsEmpty: false,
        nameIsTooLarge: false,
        nameAlreadyExists: false,
    })
    const [formData, setFormData] = useState({
        name: '',
    });

    useEffect(() => {
        loadAllUsers()
            .then(response => {
                const recievedUsers = response.docs.map(queryDoc => {
                    return queryDoc.data()
                });
                setUsers(recievedUsers)
            })
    }, [])

    const openInstance = (instanceName) => {
        if (instanceName === 'form')
            {
                setIsFormOpened(true)
            }
        if (instanceName === 'imageList')
            {
                setIsImageListOpened(true)
            }
        openModal()
    }

    const closeInstance = (instanceName) => {
        if (instanceName === 'form')
            {
                setIsFormOpened(false)
            }
        if (instanceName === 'imageList')
            {
                setIsImageListOpened(false)
            }
        closeModal()
    }

    const resetAndClose = () => {
        setErrors({
            nameIsEmpty: false,
            nameIsTooLarge: false,
        })
        setFormData({
            name: '',
        })
        closeInstance('form')
        closeInstance('imageList')
    }

    const validateForm = () => {
        let valid = true;
        const newErrors = {
          nameIsEmpty: formData.name.trim() === '',
          nameIsTooLarge: formData.name.length > 10,
          nameAlreadyExists: users.findIndex((user) => {
            return user.userName === formData.name
          }) >= 0,
        };

        setErrors(newErrors);

        if (newErrors.nameIsEmpty || newErrors.nameIsTooLarge || newErrors.nameAlreadyExists) {
          valid = false;
        }

        return valid;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    async function handleSubmit(e) {
        e.preventDefault()
        if (!validateForm()) {
            return
        }

        try {
            // Update user's name
            const currentUserRef = doc(db, "users", auth.currentUser.uid)
            await updateDoc(currentUserRef, 'userName', formData.name)
            updateUser(formData.name)
        } catch (e) {
        console.error("Error updating user's name: ", e)
        }

        setFormData({
            name: '',
        })
        closeInstance('form')
    }

    async function handleImageChange(imageId) {
        try {
            // Update user's image
            const currentUserRef = doc(db, "users", auth.currentUser.uid)
            await updateDoc(currentUserRef, 'userImage', imageId)
            updateUser(null, imageId)
        } catch (e) {
        console.error("Error updating user's image: ", e)
        }
        closeInstance('imageList')
    }

    return (
        <>
            {isModalOpened && isFormOpened ?
                <Modal onClose={resetAndClose}>
                    <button className={style.btn_close} onClick={resetAndClose}>x</button>
                    <form className={style.nameForm} onSubmit={handleSubmit}>
                        <input
                            name="name"
                            type="text"
                            placeholder='Введите новое имя'
                            onChange={handleChange}
                            autoComplete="off"
                        />
                        {errors.nameIsEmpty && <p className={style.error}>Введите имя</p>}
                        {errors.nameIsTooLarge && <p className={style.error}>Имя не может содержать более 10 символов</p>}
                        {errors.nameAlreadyExists && <p className={style.error}>Пользователь с таким именем уже существует</p>}
                        <button className={style.submitButton}>Подтвердить</button>
                    </form>
                </Modal>
            : null
            }
            {isModalOpened && isImageListOpened ?
                <Modal onClose={resetAndClose}>
                    <button className={style.btn_close} onClick={resetAndClose}>x</button>
                    <ImageList handleImageChange={handleImageChange}/>
                </Modal>
            : null
            }
            <div className={style.profile}>
                <h2>
                    Данные профиля
                </h2>
                <img className={style.avatar} src={`/img/avatars/${user.userImage}.png`} alt="avatar" onClick={() => openInstance('imageList')}/>
                <i>* щелкните по аватару, чтобы изменить изображение</i>
                <p className={style.name}>
                    {user.userName}
                </p>
                <button className={style.btn} onClick={() => openInstance('form')}>
                    Изменить имя
                </button>
            </div>
        </>
    )
}

export default ProfilePage
