import React from "react"

import styles from "./ImageList.module.css"

export default function ImageList({ handleImageChange }) {

    const images = [
        1,
        2,
        3,
        4,
    ]

    const imagesToRender = images.map((image, index) => {
        return (
            <img src={`/img/avatars/${image}.png`} onClick={() => handleImageChange(image)} key={index}/>
        )
    })

    return (
        <>
            <div className={styles.container}>{imagesToRender}</div>
        </>
    )
}
