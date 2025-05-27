import React from "react"

import image1 from "../../img/avatars/1.png"
import image2 from "../../img/avatars/2.png"
import image3 from "../../img/avatars/3.png"
import image4 from "../../img/avatars/4.png"

import styles from "./ImageList.module.css"

export default function ImageList({ handleImageChange }) {

    const images = [
        image1,
        image2,
        image3,
        image4,
    ]

    const imagesToRender = images.map((image, index) => {
        return (
            <img src={image} onClick={() => handleImageChange(index + 1)} key={index}/>
        )
    })

    return (
        <>
            <div className={styles.container}>{imagesToRender}</div>
        </>
    )
}
