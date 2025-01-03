import React, { useState, useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Button } from "@mui/material";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Person3Icon from "@mui/icons-material/Person3";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import "./Navbar.css";
import { searchProduct } from "../../redux/productSlice";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMenuOpen = Boolean(anchorEl);
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

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const getUsers = async () => {
    const { data } = await axios("http://localhost:3000/users");
    setUsers(data);
  };

  const existUser = users.find((user) => user.isLogin === true);

  const handleLogout = async () => {
    existUser.isLogin = false;
    await axios.put(`http://localhost:3000/users/${existUser.id}`, existUser);
  };

  const { products } = useSelector((state) => state.basket);
  const totalCount = products.reduce(
    (sum, product) => sum + product.quantity,
    0
  );
  useEffect(() => {
    getUsers();
  }, []);

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {existUser ? (
        <MenuItem
          onClick={() => {
            handleMenuClose(), handleLogout();
          }}
        >
          <Link to="/" style={{
            textDecoration:"none",
            color:"black",
            fontSize:"16px"
          }}>Logout</Link>
        </MenuItem>
      ) : (
        <>
          <MenuItem onClick={handleMenuClose}>
            <Link to="/register" style={{
            textDecoration:"none",
            color:"black",
            fontSize:"16px"
          }}>Register</Link>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Link to="/login" style={{
            textDecoration:"none",
            color:"black",
            fontSize:"16px"
          }}>Login</Link>
          </MenuItem>
        </>
      )}
    </Menu>
  );

  const heartLogin = () => {
    if (!existUser) {
      notify("Please login to add to wishlist", "error");
      navigate("/login");
    } else {
      navigate("/wishlist");
    }
  };

  const handleSearch = (value) => {
    dispatch(searchProduct(value));
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <div className="homeStart">
        <div className="container">
          <div className="topHome">
            <div className="contactHome">
              <div className="contactHome-left">
                <LocalPhoneOutlinedIcon
                  style={{
                    fontSize: 24,
                  }}
                />
              </div>
              <div className="contactHome-right">
                <h3>+748 383 23 14</h3>
              </div>
            </div>
            <div className="faqHome">
              <div className="faqHomeStart">
                <p>Terms of Use</p>
                <p>FAQ</p>
                <p>Customer service</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="mainNav" style={{}}>
          <div className="logoNav">
            <h1 className="logoNavHead">Snobella</h1>
          </div>
          <div className="searchNav">
            <Search>
              <StyledInputBase
                placeholder="Search all products"
                inputProps={{ "aria-label": "search" }}
                style={{ width: "540px",height:"40px",backgroundColor:"#F7F9FC",fontSize:"16px"}}
                onChange={(e) => handleSearch(e.target.value)}
              />
              <SearchIcon
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "10px",
                  color: "#273142",
                  fontSize: 24,
                }}
              />
            </Search>


           



          </div>
          <div className="userProfile">
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
                style={{
                  fontSize: 24,
                  color: "black",
                }}
              >
                <Person3Icon
                  style={{
                    fontSize: 24,
                    color: "#273142",
                  }}
                />
              </IconButton>

              <IconButton
                size="small"
                aria-label="show 4 new mails"
                color="inherit"
                style={{
                  fontSize: 20,
                  color: "#273142",
                }}
              >
                {existUser ? existUser.username : "Sign up"}
              </IconButton>
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
                onClick={() => {
                  heartLogin();
                }}
              >
                <FavoriteIcon
                  style={{
                    fontSize: 24,
                    color: "#273142",
                  }}
                />
                <p style={{marginLeft:"10px"}}> Wishlist</p>
              </IconButton>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Link to="/basket">
                  <Badge badgeContent={totalCount} color="error" size="large">
                    <ShoppingCartIcon
                      style={{
                        fontSize: 24,
                        color: "#273142",
                      }}
                    />
                  </Badge>
                  
                </Link>
                <p style={{marginLeft:"13px"}}> Basket</p>
              </IconButton>
              
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-haspopup="true"
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="navBotSelect"
        style={{
          display:"flex",
          justifyContent:"space-between",
          padding:"15px 0",
          maxWidth:"68%",
          marginBottom:"15px",
          }}>
        <p>Evening bags</p>
        <p>Shoulder bag</p>
        <p>Backpack</p>
        <p>Handbag</p>
        <p>Postman bag</p>
        <p>Belt bags</p>
        </div>

      </div>

      {/* material ui */}
      {/* <AppBar
        position="static"
        style={{ backgroundColor: "black", color: "goldenrod" }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            MAGA
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button sx={{ my: 2, color: "white", display: "block" }}>
              <Link to="/">Home</Link>
            </Button>
            <Button sx={{ my: 2, color: "white", display: "block" }}>
              <Link to="/about">TodoList</Link>
            </Button>
            <Button sx={{ my: 2, color: "white", display: "block" }}>
              <Link to="/contact">Contact</Link>
            </Button>
          </Box>

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
              onClick={() => {
                heartLogin();
              }}
            >
              <FavoriteIcon />
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Link to="/basket">
                <Badge badgeContent={totalCount} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </Link>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Person3Icon />
            </IconButton>

            <IconButton
              size="small"
              aria-label="show 4 new mails"
              color="inherit"
            >
              {existUser ? existUser.username : null}
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-haspopup="true"
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar> */}
      {renderMenu}
    </Box>
  );
}
