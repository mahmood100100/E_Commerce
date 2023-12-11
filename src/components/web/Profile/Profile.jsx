import React, { useContext, useEffect } from 'react'
import { UserContext } from '../Context/User.jsx'
import style from './Profile.module.css'
import { Link, Outlet } from 'react-router-dom';
export default function Profile() {

    let {getUserData , getOrderData } = useContext(UserContext);
    
    useEffect(()=>{
        getUserData();
        getOrderData();
       } , [])

  return (
    <>
    <div className='profile'>
       <div className="row">
        <div className="col-md-3 bg-black vh-100">
            <div className="side d-flex flex-column ps-5 ms-4 ">
              <Link to={''} className=' text-decoration-none text-white mt-3'>user information</Link>
              <Link to={"contact"} className=' text-decoration-none my-4 text-white'>contact</Link>
              <Link to={"order"} className=' text-decoration-none my-4 text-white'>order</Link>
            </div>
        </div>
        <div className="col-md-9 vh-100">
             <Outlet/>
        </div>
       </div>
    </div>
   </>
  )
}

