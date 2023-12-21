import React from "react";
import { Form } from "react-router-dom";
import Input from "../../pages/Input";
import { useFormik } from "formik";
import {validationSchema} from '../Validation/Validate.js'
import axios from "axios";
import { toast } from 'react-toastify';
export default function Register() {
  const initialValues = {
    userName: "",
    email: "",
    password: "",
    image: "",
  }

  const onSubmit = async (values) => {
    const formData = new FormData();
    formData.append("userName", values.userName);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("image", values.image);

    const {data} = await axios.post(import.meta.env.VITE_API_URL+"/auth/signup",formData);
    if(data.message === "success"){
      formik.resetForm();
      toast('Account created successfuly , please verify your email to login ', {
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
  }

   const handleImageChange = (event)=>{
      formik.setFieldValue("image", event.target.files[0])
   }

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  const inputs = [
    {
      id: "username",
      name: "userName",
      type: "text",
      title: "User name",
      value: formik.values.userName,
    },
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
    {
      id: "image",
      name: "image", 
      type: "file",
      title: "User image",
      onChange : handleImageChange,
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
      onChange={input.onChange || formik.handleChange} 
      errors = {formik.errors}
      onBlur={formik.handleBlur(input.name)}
      touched = {formik.touched}
    />
  ));

  return (
    <div className="container">
      <h2>Create Account</h2>
      <Form onSubmit={formik.handleSubmit} encType="multipart/form-data">
        {renderInputs}
        <button type="submit" disabled = {!formik.isValid}>Register</button>
      </Form>
    </div>
  );
}
