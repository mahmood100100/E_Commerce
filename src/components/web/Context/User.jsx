import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let UserContext = createContext(null);

export function UserContextProvider({children}) {

    const [userToken , setUserToken] = useState(null)
    const [userData , setUserData] = useState(null)
    const [userOrder , setUserOrder] = useState(null)
    let [loading , isLoading] = useState(true)

    const getUserData = async() =>{
        if(userToken){
            const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/user/profile`, {headers :{Authorization : `Tariq__${userToken}`}})
            setUserData(data.user)
            isLoading(false)
        }

    }

    const getOrderData = async() =>{
        if(userToken){
            const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/order`,{headers :{Authorization :`Tariq__${userToken}`}})
            setUserOrder(data);
            isLoading(false);
        }
    }

    useEffect(()=>{
        getUserData();
        getOrderData();
       } , [userToken])

    
   return <UserContext.Provider value={{userToken , setUserToken , userData , getUserData , loading , userOrder , getOrderData}}>
       {children}
   </UserContext.Provider>

}
