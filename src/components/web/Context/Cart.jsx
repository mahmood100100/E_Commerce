import axios from 'axios';
import { toast } from 'react-toastify';
import { createContext, useEffect, useState} from 'react'

export const CartContext = createContext(null)

export function CartContextProvider({children}){

    const [count , setCount] = useState(0);

    const AddToCartContext = async (productId)=>{
        try{
            const token = localStorage.getItem('user Token');
            const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/cart` ,
             {productId} ,
             {headers : {Authorization :`Tariq__${token}` }})
             if (data.message == 'success'){
                setCount(data.cart.products.length)
                toast('product added successfully', {
                    position: "top -right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
                    });
             }
          
          return token

        }catch(e){
            toast(`product already exist`, {
                position: "top -right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        }
    }

    const getCartContext = async ()=>{

        try{
            const token = localStorage.getItem("user Token");
            const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/cart`,
            {headers:{Authorization:`Tariq__${token}`}})
            setCount(data.count)
            return data;

        }catch(e){
            
            console.log(e)
        }
    }

    const removeCartContext = async (productId)=>{

        try{

            const token = localStorage.getItem("user Token");
            const {data} = await axios.patch(`${import.meta.env.VITE_API_URL}/cart/removeItem`,
            {productId},
            {headers:{Authorization:`Tariq__${token}`}})
            setCount(data.cart.products.length)
            return data

        }catch(e){
            console.log(e);
        }
    }

    const clearCartContext = async () => {
        try{
        const token = localStorage.getItem("user Token");
        const {data} = await axios.patch(`${import.meta.env.VITE_API_URL}/cart/clear`,
        '',
        {headers :{Authorization:`Tariq__${token}`}}
        )
        setCount(0)
        if(data.message == 'success'){
            toast(`Cart is clear`, {
                position: "top right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
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

    return <CartContext.Provider value={{ AddToCartContext , getCartContext , removeCartContext , count , setCount , clearCartContext , increaseQuantityCartContext , decreaseQuantityCartContext }}>

        {children}

    </CartContext.Provider>
}
