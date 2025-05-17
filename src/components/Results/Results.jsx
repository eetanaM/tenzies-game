import React from "react"
import Modal from "../Modal/Modal"

import styles from "./Results.module.css"

export default function Results({closeResults, movesCounter}) {
    return (
        <Modal onClose={closeResults}>
            <button className={styles.btn_close} onClick={onClose}>x</button>
            <div className={styles.modal_table}>
                Вы справились за {movesCounter} ходов!
            </div>
        </Modal>
    )
}
