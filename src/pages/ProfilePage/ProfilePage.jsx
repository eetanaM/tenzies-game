import { useState } from 'react'
import Modal from '../../components/Modal/Modal'

import style from './ProfilePage.module.css'

const ProfilePage = ({ user, isModalOpened, openModal, closeModal }) => {

    const [isFormOpened, setIsFormOpened] = useState(false)

    const openForm = () => {
        setIsFormOpened(true)
        openModal()
    }

    const closeForm = () => {
        setIsFormOpened(false)
        closeModal()
    }

    const [errors, setErrors] = useState({
        nameIsEmpty: false,
        nameIsTooLarge: false,
    })
    const [formData, setFormData] = useState({
        name: '',
    });

    const resetAndClose = () => {
        setErrors({
            nameIsEmpty: false,
            nameIsTooLarge: false,
        })
        setFormData({
            name: '',
        })
        closeForm()
    }

    const validateForm = () => {
        let valid = true;
        const newErrors = {
          nameIsEmpty: formData.name.trim() === '',
          nameIsTooLarge: formData.name.length > 10,
        };

        setErrors(newErrors);

        if (newErrors.nameIsEmpty || newErrors.nameIsTooLarge) {
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

    function handleSubmit(e) {
        e.preventDefault()
        if (!validateForm()) {
            return
        }
        setFormData({
            name: '',
        })
        closeForm()
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
                        <button className={style.submitButton}>Подтвердить</button>
                    </form>
                </Modal>
            : null
            }
            <div className={style.profile}>
                <h2>
                    Данные профиля
                </h2>
                <img className={style.avatar} src={`/src/img/avatars/${user.userImage}-black.png`}alt="avatar" />
                <i>* щелкните по аватару, чтобы изменить изображение</i>
                <p className={style.name}>
                    {user.userName}
                </p>
                <button className={style.btn} onClick={openForm}>
                    Изменить имя
                </button>
            </div>
        </>
    )
}

export default ProfilePage
