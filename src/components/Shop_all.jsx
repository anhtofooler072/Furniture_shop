import { addDoc, deleteDoc, onSnapshot, query, doc, updateDoc } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { FirebaseContext } from '../contexts/FirebaseProvider';
import ProductItem from './ProductItem';

export default function Shop_all(props) {  
  let [data, setData] = useState([])
  const { messItem } = useContext(FirebaseContext)
  useEffect(() => {
    const q = query(messItem);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const temp = [];
      querySnapshot.forEach((doc) => {
        temp.push({ ...doc.data(), id: doc.id });
      });
      setData(temp)
    });
  }, [])

  const renderProduct = () => {
    return data.map((it) => {
      return <ProductItem it={it} categories='Shop All' key={it.id}/>
    })
  }

  return (
    <div className='bg-product'>
      <div className="body-product">
        <div className="title-product">
          <p className='categories-tags'>Home / {props.categories}</p>
          <p className="categories-name">{props.categories}</p>
        </div>
        <div className="product-section">
          <div className="toolbar-product">
            <p className="show-result">Showing 1-9 of 16 results</p>
            <select name="" id="" className="sort-section">
              <option value="default">Default sorting</option>
              <option value="price-low">Sort by price: low to hight</option>
              <option value="price-hight">Sort by price: hight to low</option>
            </select>
          </div>
          <div className="item-list">
            {renderProduct()}
          </div>
        </div>
      </div>
    </div>
  )
}





