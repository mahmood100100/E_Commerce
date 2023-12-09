import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { Form, useNavigate } from 'react-router-dom'
import { resetPasswordSchema } from '../Validation/Validate.js'
import Input from '../../pages/Input.jsx'
import { toast } from 'react-toastify'
export default function resetPassword() {

    const navigate = useNavigate();

    const initialValues = {
        email: "",
        password: "",
        code: "",
      }
    
      const onSubmit = async (values) => {

        const {data} = await axios.patch(`${import.meta.env.VITE_API_URL}/auth/forgotPassword`,values)
        if(data.message === "success"){

            formik.resetForm();
            toast('Password changed successfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
                navigate("/login")
        }
      }

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema : resetPasswordSchema

    })

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
          {
            id: "code",
            name: "code", 
            type: "text",
            title: "User code",
            value: formik.values.code,
          }
    ]
    
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
      <h2>reset your password</h2>
      <Form onSubmit={formik.handleSubmit}>
        {renderInputs}
        <button type="submit" className="mb-4" disabled = {!formik.isValid}>reset password</button>
      </Form>
      </div>
  )
}
