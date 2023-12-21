import React, { useContext } from "react";
import { Form, Link, useNavigate } from "react-router-dom";
import Input from "../../pages/Input.jsx";
import { useFormik } from "formik";
import {loginSchema} from '../Validation/Validate.js'
import axios from "axios";
import { toast } from 'react-toastify';
import { UserContext } from "../Context/User.jsx";
import { CartContext } from "../Context/Cart.jsx";
export default function Login() {

  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  }

  const {userToken,setUserToken} = useContext(UserContext)
  const {getCartContext} = useContext(CartContext)
  if (userToken){
    navigate(-1)
  }
  
  const onSubmit = async (values) => {
    const {data} = await axios.post(import.meta.env.VITE_API_URL+"/auth/signin",values);
    if(data.message == "success"){

      formik.resetForm();

      localStorage.setItem("user Token", data.token);
      setUserToken(data.token);
      
      toast('login successfuly', {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
        navigate("/")
        getCartContext()
    }
  }

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema : loginSchema,
  });

  const inputs = [
    {
      id: "email",
      name: "email", 
      type: "email",
      title: "User email",
      value: formik.values.email,
    },
    {
      id: "password",
      name: "password", 
      type: "password",
      title: "User password",
      value: formik.values.password,
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
      <h2>Login</h2>
      <Form onSubmit={formik.handleSubmit}>
        {renderInputs}
        <button type="submit" className="mb-4" disabled = {!formik.isValid}>Login</button>
      </Form>
      <Link to={"/forgotPassword"} className=" text-decoration-none pt-3 ">forget your password ?</Link>
    </div>
  );
}
