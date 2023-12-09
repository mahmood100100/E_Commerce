import { RouterProvider} from "react-router-dom";
import { CartContextProvider } from "./components/web/Context/Cart.jsx";
import { router } from "./Layouts/Routes.jsx";
import { useContext, useEffect } from "react";
import { UserContext } from "./components/web/Context/User.jsx";
export default function App() {

 let {setUserToken} = useContext(UserContext)

 useEffect(()=>{
   if (localStorage.getItem("user Token")){
      setUserToken(localStorage.getItem("user Token"));
   }
 }, [])
  return (
      <CartContextProvider>
        <RouterProvider router={router} />
      </CartContextProvider>  
    
  )
}
