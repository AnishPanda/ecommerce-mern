import React, { useEffect } from "react";
import SideBar from "./SideBar.jsx";
import "./DashBoard.css";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJs,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  ArcElement,
} from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { getAdminAllProduct } from "../../actions/productAction.js";
import Loader from "../layout/loader/Loader.js";
import { getAllOrderDetails } from "../../actions/orderAction";
import { getAllUsers } from "../../actions/userAction.js";

ChartJs.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  ArcElement
);

const DashBoard = () => {
  const dispatch = useDispatch();
  const { product, loading } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.allOrder);
  const { users } = useSelector((state) => state.allUsers);

  let outOfStock = 0;

  product &&
    product.forEach((item) => {
      if (item.stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getAdminAllProduct());
    dispatch(getAllOrderDetails());
    dispatch(getAllUsers());
  }, [dispatch]);

  let totalAmount = 0;

  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        borderColor: "tomato",
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };

  const donutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A684", "#680084"],
        hoverBackgroundColor: ["#485000", "#35014F"],
        data: [outOfStock, product.length - outOfStock],
      },
    ],
  };

  return (
    <div className="dashBoard">
      <SideBar />
      {loading ? (
        <Loader />
      ) : (
        <div className="dashBoardContainer">
          <h1>DashBoard</h1>
          <div className="dashBoardSummary">
            <div>
              <p>
                Total Amount <br /> ₹{totalAmount}
              </p>
            </div>
            <div className="dashBoardSummaryBox2">
              <Link to="/admin/products">
                <p>Products</p>
                <p>{product && product.length}</p>
              </Link>
              <Link to="/admin/orders">
                <p>Orders</p>
                <p>{orders && orders.length}</p>
              </Link>
              <Link to="/admin/users">
                <p>Users</p>
                <p>{users.length}</p>
              </Link>
            </div>
          </div>
          <div className="lineChart">
            <Line data={lineState} />
          </div>
          <div className="doughnutChart">
            <Doughnut data={donutState} />
          </div>
        </div>
      )}
    </div>
  );
};

export default DashBoard;
