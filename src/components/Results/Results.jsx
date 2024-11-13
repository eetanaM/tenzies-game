import React from "react"
import "./Results.css"

export default function Results({closeResults, movesCounter}) {
    return (
        <div className="modal">
            <div className="modal-table">
                <button
                    className="btn-close"
                    onClick={() => closeResults()}
                >x</button>
                Вы справились за {movesCounter} ходов!
            </div>
            <div className="overlay" onClick={() => closeResults()}></div>
        </div>
    )
}
