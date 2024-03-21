import React, { useContext, useEffect, useMemo, useState } from "react";
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { FirebaseContext } from "../contexts/FirebaseProvider";
import { addDoc, onSnapshot, query } from "firebase/firestore";

export default function Checkout() {
  let [detailbank, setDetailbank] = useState(false)
  let [detailcash, setDetailCash] = useState(false)
  let [data, setData] = useState([])
  let storage = []
  let ordered = []
  if (localStorage.getItem('yourcart') !== null) {
    storage = JSON.parse(localStorage.getItem('yourcart'))
  }
  if (localStorage.getItem('orderPlaced') !== null) {
    ordered = JSON.parse(localStorage.getItem('orderPlaced'))
  }
  let { values, handleSubmit, handleChange, setFieldValue, touched, errors } = useFormik({
    initialValues: {
      customer: '',
      id: '',
      firstname: '',
      lastname: '',
      company: '',
      house: '',
      apartment: '',
      state: '',
      country: '',
      towncity: '',
      note: '',
      zip: '',
      bank: '',
      phone: '',
      date: new Date().toLocaleDateString()
    }, onSubmit: async (values) => {
      if (storage.length > 0) {
        await addDoc(messCustomer, { costumer: values, cart: storage });
        // MOVE TO ORDERED
        ordered = [...ordered, { orderId: ordered.length + 1, orderPlaced: JSON.parse(localStorage.getItem('yourcart')) }]
        localStorage.setItem('orderPlaced', JSON.stringify(ordered))
        console.log(ordered)
        localStorage.removeItem('yourcart')
      }
    },
    validationSchema: Yup.object({
      firstname: Yup.string().required("* firstname is a required field").min(2),
      lastname: Yup.string().required("* lastname is a required field").min(2),
      house: Yup.string().required("* housename is a required field").min(4),
      towncity: Yup.string().required("* towncity is a required field").min(2),
      zip: Yup.number().required("* zip is a required field").min(2)
    })
  })

  const { messCustomer } = useContext(FirebaseContext)
  // useEffect(() => {
  //   const q = query(messCustomer);
  //   const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //     const temp = [];
  //     querySnapshot.forEach((doc) => {
  //       temp.push({ ...doc.data(), id: doc.id });
  //     });
  //     setData(temp)
  //   });
  // }, [])
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

  let showdetail = ((type) => {
    if (type == 'bank') {
      setDetailbank(true)
      setDetailCash(false)
      setFieldValue('bank', true)
    } else {
      setDetailbank(false)
      setDetailCash(true)
      setFieldValue('bank', false)
    }
  })

  let renderProduct = (() => {
    if (storage.length > 0) {
      return storage.map((it) => {
        let findIndex=data.findIndex((product)=>{
          return it?.id==product?.id
        })
        let productdata=data[findIndex]
        let findColor=productdata?.productColor.findIndex((product)=>{
          return product?.colorCode==it?.color
        })
        let totalprice=(productdata?.price * it?.amount)
        return (
          <tr key={it?.id}>
            <td className="product-name"><img src={productdata?.img[findColor]} alt="product" /><span>{productdata?.productName}</span></td>
            <td className="product-price">${totalprice} x {it?.amount}</td>
          </tr>
        )
      })
    }
  })

  let rendersubtotal= (()=>{
    if (storage !== null) {
      let allsubtotal = 0
      let subtotal = 0
      storage.map((product) => {
        let findIndex = data.findIndex((it) => {
          return it.id == product.id
        })
        let dataProduct = data[findIndex]
        subtotal = dataProduct?.price * product?.amount
        allsubtotal += subtotal
      })
      return allsubtotal
    }
  })
  let rendertotal=(()=>{
    return rendersubtotal()+20
  })
  return (
    <div>
      <div className="aboutUs_Header">
        <div className="TitleBox">
          <h3>Check out</h3>
        </div>
        <div className="checkout-container">
          <form onSubmit={handleSubmit}>
            <div className="checkout_form">
              <div className="checkout_info">
                <p className="tag-name">Customer information</p>
                <input type="email" onChange={handleChange} id="customer" placeholder="Email Address" value={values.customer} />
              </div>
              <div className="checkout_info">
                <p className="tag-name">Billing details</p>
                <div className="type-section">
                  <input type="text" onChange={handleChange} placeholder="First Name" id="firstname" value={values.firstname} />
                  <input type="text" onChange={handleChange} placeholder="Last Name" id="lastname" value={values.lastname} />
                </div>
                <div className="type-section">
                  {touched.firstname && <p className="error">{errors.firstname}</p>}
                  {touched.lastname && <p className="error">{errors.lastname}</p>}
                </div>
                <input type="text" onChange={handleChange} placeholder="Company Name" id="company" value={values.company} />
                <select value={values.country} onChange={handleChange} id="country">
                  <option value="">Select your country</option>
                  <option value="Mexico">Mexico</option>
                  <option value="Iceland">Iceland</option>
                  <option value="South Korea">South Korea</option>
                  <option value="Samoa">Samoa</option>
                  <option value="Poland">Poland</option>
                  <option value="Samoa">Samoa</option>
                  <option value="Peru">Peru</option>
                  <option value="Norway">Norway</option>
                  <option value="Niger">Niger</option>
                  <option value="New Zealand">New Zealand</option>
                  <option value="Vietnam">Vietnam</option>
                  <option value="Tokyo">Tokyo</option>
                  <option value="Thailand">Thailand</option>
                </select>
                <div className="type-section">
                  <input type="text" onChange={handleChange} id="house" placeholder="House number and street name" value={values.house} />
                  <input type="text" onChange={handleChange} id="apartment" placeholder="Apartment, suite, unit, etc..." value={values.apartment} />
                </div>
                <div className="type-section">
                  {touched.house && <p className="error">{errors.house}</p>}
                </div>
                <div className="type-section address">
                  <input type="text" onChange={handleChange} id="towncity" placeholder="Town / City" />
                  <select type="text" value={values.state} onChange={handleChange} id="state">
                    <option value="">State</option>
                    <option value="Midway Atoll">Midway Atoll</option>
                    <option value="Wake Island">Wake Island</option>
                    <option value="Baker Island">Baker Island</option>
                    <option value="Johnston Atoll">Johnston Atoll</option>
                    <option value="Navassa">Navassa</option>
                  </select>
                  <input type="number" onChange={handleChange} id="zip" placeholder="Postcode / Zip" value={values.zip} />
                </div>
                <div className="type-section address">
                  {touched.towncity && <p className="error">{errors.towncity}</p>}
                  {touched.zip && <p className="error">{errors.zip}</p>}
                </div>
                <input type="tel" onChange={handleChange} id="phone" placeholder="Phone" value={values.phone} required />
              </div>
              <div className="checkout_info">
                <p className="tag-name">Additional information</p>
                <input type="text" onChange={handleChange} id="note" placeholder="Note about your order, e.g. special notes for delivery" value={values.note} />
              </div>
              <div className="checkout_info bank-section">
                <label className="tag-name">Payment</label>
                <label className="type-bank"><input type="radio" name="pay-type" id="pay-type" onChange={() => showdetail('bank')} /><span>Direct bank transfer</span></label>
                {detailbank && <p className="detail-payment">Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.</p>}
                <label className="type-bank"><input type="radio" name="pay-type" id="pay-type" onChange={() => showdetail('cash')} /><span>Cash on delivery</span></label>
                {detailcash && <p className="detail-payment">Pay with cash upon delivery.</p>}
              </div>
              <button type="submit" className="button_submit">Place Order</button>
            </div>
          </form>
          <div className="your-order">
            <p className="tag-name">Your order</p>
            <table cellSpacing={0}>
              <thead>
                <tr>
                  <th className="product-name product-name-tag">Product</th>
                  <th className="product-price product-name-tag">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {renderProduct()}
              </tbody>
              <tfoot>
                <tr>
                  <th className="subtotal-name">Subtotal</th>
                  <th className="subtotal-price">+ $20 | ${rendersubtotal()}</th>
                </tr>
                <tr>
                  <th className="total-name">Total</th>
                  <th className="total-price">${rendertotal()}</th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
