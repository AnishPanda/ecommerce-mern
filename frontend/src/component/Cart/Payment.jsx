import React, { Fragment, useEffect, useRef } from "react";
import CheckoutSteps from "./CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Typography } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";

import axios from "axios";
import "./Payment.css";
import { useHistory } from "react-router-dom";
import { clearErrors, createOrder } from "../../actions/orderAction";

const Payment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const payBtn = useRef(null);

  const dispatch = useDispatch();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);
  const history = useHistory();

  const newOrder = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const submitHandler = async () => {
    payBtn.current.disabled = true;

    const {
      data: { key },
    } = await axios.get(
      "https://ecommerce-mern-anishpanda.vercel.app/api/v1/razorpaykey"
    );

    const {
      data: { order },
    } = await axios.post(
      "https://ecommerce-mern-anishpanda.vercel.app/api/v1/payment/process",
      {
        amount: orderInfo.totalPrice,
      }
    );

    const options = {
      key: key,
      amount: order.amount,
      currency: "INR",
      name: "ECOMMERCE",
      description: "Test Transaction",
      order_id: order.id,
      handler: async function (response) {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
          response;
        const { data: veryfyData } = await axios.post(
          "https://ecommerce-mern-anishpanda.vercel.app/api/v1/verifypayment",
          {
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
          }
        );

        if (veryfyData.success) {
          newOrder.paymentInfo = {
            status: "succeeded",
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
          };

          dispatch(createOrder(newOrder));
          toast.success("Payment was SuccessFull", {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          localStorage.removeItem("cartItems");
          history.push("/success");
        } else {
          toast.error("Payment was not Successfull", {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          history.push("/process/payment");
        }
      },
      prefill: {
        name: user.name,
        email: user.email,
        contact: shippingInfo.phoneNo,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#FF943D",
      },
    };
    const razor = new window.Razorpay(options);
    razor.open();
  };

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  return (
    <Fragment>
      <MetaData title={"Payment"} />
      <CheckoutSteps activeStep={2} />
      <div className="paymentContainer">
        <div className="paymentForm">
          <div className="orderSummary test">
            <Typography>Order Summary</Typography>
            <div>
              <div>
                <p>SubTotal:</p>
                <span>₹{orderInfo.subtotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>₹{orderInfo.shippingCharges}</span>
              </div>
              <div>
                <p>GST:</p>
                <span>₹{orderInfo.tax}</span>
              </div>
            </div>
            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>₹{orderInfo.totalPrice}</span>
            </div>
            <button
              ref={payBtn}
              onClick={() => submitHandler()}
            >{`Pay - ${orderInfo.totalPrice}`}</button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </Fragment>
  );
};

export default Payment;
