import React, { useState } from 'react'
import { FaEye } from "react-icons/fa";
import { PiBasket } from "react-icons/pi";
import { Navigate, useNavigate } from 'react-router-dom';

export default function FeaturedProd(props) {
    let [img, setImg] = useState(props.it.img[0])
    let [count,setCount]=useState(1)
    let navigate=useNavigate()

    let findCategories=(props.it.featrured)

    let checkStock='Sale!'
    if(props.it.stock=='out of stock'){
        checkStock='Out of stock'
    }

    let [colorCode, setColorCode] = useState(props.it.productColor[0].colorCode)
    const changeColor = (color,colorCode) => {
        setColorCode(colorCode)
        console.log(colorCode)
        setImg(color)
    }

    let addtoCart = () => {
        if (props.it.stock == 'out of stock') {
          alert('hết hàng')
        } else {
          let cartstorage = []
          if (localStorage.getItem('yourcart') !== null) {
            cartstorage = JSON.parse(localStorage.getItem('yourcart'))
          }
          let yourcart = {
            id: props.it.id,
            color:colorCode,
            amount: count
          }
          let findcart = cartstorage.findIndex((it) => {
            return it.id == yourcart.id
          })
          if (findcart > -1) {
            cartstorage[findcart].amount += yourcart.amount
          } else {
            cartstorage.push(yourcart)
          }
          localStorage.setItem('yourcart', JSON.stringify(cartstorage))
        }
      }

    if(findCategories == 1){
        return (
            <div className="item">
                <img src={img} alt="item" />
                <p className='sale'>{checkStock}</p>
                <div className="button-section">
                <i onClick={addtoCart}><PiBasket/></i>
                <i onClick={()=>{navigate('/productdetail/'+props.it.id)}}><FaEye /></i>
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
