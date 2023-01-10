import React, { Fragment, useState } from "react";
import "./NewProduct.css";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SideBar from "./SideBar";
import { NEW_ADMIN_PRODUCT_RESET } from "../../constants/productConstants";
import MetaData from "../layout/MetaData";
import { Button } from "@mui/material";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { clearErrors, createProduct } from "../../actions/productAction";

const NewProduct = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { loading, error, success } = useSelector(
    (state) => state.newAdminProduct
  );

  const categories = [
    "Laptop",
    "Footware",
    "Bottom",
    "Tops",
    "Camera",
    "SmartPhone",
    "Sports Boot",
  ];

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const productDetail = {
      name: name,
      price: price,
      description: description,
      category: category,
      stock: stock,
      images: images,
    };

    dispatch(createProduct(productDetail));
  };

  const createProductImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
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

    if (success) {
      toast.success("Product Created Successfully", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      history.push("/admin/dashboard");
      dispatch({ type: NEW_ADMIN_PRODUCT_RESET });
    }
  }, [error, dispatch, success, history]);

  return (
    <Fragment>
      <MetaData title={"Create Product"} />
      <div className="dashBoard">
        <SideBar />
        <div className="newProductContainer">
          <form
            encType="multipart/form-data"
            className="createProductForm"
            onSubmit={createProductSubmitHandler}
          >
            <h1>Create Product</h1>
            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Price"
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div>
              <DescriptionIcon />
              <textarea
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                col="30"
                rows="1"
              ></textarea>
            </div>
            <div>
              <AccountTreeIcon />
              <select onChange={(e) => setCategory(e.target.value)}>
                <option value="">Choose Category</option>
                {categories.map((cata) => (
                  <option key={cata} value={cata}>
                    {cata}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Stock"
                required
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/"
                multiple
                onChange={createProductImageChange}
              />
            </div>
            <div id="createProductFormImage">
              {imagesPreview.map((image, i) => (
                <img src={image} alt="avatar previe" key={i} />
              ))}
            </div>
            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </Fragment>
  );
};

export default NewProduct;
