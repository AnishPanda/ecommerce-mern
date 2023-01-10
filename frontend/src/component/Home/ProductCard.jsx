import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";

function ProductCard({ product }) {
  const options = {
    size: "small",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      {product && (
        <Fragment>
          <img src={product.images[0].url} alt={product.name} />
          <p>{product.name}</p>
          <div>
            <Rating {...options} />
            <span className="productCardSpan">
              ({product.numOfReviews} Reviews)
            </span>
          </div>
          <span>
            &#8377;
            {product.price}
          </span>
        </Fragment>
      )}
    </Link>
  );
}

export default ProductCard;
