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
                    {children}
                </div>
            </>
        ),
        modalRoot
    )
}

export default Modal
