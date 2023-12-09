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
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
             }
          
          return token

        }catch(e){
            console.log(e)
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

    useEffect(()=>{
        const token = localStorage.getItem("user Token");
        if(token){
            getCartContext()
        }
    },[count])

    return <CartContext.Provider value={{AddToCartContext , getCartContext , removeCartContext , count}}>

        {children}

    </CartContext.Provider>
}
