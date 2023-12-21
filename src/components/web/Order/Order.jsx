import React, { useContext, useEffect, useState } from "react";
import { Form } from "react-router-dom";
import Input from "../../pages/Input";
import { useFormik } from "formik";
import { orderSchema } from "../Validation/Validate.js";
import axios from "axios";
import { toast } from "react-toastify";
import { CartContext } from "../Context/Cart.jsx";
import { useQuery } from "react-query";
export default function Order() {
  let { setCount, getCartContext } = useContext(CartContext);

  const initialValues = {
    coupon: "",
    address: "",
    phone: "",
  };
  const getCart = async () => {
    return await getCartContext();
  };

  const Total = (products) => {
    let Total = 0;
    products.map(
      (product) => (Total += product.quantity * product.details.price)
    );
    return `$${Total}`;
  };

  let { data, isLoading } = useQuery("getCartContext", getCart);

  const onSubmit = async (values) => {
    const token = localStorage.getItem("user Token");
    const { data } = await axios.post(
      import.meta.env.VITE_API_URL + "/order",
      values,
      { headers: { Authorization: `Tariq__${token}` } }
    );
    if (data.message === "success") {
      formik.resetForm();
      setCount(0);
      toast("Order created successfuly", {
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
    validationSchema: orderSchema,
  });

  const inputs = [
    {
      id: "coupon",
      name: "coupon",
      type: "text",
      title: "coupon(optional)",
      value: formik.values.coupon,
    },
    {
      id: "address",
      name: "address",
      type: "text",
      title: "your address",
      value: formik.values.address,
    },
    {
      id: "phone",
      name: "phone",
      type: "text",
      title: "your phone number",
      value: formik.values.phone,
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

  return (
    <>
      {isLoading && <p>Loaiding ...</p>}
      <div className="container w-100">
        <h2 className=" mb-3">creat your order</h2>
        {data?.products.length ? (
          <>
            <div className="row justify-content-center">
              {data.products.map((product) => {
                return (
                  <div className="col-md-2">
                    <div className="card h-100" key={product.productId}>
                      <img
                        src={product.details.mainImage.secure_url}
                        alt=""
                        className="h-100 w-100 border"
                      />
                      <p className="text-center">Quantity : {product.quantity}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <h2 className="my-3 text-center text-success fw-bold">Total price : {Total(data.products)}</h2>
          </>
        ) : (
          ""
        )}
        <Form onSubmit={formik.handleSubmit} encType="multipart/form-data">
          {renderInputs}
          <button
            type="submit"
            disabled={!formik.isValid || formik.isSubmitting}
          >
            Creat Order
          </button>
        </Form>
      </div>
    </>
  );
}
