import styles from "./ModalOverlay.module.css"

const ModalOverlay = ({ onClose }) => {
    return (
            <div
                className={styles.modal_overlay}
                onClick={onClose}
            >
            </div>
    )
}

export default ModalOverlay
