import axios from "axios";
import React, { useContext, useState } from "react";
import { useQuery } from "react-query";
import { Form, useParams } from "react-router-dom";
import { CartContext } from "../Context/Cart";
import { UserContext } from "../Context/User";
import { useFormik } from "formik";
import { reviewSchema } from "../Validation/Validate";
import Input from "../../pages/Input";
import { toast } from "react-toastify";
function Product() {
  const initialValues = {
    comment: "",
    rating: "",
  };

  let [isReviewVisibile, setReviewVisibile] = useState(false);

  const onSubmit = async (values) => {
    try {
      const token = localStorage.getItem("user Token");
      const { data } = await axios.post(
        import.meta.env.VITE_API_URL + `/products/${productID}/review`,
        values,
        { headers: { Authorization: `Tariq__${token}` } }
      );
      if (data.message === "success") {
        formik.resetForm();
        toast("review created successfuly", {
          position: "top-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (e) {
      toast("this product already reviewd", {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: reviewSchema,
  });

  const inputs = [
    {
      id: "comment",
      name: "comment",
      type: "text",
      title: "User Comment",
      value: formik.values.comment,
    },
    {
      id: "rating",
      name: "rating",
      type: "number",
      title: "User Rating",
      value: formik.values.rating,
    },
  ];

  const renderInputs = inputs.map((input, index) => (
    <Input
      name={input.name}
      key={index}
      type={input.type}
      id={input.id}
      title={input.title}
      value={input.value}
      onChange={formik.handleChange}
      errors={formik.errors}
      onBlur={formik.handleBlur(input.name)}
      touched={formik.touched}
    />
  ));
  const { productID } = useParams();

  const getProduct = async () => {
    const { data } = await axios.get(
      import.meta.env.VITE_API_URL + `/products/${productID}`
    );
    return data.product;
  };

  let { userOrder } = useContext(UserContext);

  const { data, isLoading } = useQuery("product", getProduct);

  const { AddToCartContext } = useContext(CartContext);

  const AddToCart = async (id) => {
    return await AddToCartContext(id);
  };

  let stars_rating = () => {
    const divs = Array.from({ length: data.ratingNumbers }, (_, index) => (
      <span className="me-2 text-danger">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height={30}
          width={30}
          fill="#ffdd00ec"
          viewBox="0 0 576 512"
        >
          {/*!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.*/}
          <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
        </svg>
      </span>
    ));
    return divs;
  };

  const can_create_review = (userOrder) => {
    return userOrder.orders.some((order) => {
      return order.products.some((product) => {
        return product.productId === data.id && order.status === "deliverd";
      });
    })
      ? 1
      : 0;
  };

  if (isLoading) {
    return <h2>Loading ...</h2>;
  }
  return (
    <div className="product overflow-hidden">
      <div className="row">
        <div className="product-images d-flex justify-content-center py-5">
          {data?.subImages.length
            ? data.subImages.map((image) => (
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img src={image.secure_url} alt="" className="w-100" />
                </div>
              ))
            : ""}
        </div>
      </div>
      <div className="row text-center">
        <h4 className=" fs-4">{data.name}</h4>
        <div className="price">
          <p className="fs-3 text-success fw-bold">${data.price}</p>
        </div>
        <div className="add">
          <button className=" btn btn-info" onClick={() => AddToCart(data._id)}>
            Add to cart
          </button>
        </div>

        <div className="creat_review ">
          {userOrder ? (
            can_create_review(userOrder) ? (
              <button
                className="btn btn-info my-3"
                type="button"
                onClick={() => setReviewVisibile((prev) => !prev)}
              >
                Add a new review
              </button>
            ) : (
              ""
            )
          ) : (
            ""
          )}
          {isReviewVisibile && (
            <div className="review_creation" id="review">
              <Form onSubmit={formik.handleSubmit}>
                <div className="inputs container w-50">{renderInputs}</div>
                <button
                  type="submit"
                  className="mb-4 btn btn-primary"
                  disabled={!formik.isValid}
                >
                  creat review
                </button>
              </Form>
            </div>
          )}
        </div>
        <div className="rating my-3">
          {data.reviews.length
            ? stars_rating(data.ratingNumbers)
            : "not rated yet"}
        </div>
        <div className="comments">
          <div className="container">
            <div className=" row justify-content-center">
            <p className=" mb-5 fs-3 fw-medium">customers comments</p>
            {data.reviews.length
                  ? data.reviews.map((review) => {
                      return <div className="col-md-3 border-bottom">
                        <p className="text-danger fw-semibold">{review.comment}</p>
                      </div> 
                    })
                  : "customers comments"}
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
