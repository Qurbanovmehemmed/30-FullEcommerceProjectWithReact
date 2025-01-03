import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import "./ProductDetail.css"
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../../redux/productSlice'
import { addBasket } from '../../redux/basketSlice'
import { toast } from 'react-toastify'

const ProductDetail = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { products } = useSelector((state) => state.products)
  const findProduct = products.find((product) => product.id === id)

  const [quantity, setQuantity] = useState(1)

    const notify = (text, type) =>
      toast(text, {
        type: type,
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  const handlePlus = () => {
    setQuantity(quantity + 1)
  }

  const handleMinus = () => {
    if (quantity > 1) setQuantity(quantity - 1)
  }

  const handleAddToCart = () => {
    const productWithQuantity = { ...findProduct, quantity }
    dispatch(addBasket(productWithQuantity))
    notify(" Product added to cart", "success")
  }

  return (
    <>
      <h1 className='headPage'>Product Detail</h1>
      <div className="container">
        <div className="row">
          <div className="product-container">
            <div className="product-image">
              <img className="img" src={findProduct?.image} alt="Product Image" />
            </div>

            <div className="product-details">
              <h4 className="product-title">${findProduct?.title}</h4>
              <p className="product-category">Category: {findProduct?.category}</p>
              <p className="product-price">${findProduct?.price}</p>
              <p className="product-description">{findProduct?.description}</p>

              <div className="product-rating">
                <span>⭐ {findProduct?.rating.rate}</span>
                <span>({findProduct?.rating.count} reviews)</span>
              </div>

              <div className="quantity-selector">
                <button
                  className="btn-minus"
                  onClick={handleMinus}
                  disabled={quantity === 1}
                >
                  -
                </button>
                <input type="number" value={quantity} min="1" readOnly />
                <button className="btn-plus" onClick={handlePlus}>
                  +
                </button>
              </div>

              <div style={{ display: "flex", flexDirection:"column"}}>
              <button className="btn btn-danger add-to-cart-btn" onClick={handleAddToCart} style={{width:"20%"}}>
                Add to Cart
              </button>
              <Link className="link" to="/"style={{marginTop:"10px" }} >
                back
              </Link>
              </div>
            </div>
          </div>
       
        </div>
      </div>
    </>
  )
}

export default ProductDetail
