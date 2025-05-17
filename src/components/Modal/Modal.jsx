import ReactDOM from "react-dom"
import { useEffect } from "react"

import ModalOverlay from "../ModalOverlay/ModalOverlay"

import styles from "./Modal.module.css"

const modalRoot = document.querySelector('#react-modals')

const Modal = ({ children, onClose }) => {

    useEffect(() => {
        function closeByEscape(e) {
            if (e.key === "Escape") onClose()
        }

        window.addEventListener('keydown', closeByEscape);

        return () => {
            window.removeEventListener('keydown', closeByEscape)
        }
    }, [])

    return ReactDOM.createPortal(
        (
            <>
                <ModalOverlay onClose={onClose}/>
                <div className={styles.modal}>
                    <div className={styles.modal_table}>
                        <button className={styles.btn_close} onClick={onClose}>x</button>
                        {children}
                    </div>
                </div>
            </>
        ),
        modalRoot
    )
}

export default Modal
