import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  CLEAR_ERRORS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_FAIL,
  NEW_ADMIN_PRODUCT_REQUEST,
  NEW_ADMIN_PRODUCT_FAIL,
  NEW_ADMIN_PRODUCT_SUCCESS,
  DELETE_ADMIN_PRODUCT_REQUEST,
  DELETE_ADMIN_PRODUCT_SUCCESS,
  DELETE_ADMIN_PRODUCT_FAIL,
  UPDATE_ADMIN_PRODUCT_SUCCESS,
  UPDATE_ADMIN_PRODUCT_FAIL,
  UPDATE_ADMIN_PRODUCT_REQUEST,
  ALL_REVIEWS_REQUEST,
  ALL_REVIEWS_SUCCESS,
  ALL_REVIEWS_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
} from "../constants/productConstants";
import axios from "axios";

// geting all product with filters
export const getProduct =
  (keyword = "", currentPage = 1, price = [0, 100000], category, rating = 0) =>
  async (dispatch) => {
    try {
      dispatch({
        type: ALL_PRODUCT_REQUEST,
      });
      let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${rating}`;

      if (category) {
        link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${rating}`;
      }

      const { data } = await axios.get(link);

      dispatch({
        type: ALL_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

// getting single product details
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_DETAILS_REQUEST,
    });

    const { data } = await axios.get(`/api/v1/product/${id}`);

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// give Review
export const newReview = (review) => async (dispatch) => {
  try {
    dispatch({
      type: NEW_REVIEW_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(`/api/v1/review`, review, config);

    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// geting all product for Admin
export const getAdminAllProduct = () => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_PRODUCT_REQUEST,
    });

    const { data } = await axios.get("/api/v1/admin/products");

    dispatch({
      type: ADMIN_PRODUCT_SUCCESS,
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// create new product -- Admin
export const createProduct = (productData) => async (dispatch) => {
  try {
    dispatch({
      type: NEW_ADMIN_PRODUCT_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/v1/admin/product/new",
      productData,
      config
    );

    dispatch({
      type: NEW_ADMIN_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_ADMIN_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// delete Product
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_ADMIN_PRODUCT_REQUEST,
    });

    const { data } = await axios.delete(`/api/v1/admin/product/${id}`);

    dispatch({
      type: DELETE_ADMIN_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_ADMIN_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// update Product
export const updatePrduct = (id, prodData) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_ADMIN_PRODUCT_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `/api/v1/admin/product/${id}`,
      prodData,
      config
    );

    dispatch({
      type: UPDATE_ADMIN_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_ADMIN_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

//get all Reviews of Products
export const getAllReviews = (id) => async (dispatch) => {
  try {
    dispatch({
      type: ALL_REVIEWS_REQUEST,
    });

    const { data } = await axios.get(`/api/v1/reviews?id=${id}`);

    dispatch({
      type: ALL_REVIEWS_SUCCESS,
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: ALL_REVIEWS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// delete Product review
export const deleteReviews = (reviewId, productId) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_REVIEW_REQUEST,
    });

    const { data } = await axios.delete(
      `/api/v1/reviews?id=${reviewId}&productId=${productId}`
    );

    dispatch({
      type: DELETE_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};
