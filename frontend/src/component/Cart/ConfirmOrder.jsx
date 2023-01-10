import React, { Fragment } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps.jsx";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData.jsx";
import "./ConfirmOrder.css";
import { Typography } from "@mui/material";
import { Link, useHistory } from "react-router-dom";

const ConfirmOrder = () => {
  const history = useHistory();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const address = `
  ${shippingInfo.address},  ${shippingInfo.city},  ${shippingInfo.state},  ${shippingInfo.pinCode},  ${shippingInfo.country}
  `;
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const shippingCharges = subtotal > 1000 ? 0 : 200;
  const tax = subtotal * 0.18;
  const totalPrice = subtotal + shippingCharges + tax;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    history.push("/process/payment");
  };

  return (
    <Fragment>
      <MetaData title={"Confirm Order"} />
      <CheckoutSteps activeStep={1} />
      <div className="confirmOrder">
        <div>
          <div className="confirmShippingArea">
            <Typography>Shipping Info</Typography>
            <div className="confirmShippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>

          <div className="confirmCartItem">
            <Typography>Your Cart Items:</Typography>
            <div className="confirmCartItemContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                    <span>
                      {item.quantity} x ₹{item.price} ={" "}
                      <b>₹{item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div>
          <button onClick={proceedToPayment}>Proceed To Payment</button>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
