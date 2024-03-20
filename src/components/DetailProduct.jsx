import React, { useContext, useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FirebaseContext } from '../contexts/FirebaseProvider'
import { doc, getDoc, onSnapshot, query, updateDoc } from 'firebase/firestore'
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { FaCcVisa } from "react-icons/fa";
import { FaCcMastercard } from "react-icons/fa";
import { SiAmericanexpress } from "react-icons/si";
import { FaCcDiscover } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { FaCheckCircle } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { PiBasket } from "react-icons/pi";
import { FaEye } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { useFormik } from 'formik'
import * as Yup from 'yup'

export default function DetailProduct() {
  let param = useParams()
  let navigate = useNavigate()
  const { messItem } = useContext(FirebaseContext)

  let [allData, setAllData] = useState([])
  let singledoc = doc(messItem, param.id)
  let [data, setData] = useState(null)

  let { values, handleSubmit, handleChange, setFieldValue, touched, errors } = useFormik({
    initialValues: {
      name: '',
      email: '',
      rating: 0,
      review: ''
    }, onSubmit: (values) => {
      data.reviewComment.push(values)
      updateItem(param.id, data)
    },
    validationSchema: Yup.object({
      name: Yup.string().required().min(2),
      email: Yup.string().required().email().matches(/@gmail\.com$/, 'Email must be a valid Gmail address'),
      review: Yup.string().required().min(2)
    })
  })
  const updateItem = async (id, obj) => {
    await updateDoc(doc(messItem, id), obj);
  }

  // lấy 1 data
  useEffect(() => {
    let getmess = async () => {
      const data = await getDoc(singledoc)
      setData(data.data())
      setColorImg(data.data().img[0])
    }
    getmess()
  }, [])

  // lấy hết data
  useEffect(() => {
    const q = query(messItem);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const temp = [];
      querySnapshot.forEach((doc) => {
        temp.push({ ...doc.data(), id: doc.id });
      });
      setAllData(temp)
    });
  }, [])

  let roundPrice = () => {
    let price = data?.price
    let floor = Math.floor(data?.price * (1 - data?.discount / 100))
    if (price - floor > 0.5) {
      return floor + 1
    } else {
      return floor
    }
  }
  let renderCategories = () => {
    let Categories = []
    for (let i = 0; i < data?.categories.length; i++) {
      Categories.push(data.categories[i])
    }
    return <span className="categories-header-2">{Categories.join(', ')}</span>
  }

  let renderColor = () => {
    let productColor = []
    for (let i = 0; i < data?.productColor.length; i++) {
      productColor.push(data.productColor[i].nameColor)
    }
    return <p className="color-name">{productColor.join(', ')}</p>
  }

  let [colorImg, setColorImg] = useState('')
  let [colorCode, setColorCode] = useState(data?.productColor[0].colorCode)
  let changeColor = (color, colorcode) => {
    setColorCode(colorcode)
    setColorImg(color)
  }

  let [count, setCount] = useState(1)
  let countCart = (type) => {
    if (type == 'plus') {
      setCount(count + 1)
    } else if (type == 'minius' && count > 1) {
      setCount(count - 1)
    }
  }

  let handleChangeValue = (e) => {
    return e.target.value
  }

  let renderSale = () => {
    let checkStock = 'Sale!'
    if (data?.stock == 'out of stock') {
      checkStock = 'Out of stock'
    }
    return <p className="sale">{checkStock}</p>
  }

  let addtoCart = () => {
    if (data.stock == 'out of stock') {
      alert('hết hàng')
    } else {
      let cartstorage = []
      if (localStorage.getItem('yourcart') !== null) {
        cartstorage = JSON.parse(localStorage.getItem('yourcart'))
      }
      let yourcart = {
        id: param.id,
        amount: count,
        color: colorCode
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
  const renderRelated = useMemo(() => {
    let related = []
    let randomNumber = 0
    let i = 0
    do {
      randomNumber = Math.floor(Math.random() * allData.length)
      if (allData[randomNumber]) {
        related.push(allData[randomNumber]);
      }
      i++
    } while (i < 4)
    return related.map((it, index) => {
      let checkStock = 'Sale!'
      if (it?.stock == 'out of stock') {
        checkStock = 'Out of stock'
      }

      return (
        <div className="item" key={index}>
          <img src={it?.img[0]} alt="item" />
          <p className='sale'>{checkStock}</p>
          <div className="button-section">
            <i onClick={addtoCart}><PiBasket /></i>
            <i onClick={() => {
              navigate('/productdetail/' + it?.id)
              window.location.reload()
            }}><FaEye /></i>
          </div>
          <p className="item-name">{it?.productName}</p>
          <p className="item-price">${it?.price}</p>
        </div>)
    })

  }, [allData])


  let [star, setStar] = useState(0)
  let renderStar = (id) => {
    setStar(id)
    setFieldValue('rating', id)
  }

  let countReview = () => {
    return data?.reviewComment.length
  }

  const deleteComment = async (indexToDelete) => {
    const newReviewComments = [...data.reviewComment];
    newReviewComments.splice(indexToDelete, 1);
    await updateDoc(singledoc, { reviewComment: newReviewComments });
    setData(prevData => ({
      ...prevData,
      reviewComment: newReviewComments
    }));
  }



  let renderReview = () => {
    if ((data?.reviewComment.length) == 0) {
      return (
        <p className='no-review'>There are no reviews yet.</p>
      )
    } else if ((data?.reviewComment.length) > 0) {
      return data?.reviewComment.map((it, index) => {
        let star = []
        for (let i = 0; i < it.rating; i++) {
          star.push(<FaStar />)
        }
        if (star.length < 5) {
          for (let y = star.length; y < 5; y++) {
            star.push(<CiStar />)
          }
        }
        let mail = it.email.slice(0, 2)
        return (
          <div className="user-comment" key={index}>
            <button onClick={() => { deleteComment(index) }} className="delete-comment">X</button>
            <span className="comment-name">{it.name}</span>
            <span className='comment-mail'>{mail}...@mail.com</span>
            <span className='comment-rating'>{star}</span>
            <p className='slice-border'></p>
            <p className="comment">{it.review}</p>
          </div>
        )
      })
    }
  }
  return (
    <div className="bg-product">
      <div className='product-detail'>

        {/* product */}

        <div className="detail-section">
          <div className="product-img">
            <img src={colorImg} alt="item" />
            {renderSale()}
            <div className="another-img">
              <img src={data?.img[1]} alt="item" />
              <img src={data?.img[2]} alt="item" />
            </div>
          </div>
          <div className="product-buy">
            <div className="header-detail">
              <p className="categories-header">Home / {data?.categories[0]} / {data?.productName}</p>
            </div>
            {renderCategories()}
            <p className='product-name'>{data?.productName}</p>
            <h4 className='product-price'>${data?.price}.00 - ${roundPrice()}.00</h4>
            <span className='free-ship'> & Free Shipping</span>
            <p className="product-description">{data?.description}</p>
            <div className="color-section">
              <div className="match-color" style={{ backgroundColor: `${data?.productColor[0].colorCode}` }} onClick={() => changeColor(`${data?.img[0]}`, `${data?.productColor[0].colorCode}`)}></div>
              <div className="match-color" style={{ backgroundColor: `${data?.productColor[1].colorCode}` }} onClick={() => changeColor(`${data?.img[1]}`, `${data?.productColor[1].colorCode}`)}></div>
              <div className="match-color" style={{ backgroundColor: `${data?.productColor[2].colorCode}` }} onClick={() => changeColor(`${data?.img[2]}`, `${data?.productColor[2].colorCode}`)}></div>
            </div>
            <div className="add-cart-section">
              <button onClick={() => countCart('minius')}>-</button>
              <input type="text" value={count} onChange={handleChangeValue} />
              <button onClick={() => countCart('plus')}>+</button>
              <button className='addtocart' onClick={addtoCart}>ADD TO CART</button>
            </div>
            <div className="product-meta">
              <span>SKU: N/A</span>
              <span>Categories: {renderCategories()}</span>
            </div>
            <div className="bank-list">
              <span className='title-bank'>Guaranteed Safe Checkout</span>
              <div className="bank-content">
                <div className="bank-type bank-visa"><FaCcVisa /></div>
                <div className="bank-type bank-mastercard"><FaCcMastercard /></div>
                <div className="bank-type bank-American"><SiAmericanexpress /></div>
                <div className="bank-type bank-discover"><FaCcDiscover /></div>
              </div>
            </div>
            <div className="freeShip-section">
              <b>Free shipping on orders over $50!</b>
              <p><FaCheckCircle /> No-Risk Money Back Guarantee!</p>
              <p><FaCheckCircle /> No Hassle Refunds</p>
              <p><FaCheckCircle /> Secure Payments</p>
            </div>
          </div>
        </div>

        {/* description */}

        <div className="description-section">
          <h4 className='title'>Description</h4>
          <div className="padding-information">
            <div className="few-word">
              <h4>A few words about the product</h4>
              <div className="information">
                <p className="title">Aenean pretium, sem vitae gravida tincidunt, justo diam tempus mauris.</p>
                <p className="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vestibulum erat leo, id pulvinar lorem maximus sit amet. Quisque mauris sem, sagittis sed blandit eu, varius a tortor. Quisque aliquam ligula sed quam pulvinar, vitae ullamcorper metus imperdiet.</p>
              </div>
            </div>

            {/* featurese  */}
            <div className="features">
              <div className="information">
                <h4>Features</h4>
                <p className='description'>Ut at ante diam. Vestibulum tincidunt lacus quis odio iaculis, nec iaculis ipsum hendrerit. Curabitur nec fringilla sem. Nullam at diam et ligula tincidunt luctus. Ut fringilla vitae orci eget suscipit. Etiam ultricies justo ac feugiat dignissim. Suspendisse in ultrices massa.</p>
                <div className="list-feature">
                  <p><FaCheck /> Etiam eu tortor tempor, malesuada</p>
                  <p><FaCheck /> Nunc vitae erat sit amet neque varius consequat</p>
                  <p><FaCheck /> Lorem ipsum dolor sit amet</p>
                </div>
              </div>
              <div className="img-section">
                <div className="img-featurse"></div>
              </div>
            </div>
            {/* Care Instructions */}
            <div className="instruction">
              <div className="img-section">
                <div className="img-featurse"></div>
              </div>
              <div className="information">
                <h4>Care Instructions</h4>
                <div className="list-instruction">
                  <p><FaCheck /> Etiam eu tortor tempor, malesuada</p>
                  <p><FaCheck /> Nunc vitae erat sit amet neque varius consequat</p>
                  <p><FaCheck /> Vivamus lobortis posuere ante</p>
                  <p><FaCheck /> Morbi nisi diam, cursus non ultricies non</p>
                  <p><FaCheck /> Lorem ipsum dolor sit amet</p>
                </div>
                <p className="note"><b>NOTE:</b>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
              </div>
            </div>
          </div>

          {/* Warranty */}

          <div className="warranty">
            <div className="padding-information">
              <h4>Warranty:</h4>
              <div className="information-warranty">
                <p>In ex nisi, viverra in condimentum in, volutpat vel quam maximus</p>
                <p className='description'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vestibulum erat leo, id pulvinar lorem maximus sit amet. Quisque mauris sem, sagittis sed blandit eu.</p>
              </div>
              <div className="list-warranty">
                <p><FaCheck style={{ marginRight: 8 }} /> Etiam eu tortor tempor, malesuada</p>
                <p><FaCheck style={{ marginRight: 8 }} /> Nunc vitae erat sit amet neque varius sit</p>
                <p><FaCheck style={{ marginRight: 8 }} /> Phasellus ut orci sit amet nibh gravida sem</p>
                <p><FaCheck style={{ marginRight: 8 }} /> Fusce convallis eget enim nec placera</p>
                <p><FaCheck style={{ marginRight: 8 }} /> Vivamus est urna, pellentesque eu luctus</p>
                <p><FaCheck style={{ marginRight: 8 }} /> Lorem ipsum dolor sit amet</p>
              </div>
            </div>
          </div>

          {/* Additional Information */}

          <div className="more-information">
            <div className="padding-information">
              <h4>Additional information</h4>
              <div className="type-product">
                <p className='color-type'>Color</p>
                {renderColor()}
              </div>
            </div>
          </div>

          {/* review */}

          <div className="review">
            <div className="padding-information">
              <h4 className='title-description'>Review ({countReview()})</h4>
              <div className="review-list">
                {renderReview()}
              </div>

              <div className="yourReview-section">
                <p className='comment-title'>Let we know what you think about "{data?.productName}"</p>
                <p className="note">Your email address will not be published. Required fields are marked *</p>
                <div className="rating">
                  <p>Your rating *</p>
                  <div className="star-rating">
                    <i onMouseMove={() => renderStar(1)}>{star < 1 ? <CiStar /> : <FaStar />}</i>
                    <i onMouseMove={() => renderStar(2)}>{star < 2 ? <CiStar /> : <FaStar />}</i>
                    <i onMouseMove={() => renderStar(3)}>{star < 3 ? <CiStar /> : <FaStar />}</i>
                    <i onMouseMove={() => renderStar(4)}>{star < 4 ? <CiStar /> : <FaStar />}</i>
                    <i onMouseMove={() => renderStar(5)}>{star < 5 ? <CiStar /> : <FaStar />}</i>
                  </div>
                </div>
                <div className="review-comment">
                  <form onSubmit={handleSubmit}>
                    <label htmlFor="your-review">Your Review *</label>
                    <textarea id='review' className='your-review-input' cols={1} onChange={handleChange} value={values.review} />
                    {touched.review && <p className="error">* {errors.review}</p>}
                    <div className="your-information">
                      <div className="your-name-section">
                        <label htmlFor="your-name">Your Name *</label>
                        <input type="text" id='name' onChange={handleChange} value={values.name} />
                        {touched.name && <p className="error">* {errors.name}</p>}
                      </div>
                      <div className="your-email-section">
                        <label htmlFor="your-email">Your Email *</label>
                        <input type="text" id='email' onChange={handleChange} value={values.email} />
                        {touched.email && <p className="error">* {errors.email}</p>}
                      </div>
                    </div>
                    <span>Save my name, email, and website in this browser for the next time I comment.</span>
                    <br />
                    <button type="submit" className='submit'>SUBMIT</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related products */}
        <div className="related-product-section">
          <h3>Related Products</h3>
          <div className="item-list">
            {renderRelated}
          </div>
        </div>
      </div>
    </div>
  )
}