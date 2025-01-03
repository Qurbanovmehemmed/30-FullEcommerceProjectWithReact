import React, { useEffect } from 'react'
import { fetchProducts } from '../../redux/productSlice';
import { getUser, updateWishlist } from '../../redux/wishlistSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addBasket } from '../../redux/basketSlice';
import { toast } from 'react-toastify';

const Card = () => {
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
         <div
          className="cards"
          style={{
            maxWidth: "84%",
            margin: "50px auto",
            display: "flex",
            flexWrap: "wrap",
            gap: "24px",
          }}
        >
          {products.map((product) => {
            const isInWishlist = user?.wishlist.some(
              (item) => item.id === product.id
            );

            return (
              <div
                className="mycard"
                key={product.id}
                onClick={() => navigate(`/productdetail/${product.id}`)}
              >
                <img src={product.image} alt={product.title} />
                <i
                  className={`fa-heart myHeart ${
                    isInWishlist ? "fa-solid" : "fa-regular"
                  }`}
                  onClick={(e) => addWishlist(e,product)}
                />
                <div className="mycard-content">
                  <p>{product.title}</p>
                  <p>{product.category}</p>
                  <div className="mycard-footer">
                    <p>Price: ${product.price}</p>
                    <p>⭐{product.rating.rate}</p>
                  </div>

                  <button
                    className="add-to-cart"
                    onClick={(e) => addToBasket(e,product)}
                  >
                    Add To Card
                  </button>
                </div>
              </div>
            );
          })}
        </div>
    </div>
  )
}

export default Card