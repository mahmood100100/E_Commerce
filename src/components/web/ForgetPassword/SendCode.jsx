import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { Form, useNavigate } from 'react-router-dom'
import { sendCodeSchema } from '../Validation/Validate.js'
import Input from '../../pages/Input'
import { toast } from 'react-toastify'
export default function SendCode() {

    const navigate = useNavigate();

    const initialValues = {
        email: "",
      }
    
      const onSubmit = async (value) => {

        const {data} = await axios.patch(`${import.meta.env.VITE_API_URL}/auth/sendcode`,value)
        if(data.message === "success"){

            formik.resetForm();
            toast('code sended successfuly', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
                navigate("/resetPassword")
        }
      }

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema : sendCodeSchema

    })

    const inputs = [
        {
          id: "email",
          name: "email", 
          type: "email",
          title: "User email",
          value: formik.values.email,
        }]
    
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
      <h2>send code to reset your password</h2>
      <Form onSubmit={formik.handleSubmit}>
        {renderInputs}
        <button type="submit" className="mb-4" disabled = {!formik.isValid}>send code</button>
      </Form>
      </div>
  )
}
