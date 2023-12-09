import React from 'react'
import ReactDOM from 'react-dom/client'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import App from './App.jsx'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from 'react-query'
import './index.css'
import { UserContextProvider } from "./components/web/Context/User.jsx";
const queyClient = new QueryClient();


ReactDOM.createRoot(document.getElementById('root')).render(
  <UserContextProvider>
    <QueryClientProvider client={queyClient}>
     <ToastContainer/>
     <App />
    </QueryClientProvider>
  </UserContextProvider> 
)
