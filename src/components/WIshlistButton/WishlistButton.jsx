import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updateWishlist } from "../../redux/wishlistSlice";

const WishlistButton = ({ product, user }) => {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      const isProductInWishlist = user.wishlist.some(item => item.id === product.id);
      setIsInWishlist(isProductInWishlist);
    }
  }, [user, product]);

  const addWishlist = (e) => {
    e.stopPropagation();
    if (user) {
      dispatch(updateWishlist(product));
      setIsInWishlist(!isInWishlist);
      toast(isInWishlist ? "Product removed from wishlist" : "Product added to wishlist", {
        type: isInWishlist ? "error" : "success",
        position: "top-center",
        autoClose: 1000,
      });
    } else {
      toast("Please login to add to wishlist", {
        type: "error",
        position: "top-center",
        autoClose: 1000,
      });
    }
  };

  return (
    <i className={`fa-heart myHeart ${isInWishlist ? "fa-solid" : "fa-regular"}`}  onClick={addWishlist}></i>
  );
};

export default WishlistButton;
