import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/productSlice";
import { getUser, updateWishlist } from "../redux/wishlistSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { addBasket } from "../redux/basketSlice";
import Card from "../components/Card/Card";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.products);
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
    dispatch(fetchProducts());
    dispatch(getUser());
  }, [dispatch]);

  const addWishlist = (e,product) => {
    e.stopPropagation();
    if (user) {
      const isInWishlist = user.wishlist.some((item) => item.id === product.id);

      if (isInWishlist) {
        dispatch(updateWishlist(product));
        notify("Product removed from wishlist", "error");
      } else {
        dispatch(updateWishlist(product));
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

  return (
    <div>
      <div className="container">
        <h1 className='headPage'>Products</h1>
       <Card/>
      </div>
    </div>
  );
};

export default Home;
