import { Typography } from "@mui/material";
import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../../actions/cartAction";
import "./Cart.css";
import CartItemCard from "./CartItemCart.jsx";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { Link, useHistory } from "react-router-dom";
import MetaData from "../layout/MetaData";

const Cart = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { cartItems } = useSelector((state) => state.cart);

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;

    if (stock <= quantity) {
      //get a alert
      return;
    }

    dispatch(addItemsToCart(id, newQty));
  };

  const decrementQuantity = (id, quantity) => {
    const newQty = quantity - 1;

    if (1 >= quantity) {
      return;
    }

    dispatch(addItemsToCart(id, newQty));
  };

  const deleteCardItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  const checkOutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <Fragment>
      {cartItems.length === 0 ? (
        <Fragment>
          <MetaData title={`Cart -- ECOMMERCE`} />
          <div className="emptyCart">
            <RemoveShoppingCartIcon />
            <Typography>No Product in Your Cart</Typography>
            <Link to="/products">View Products</Link>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <MetaData title={`Cart -- ECOMMERCE`} />
          <div className="cardPage">
            <div className="cardHeader">
              <p>Product</p>
              <p>Quantity</p>
              <p>SubTotal</p>
            </div>

            {cartItems &&
              cartItems.map((item) => {
                return (
                  <div className="cardContainer" key={item.product}>
                    <CartItemCard
                      item={item}
                      deleteCardItems={deleteCardItems}
                    />
                    <div className="CardInput">
                      <button
                        onClick={
                          () => decrementQuantity(item.product, item.quantity)
                          //   console.log(item.product, item.quantity)
                        }
                      >
                        -
                      </button>
                      <input type="number" value={item.quantity} readOnly />
                      <button
                        onClick={() =>
                          increaseQuantity(
                            item.product,
                            item.quantity,
                            item.stock
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                    <p className="cardSubtotal">{`₹${
                      item.price * item.quantity
                    }`}</p>
                  </div>
                );
              })}

            <div className="cartGrossTotal">
              <div></div>
              <div className="cartGrossTotalBox">
                <p>Gross Total</p>
                <p>{`₹${cartItems.reduce((acc, item) => {
                  return acc + item.quantity * item.price;
                }, 0)}`}</p>
              </div>
              <div></div>
              <div className="checkOutBtn">
                <button onClick={checkOutHandler}>Check Out</button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;
