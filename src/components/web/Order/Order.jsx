import React, { useContext } from "react";
import { Form } from "react-router-dom";
import Input from "../../pages/Input";
import { useFormik } from "formik";
import {orderSchema} from '../Validation/Validate.js'
import axios from "axios";
import { toast } from 'react-toastify';
import { CartContext } from "../Context/Cart.jsx";
export default function Order() {
  const initialValues = {
    coupon: "",
    address: "",
    phone: '',
  }
  let {setCount} = useContext(CartContext);
  const onSubmit = async (values) => {
    const token = localStorage.getItem("user Token")
    const {data} = await axios.post(import.meta.env.VITE_API_URL+"/order",values , {headers : {Authorization :`Tariq__${token}`}});
    if(data.message === "success"){
      formik.resetForm();
      setCount(0)
     toast('order created', {
        position: "top -right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
  }

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema : orderSchema,
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
      errors = {formik.errors}
      onBlur={formik.handleBlur(input.name)}
      touched = {formik.touched}
    />
  ));

  return (
    <div className="container">
      <h2>creat your order</h2>
      <Form onSubmit={formik.handleSubmit} encType="multipart/form-data">
        {renderInputs}
        <button type="submit" disabled = {!formik.isValid}>Creat Order</button>
      </Form>
    </div>
  );
}
