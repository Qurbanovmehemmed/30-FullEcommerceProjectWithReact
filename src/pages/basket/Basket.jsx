import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Basket.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteBasket, minusBtn, plusBtn } from "../../redux/basketSlice";
import { toast } from "react-toastify";

const Basket = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.basket);
  const totalAmount = products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );
  const navigate = useNavigate();

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

  const handleDeleteBasket = (product) => {
    dispatch(deleteBasket(product));
    notify("Product deleted from basket", "error");
  };

  const handlePlus = (product) => {
    dispatch(plusBtn(product));
  };

  const handleMinus = (product) => {
    dispatch(minusBtn(product));
  };

  return (
    <>
      <h1 className='headPage'>Your Basket</h1>
      <section className="basket-container">
        <div className="container">
          <div className="row">
            <div className="basket">
              {products && products.length > 0 ? (
                products.map((product) => (
                  <div className="basket-item" key={product.id}>
                    <div
                      className="image"
                      onClick={() => navigate(`/productdetail/${product.id}`)}
                    >
                      <img src={product.image} alt="Product Image" />
                    </div>
                    <h6 className="title">
                      {product.title.slice(0, 15) + " ..."}
                    </h6>
                    <p className="category">{product.category}</p>
                    <p className="price">
                      ${(product.price * product.quantity).toFixed(2)}
                    </p>
                    <div className="count-area">
                      <button
                        {...(product.quantity === 1 ? { disabled: true } : {})}
                        className="minus-btn"
                        onClick={() => handleMinus(product)}
                      >
                        -
                      </button>
                      <p className="count">{product.quantity}</p>
                      <button className="plus-btn" onClick={() => handlePlus(product)}>
                        +
                      </button>
                    </div>
                    <button
                      className="btn btn-danger removeBtn"
                      onClick={() => handleDeleteBasket(product)}
                    >
                      Remove
                    </button>
                  </div>
                ))
              ) : (
                <p className="empty">Your Basket is Empty</p>
              )}
            </div>
            <div className="bottom">
              <Link className="link" to="/">
                back
              </Link>
              <h4>
                Total: $ <span className="total-price">{totalAmount.toFixed(2)}</span>
              </h4>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Basket;
