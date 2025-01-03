import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteAllProducts, getUser, updateWishlist, } from "../redux/wishlistSlice";
import { Button } from "@mui/material";
import { toast } from "react-toastify";

const Wishlist = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.wishlist);
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
    dispatch(getUser());
  }, [dispatch]);

  const handleDelete = (product) => {
    if (user) {
      dispatch(updateWishlist(product)); 
      notify(" Product removed from wishlist", "error");
    }
  };

  const deleteAll = () => {
    if (user) {
      dispatch(deleteAllProducts());
      notify("All Product removed from wishlist", "error");
    }
  };

  return (
    <div>
      <h1 className='headPage'>Your Wishlist</h1>
      <section className="wishlist-container">
        <div className="container">
          <div className="row">
            <div className="wishlist">
              {user && user.wishlist.length > 0 ? (
                user.wishlist.map((wishlistItem) => (
                  <div className="wishlist-item" key={wishlistItem.id}>
                    <div className="image">
                      <img src={wishlistItem.image} alt="Product Image" />
                    </div>
                    <h3 className="title">{wishlistItem.title}</h3>
                    <p className="category">{wishlistItem.category}</p>
                    <p className="price">${wishlistItem.price}</p>
                    <button
                      className="btn btn-danger removeBtn"
                      onClick={() => {
                        handleDelete(wishlistItem); 
                      }}
                    >
                      Remove
                    </button>
                  </div>
                ))
              ) : (
                <p className="empty">Your wishlist is empty</p>
              )}
              {user && user.wishlist.length >0?(<Button variant="contained" onClick={deleteAll}>
                Delete All
              </Button>):("")}
              
            </div>
            <Link className="link" to="/">
              Back
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Wishlist;
