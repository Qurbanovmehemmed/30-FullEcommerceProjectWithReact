import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, sortAzProduct, sortHighProduct, sortLowProduct, sortZaProduct } from "../redux/productSlice";
import { getUser, updateWishlist } from "../redux/wishlistSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { addBasket } from "../redux/basketSlice";
import Card from "../components/Card/Card";
import Bags from "../assets/images/Bags.png";
import Group from "../assets/images/Group.png";
import Pinkbag from "../assets/images/Pinkbag.png";
import Orgbag from "../assets/images/Orgbag.png";
import Greenbag from "../assets/images/Greenbag.png";
import Blackbag from "../assets/images/Blackbag.png";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
import "./Home.css";
import ActionBar from "../components/ActionBar/ActionBar";

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

  const addWishlist = (e, product) => {
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


  const handleSortAz = () => {
    dispatch(sortAzProduct());
  };
  const handleSortZa = () => {
    dispatch(sortZaProduct());
  };
  const handleSortLow = () => {
    dispatch(sortLowProduct());
  };
  const handleSortHigh = () => {
    dispatch(sortHighProduct());
  };

  return (
    <div>
      <div className="startHomeSlider">
        <div className="sliderContainer">
          <div className="slide">
            <div className="container">
              <div className="startBags col-lg-12 col-md-12 col-sm-12">
                <div className="row" style={{ display: "flex" }}>
                  <div className="main col-lg-6 col-md-12 col-sm-12">
                    <span>30% off</span>
                    <h1>Handbag products</h1>
                    <p style={{ maxWidth: "500px" }}>
                      It is a long established fact that a reader will be
                      distracted by the readable content expound the actual
                      teachings of the great explorer
                    </p>
                    <br />
                    <br />
                    <br />
                    <button>Shop now</button>

                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        marginTop: "120px",
                      }}
                    >
                      <div
                        style={{
                          width: "12px",
                          height: "12px",
                          borderRadius: "50%",
                          backgroundColor: "#20636340",
                        }}
                      ></div>
                      <div
                        style={{
                          width: "12px",
                          height: "12px",
                          borderRadius: "50%",
                          backgroundColor: "#20636340",
                        }}
                      ></div>
                      <div
                        style={{
                          width: "26px",
                          height: "12px",
                          borderRadius: "15px",
                          backgroundColor: "#DF4244",
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="bagsIMG col-lg-6 col-md-12 col-sm-12">
                    <img className="womBagImg" src={Bags} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          backgroundColor: "#F7F7F7",
          height: "144px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="container">
          <img src={Group} alt="" />
        </div>
      </div>

      <div className="container">
        <div className="bagChoose">
          <div className="bagcard">
            <div className="text">Shoulder bags</div>
            <div>
              <img src={Pinkbag} alt="" />
            </div>
          </div>

          <div className="bagcard">
            <div className="text">Handbag</div>
            <img src={Blackbag} alt="" />
          </div>
          <div className="bagcard">
            <div className="text">Backpack</div>
            <img src={Greenbag} alt="" />
          </div>
          <div className="bagcard" style={{ position: "relative" }}>
            <div className="text">Evening bags</div>
            <img src={Orgbag} alt="" />
            <div
              style={{
                position: "absolute",
                right: "-15px",
                top: "55px",
                width: "40px",
                height: "40px",
                backgroundColor: "#fff",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0px 0px 5px 0px #00000040",
                cursor: "pointer",
              }}
            >
              <NavigateNextOutlinedIcon
                style={{
                  fontSize: "25px",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <h1
          className="headPageProducts"
          style={{
            marginTop: "50px",
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <p>Products</p>
          <p
            style={{
              fontSize: "20px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span>view all our products</span>
            <NavigateNextOutlinedIcon
              style={{
                fontSize: "25px",
              }}
            />
          </p>
        </h1>
        <ActionBar
            az={handleSortAz}
            za={handleSortZa}
            low={handleSortLow}
            high={handleSortHigh}
          />
        <Card />
      </div>
    </div>
  );
};

export default Home;
