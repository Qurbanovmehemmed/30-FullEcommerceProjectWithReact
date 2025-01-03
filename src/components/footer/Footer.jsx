import React from "react";
import "./Footer.css";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { searchProduct } from "../../redux/productSlice";
import { useDispatch } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const Footer = () => {
  const dispatch = useDispatch();
   const handleSearch = (value) => {
      dispatch(searchProduct(value));
    };
  return (
    <div>
      <footer>
        <div className="container">
          <div className="row" style={{paddingTop:"20px"}}>  
            <div className="footHead" style={{ display: "flex",marginTop:"20px",justifyContent:"space-between" }}>
              <h1 className="footHeadText">Snobella</h1>

              <div style={{ display: "flex", alignItems: "center" ,position:"relative"}}>
                <input type="text" placeholder="Search all product" onChange={(e) => handleSearch(e.target.value)} className="footSearch"/>
                <SearchIcon className="searchIcon" />
              </div>
            </div>
          </div>
        </div>
        <section id="footBottom">
          <div className="container">
            <div className="row" style={{ display: "flex" }}>
              <div className="footBottomLeft " style={{ width: "50%" }}>
                <p className="botText">
                  The wise man therefore always holds selectionThe wise man
                  therefore always rejects pleasures to secure other greater
                </p>

                <div
                  className="message"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <EmailIcon className="dark" fontSize="20px" />
                  Snobella@gmail.com
                </div>
                <div
                  className="phone"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <LocalPhoneIcon className="dark" fontSize="20px" />
                  +748 383 23 14
                </div>
                <div className="sendMessege">
                  <Button
                    variant="outlined"
                    startIcon={<SendIcon />}
                    style={{
                      backgroundColor: "#F7F7F9",
                      color: "#171717",
                      marginTop: "10px",
                      fontSize: "14px",
                      borderRadius: "5px",
                      height: "40px",
                      border: "1px solid #171717",
                    }}
                  >
                    Send message
                  </Button>
                </div>
              </div>
              <div
                className="footBottomRight col-lg-6 col-md-12 col-sm-12"
                style={{ width: "50%" }}
              >
                <div
                  className="row "
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div className="shopCampanyHelp col-lg-4 col-md-12 col-sm-12">
                    <p className="dark">Shop</p>
                    <p className="light">Shoulder Bag</p>
                    <p className="light">Backpack</p>
                    <p className="light">Tote Bag</p>
                    <p className="light">Hand Bag</p>
                    <p className="light">Evening bags</p>
                    <p className="light">Purse</p>
                  </div>
                  <div className="shopCampanyHelp col-lg-4 col-md-12 col-sm-12">
                    <p className="dark">Company</p>
                    <p className="light">About us</p>
                    <p className="light">Contact</p>
                    <p className="light">Terms of Use</p>
                    <p className="light">Customer service</p>
                  </div>
                  <div className="shopCampanyHelp col-lg-4 col-md-12 col-sm-12">
                    <p className="dark">Help</p>
                    <p className="light">FAQ</p>
                    <p className="light">Delivery</p>
                    <p className="light">Cancellation of the order</p>
                    <p className="light">Don't go back</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="footLast">
          <div className="container">
            <div className="row" style={{ display: "flex", justifyContent: "space-between" }}>
              <div className="allRights">
                © 2020. All rights reserved.
              </div>
              <div className="textLeft">
                <a href="">
              <InstagramIcon className="follow" />
                </a>
                <a href="">
                 <FacebookIcon className="follow" />
                </a>

                <a href="">
                  <WhatsAppIcon className="follow" />
                    
                </a>
              </div>
            </div>
          </div>
        </section>
      </footer>
    </div>
  );
};

export default Footer;
