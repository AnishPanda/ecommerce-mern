import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import MetaData from "../layout/MetaData";
import "./Home.css";
import ProductCard from "./ProductCard.jsx";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Home() {
  const dispatch = useDispatch();
  const { loading, error, product } = useSelector((state) => state.products);

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

    dispatch(getProduct());
  }, [dispatch, error]);

  // const product = {
  //   name: "Blue Tshirt",
  //   image: [
  //     {
  //       url: "data:image/jpeg;base64,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",
  //     },
  //   ],
  //   price: "3000",
  //   _id: "anish",
  // };
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="ECOMMERCE" />

          <div className="banner">
            <p>Welcome To Ecommerce</p>
            <h1>Find Amazing Product Below</h1>
            <a href="#container">
              <button>
                Scroll
                <span>
                  <CgMouse />
                </span>
              </button>
            </a>
          </div>
          <h2 className="homeHeading">Featured Products</h2>

          <div id="container" className="container">
            {product &&
              product.slice(0, 9).map((product) => {
                return <ProductCard product={product} key={product._id} />;
              })}
          </div>
        </Fragment>
      )}
      <ToastContainer />
    </Fragment>
  );
}

export default Home;
