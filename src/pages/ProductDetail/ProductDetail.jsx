import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/productSlice";
import { addBasket } from "../../redux/basketSlice";
import { toast } from "react-toastify";
import "./ProductDetail.css";
import { getUser, updateWishlist } from "../../redux/wishlistSlice";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import WishlistButton from "../../components/WIshlistButton/WishlistButton";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.wishlist);
  const findProduct = products.find((product) => product.id === id);

  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(1);
  const [selectedTab, setSelectedTab] = useState("description");
  const [editReviewId, setEditReviewId] = useState(null);
  const [editReviewText, setEditReviewText] = useState("");
  const [editRating, setEditRating] = useState(1);
  const [isInWishlist, setIsInWishlist] = useState(false);

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
    dispatch(fetchProducts());
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    const savedReviews = JSON.parse(localStorage.getItem(`reviews-${id}`));
    if (savedReviews) {
      setReviews(savedReviews);
    }
  }, [id]);

  useEffect(() => {
    if (reviews.length > 0) {
      localStorage.setItem(`reviews-${id}`, JSON.stringify(reviews));
    }
  }, [reviews, id]);

  useEffect(() => {
    if (user) {
      const isProductInWishlist = user.wishlist.some(
        (item) => item.id === findProduct?.id
      );
      setIsInWishlist(isProductInWishlist);
    }
  }, [user, findProduct]);

  const handlePlus = () => setQuantity(quantity + 1);
  const handleMinus = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleAddToCart = () => {
    const productWithQuantity = { ...findProduct, quantity };
    dispatch(addBasket(productWithQuantity));
    notify("Product added to cart", "success");
  };

  const handleAddReview = () => {
    if (newReview.trim()) {
      const newReviewObj = {
        id: Date.now(),
        text: newReview,
        rating: rating,
        date: new Date().toLocaleDateString("en-GB", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        username: user?.username || "Anonymous",
      };
      setReviews([...reviews, newReviewObj]);
      setNewReview("");
      setRating(1);
      notify("Review added", "success");
    }
  };

  const handleDeleteReview = (reviewId) => {
    setReviews(reviews.filter((review) => review.id !== reviewId));
    notify("Review deleted", "warning");
  };

  const handleEditReview = () => {
    if (editReviewText.trim()) {
      setReviews(
        reviews.map((review) =>
          review.id === editReviewId
            ? { ...review, text: editReviewText, rating: editRating }
            : review
        )
      );
      setEditReviewId(null);
      setEditReviewText("");
      setEditRating(1);
      notify("Review updated", "info");
    }
  };

  const similarProducts = products.filter(
    (product) =>
      product.category === findProduct?.category &&
      product.id !== findProduct?.id
  );

  const addWishlist = (e, product) => {
    e.stopPropagation();
    if (user) {
      const isInWishlist = user.wishlist.some((item) => item.id === product.id);

      if (isInWishlist) {
        dispatch(updateWishlist(product));
        setIsInWishlist(false);
        notify("Product removed from wishlist", "error");
      } else {
        dispatch(updateWishlist(product));
        setIsInWishlist(true);
        notify("Product added to wishlist", "success");
      }
    } else {
      notify("Please login to add to wishlist", "error");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    }
  };
  const addToBasket = (e, product) => {
    e.stopPropagation();
    dispatch(addBasket({ ...product, quantity: 1 }));
    notify("Product added to basket", "success");
  };
  const [currentImage, setCurrentImage] = useState(findProduct?.image); 

  const images = [
    findProduct?.image, 
    findProduct,
    findProduct?.image,
    findProduct?.image,
  ];

  const handleImageClick = (image) => {
    setCurrentImage(image);
  };
  return (
    <div className="container">
      <div className="row">
        <div style={{ display: "flex" }}>
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            Home
          </Link>
          <NavigateNextOutlinedIcon
            style={{
              fontSize: "25px",
            }}
          />
          Shoulder Bags
        </div>
        <div className="product-container">
          <div
            style={{
              display: "flex",
              gap: "10px",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <KeyboardArrowUpIcon style={{ fontSize: "30px" }} />
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`burada test edin`}
                className="sliderImg"
                onClick={() => handleImageClick(image)}
                style={{
                  width: "100px",
                  height: "auto",
                  cursor: "pointer",
                  transition: "transform 0.3s ease-in-out",
                }}
              />
            ))}
            <KeyboardArrowDownIcon style={{ fontSize: "30px" }} />
          </div>
          <div className="product-image">
            <img
              className="img"
              src={currentImage || findProduct?.image}
              alt="Product Image"
              style={{ width: "400px", marginLeft: "15px" }}
            />
          </div>

          <div
            className="product-details"
            style={{
              marginLeft: "15px",
              display: "flex",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            <h4 className="product-title" style={{ fontSize: "24px" }}>
              {findProduct?.title}
            </h4>
            <p className="product-category">
              Category: {findProduct?.category}
            </p>
            <p className="product-price">${findProduct?.price}</p>

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

            <div
              className="add-to-cart-section"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <button
                className="btn btn-danger add-to-cart-btn"
                onClick={handleAddToCart}
                style={{ marginBottom: "10px", width: "244px", height: "40px" }}
              >
                Add to Cart
              </button>
              <Link
                className="link"
                to="/"
                style={{ marginTop: "10px", color: "black" }}
              >
                Back
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="tabs">
        <button
          className={`tab-button ${
            selectedTab === "description" ? "active" : ""
          }`}
          onClick={() => setSelectedTab("description")}
        >
          Product Description
        </button>
        <button
          className={`tab-button ${selectedTab === "reviews" ? "active" : ""}`}
          onClick={() => setSelectedTab("reviews")}
        >
          Reviews ({reviews.length})
        </button>
      </div>

      {selectedTab === "description" ? (
        <div
          className="tab-content"
          style={{ marginTop: "20px", marginLeft: "20px", color: "#212121BF" }}
        >
          <p className="product-description">{findProduct?.description}</p>
        </div>
      ) : (
        <div className="tab-content">
          <div className="reviews-section">
            <h5>Reviews</h5>
            {reviews.length === 0 ? (
              <p>No reviews yet. Be the first to review!</p>
            ) : (
              reviews.map((review) => (
                <div key={review.id} className="review-item">
                  <div style={{ display: "flex", gap: "10px" }}>
                    <p
                      style={{
                        color: "#212121",
                        fontSize: "20px",
                        fontWeight: "500",
                        fontFamily: "Rubik",
                      }}
                    >
                      {review.username}
                    </p>
                    <div className="stars">
                      {[...Array(5)].map((_, index) => (
                        <i
                          key={index}
                          className={`fa-star rewievStar ${
                            index < review.rating ? "fa-solid" : "fa-regular"
                          }`}
                        ></i>
                      ))}
                    </div>
                  </div>

                  <p>{review.date}</p>

                  <p>{review.text}</p>
                  <button
                    onClick={() => handleDeleteReview(review.id)}
                    style={{ marginRight: "10px", marginTop: "10px" }}
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      setEditReviewId(review.id);
                      setEditReviewText(review.text);
                      setEditRating(review.rating);
                    }}
                  >
                    Edit
                  </button>
                </div>
              ))
            )}

            <div className="add-review">
              {editReviewId ? (
                <div>
                  <textarea
                    value={editReviewText}
                    onChange={(e) => setEditReviewText(e.target.value)}
                  />
                  <div>
                    {[...Array(5)].map((_, index) => (
                      <i
                        key={index}
                        className={`fa-star ${
                          index < editRating ? "fa-solid" : "fa-regular"
                        }`}
                        onClick={() => setEditRating(index + 1)}
                      ></i>
                    ))}
                  </div>
                  <button onClick={handleEditReview}>Save Edit</button>
                </div>
              ) : (
                <div>
                  <textarea
                    value={newReview}
                    onChange={(e) => setNewReview(e.target.value)}
                    placeholder="Write your review..."
                  />
                  <div>
                    {[...Array(5)].map((_, index) => (
                      <i
                        key={index}
                        className={`fa-star ${
                          index < rating ? "fa-solid" : "fa-regular"
                        }`}
                        onClick={() => setRating(index + 1)}
                      ></i>
                    ))}
                  </div>
                  <button onClick={handleAddReview}>Add Review</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="similar-products">
        <div>
          <h1
            className="headPageProducts"
            style={{
              marginTop: "50px",
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "40px",
            }}
          >
            <p style={{ fontSize: "20px" }}>You may also like</p>
            <p
              style={{
                fontSize: "20px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Link
                to="/"
                style={{
                  color: "black",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span>view all our products</span>
                <NavigateNextOutlinedIcon
                  style={{
                    fontSize: "25px",
                  }}
                />
              </Link>
            </p>
          </h1>
        </div>
        <div
          className="similar-products-list"
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          {similarProducts.length === 0 ? (
            <p>No similar products found.</p>
          ) : (
            similarProducts.map((product) => (
              <div key={product.id} className="similar-product-item">
                <div
                  className="mycard"
                  key={product.id}
                  onClick={() => navigate(`/productdetail/${product.id}`)}
                >
                  <img src={product.image} alt={product.title} />
                  <WishlistButton product={product} user={user} />
                  <div className="mycard-content">
                    <p>{product.title.slice(0, 30) + " ..."}</p>
                    <p>{product.category}</p>
                    <div className="mycard-footer">
                      <p>${product.price}</p>
                      <p>⭐{product.rating.rate}</p>
                    </div>

                    <button
                      className="add-to-cart"
                      onClick={(e) => addToBasket(e, product)}
                    >
                      Add to card
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
