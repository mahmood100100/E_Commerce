import axios from 'axios';
import { toast } from 'react-toastify';
import { createContext, useEffect, useState} from 'react'

export const CartContext = createContext(null)

export function CartContextProvider({children}){

    const [count , setCount] = useState(0);
    const [loading , isLoading] = useState(true);

    const AddToCartContext = async (productId)=>{
        try{
            const token = localStorage.getItem('user Token');
            const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/cart` ,
             {productId} ,
             {headers : {Authorization :`Tariq__${token}` }})
             if (data.message == 'success'){
                setCount(data.cart.products.length)
                toast('product added successfuly', {
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
          
          return token

        }catch(e){
            toast('product already exist', {
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

    const getCartContext = async ()=>{

        try{
            isLoading(true)
            const token = localStorage.getItem("user Token");
            const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/cart`,
            {headers:{Authorization:`Tariq__${token}`}})
            setCount(data.count)
            isLoading(false);
            return data;
        }catch(e){
            
            console.log(e)
        }
    }

    const removeCartContext = async (productId)=>{

        try{
            isLoading(true);
            const token = localStorage.getItem("user Token");
            const {data} = await axios.patch(`${import.meta.env.VITE_API_URL}/cart/removeItem`,
            {productId},
            {headers:{Authorization:`Tariq__${token}`}})
            setCount(data.cart.products.length)
            isLoading(false);
            return data
        }catch(e){
            console.log(e);
        }
    }

    const clearCartContext = async () => {
        try{
        isLoading(true);
        const token = localStorage.getItem("user Token");
        const {data} = await axios.patch(`${import.meta.env.VITE_API_URL}/cart/clear`,
        '',
        {headers :{Authorization:`Tariq__${token}`}}
        )
        setCount(0)
        if(data.message == 'success'){
            toast('cart is clear', {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
                isLoading(false);
        }
        }catch(e){
            console.log(e);
        }
    }

    const increaseQuantityCartContext = async (productId)=>{

        try{

            const token = localStorage.getItem("user Token");
            const {data} = await axios.patch(`${import.meta.env.VITE_API_URL}/cart/incraseQuantity`,
            {productId},
            {headers:{Authorization:`Tariq__${token}`}})
            return data

        }catch(e){
            console.log(e);
        }
    }

    const decreaseQuantityCartContext = async (productId)=>{

        try{

            const token = localStorage.getItem("user Token");
            const {data} = await axios.patch(`${import.meta.env.VITE_API_URL}/cart/decraseQuantity`,
            {productId},
            {headers:{Authorization:`Tariq__${token}`}})
            return data

        }catch(e){
            console.log(e);
        }
    }

    useEffect(()=>{
        const token = localStorage.getItem("user Token");
        if(token){
            getCartContext()
        }
    },[count])

    return <CartContext.Provider value={{ AddToCartContext , getCartContext , removeCartContext , count , loading , setCount , clearCartContext , increaseQuantityCartContext , decreaseQuantityCartContext }}>

        {children}

    </CartContext.Provider>
}
