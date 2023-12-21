import * as yup from 'yup'
export const validationSchema = yup.object({
  userName : yup.string().required("userName is required").min(6 ,"must be at least 6 char").max(20 , "must not exeeded more than 20 characters"),
  email : yup.string().required("email is required").email(),
  password : yup.string().required("password is required").min(6 ,"must be at least 6 char").max(30 , "must not exeeded more than 30 characters")
})

export const loginSchema = yup.object({
  email : yup.string().required("email is required").email(),
  password : yup.string().required("password is required").min(6 ,"must be at least 6 char").max(30 , "must not exeeded more than 30 characters")
})

export const sendCodeSchema = yup.object({
  email : yup.string().required("email is required").email()
})

export const resetPasswordSchema = yup.object({
  email : yup.string().required("email is required").email(),
  password : yup.string().required("password is required").min(6 ,"must be at least 6 char").max(30 , "must not exeeded more than 30 characters"),
  code: yup.string().required("Code is required").length(4, "Code must be exactly 4 characters"),
})
export const orderSchema = yup.object({
  coupon : yup.string().notRequired("optional").length(5 , "Coupon must be  5 characters"),
  address : yup.string().required("address is required"),
  phone: yup.number().required("phone is required"),
})
export const reviewSchema = yup.object({
  comment: yup.string().notRequired().min(3, "Comment must be at least 3 characters"),
  rating: yup.number().required("Rating is required").min(0, "Rating must be at least 0").max(5, "Rating must be at most 5"),
});