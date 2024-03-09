import React, { useState } from 'react'
import { FaEye } from "react-icons/fa";
import { PiBasket } from "react-icons/pi";

export default function ProductItem(props) {
    let [img, setImg] = useState(props.it.img[0])

    let findCategories=(props.it.categories).findIndex((name)=>{
        return name==props.categories
    })

    let checkStock='Sale!'
    if(props.it.stock=='out of stock'){
        checkStock='Out of stock'
    }

    const changeColor = (color) => {
        setImg(color)
    }

    if(findCategories>-1 || props.categories=='Shop All'){
        return (
            <div className="item">
                <img src={img} alt="item" />
                <p className='sale'>{checkStock}</p>
                <div className="button-section">
                <i><PiBasket/></i>
                <i><FaEye /></i>
                </div>
                <p className="item-name">{props.it.productName}</p>
                <p className="item-price">${props.it.price}</p>
                <div className="color-section">
                    <div className="match-color" style={{ backgroundColor: `${props.it.productColor[0].colorCode}` }} onClick={() => changeColor(`${props.it.img[0]}`)}></div>
                    <div className="match-color" style={{ backgroundColor: `${props.it.productColor[1].colorCode}` }} onClick={() => changeColor(`${props.it.img[1]}`)}></div>
                    <div className="match-color" style={{ backgroundColor: `${props.it.productColor[2].colorCode}` }} onClick={() => changeColor(`${props.it.img[2]}`)}></div>
                </div>
            </div>
        )
    }
}
