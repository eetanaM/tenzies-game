import React from "react"
import Modal from "../Modal/Modal"

export default function Results({closeResults, movesCounter}) {
    return (
        <Modal onClose={closeResults}>
            Вы справились за {movesCounter} ходов!
        </Modal>
    )
}
