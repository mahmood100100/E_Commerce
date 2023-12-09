import React, { useContext, useEffect } from 'react'
import { UserContext } from '../Context/User'

export default function Profile() {

    let {getUserData , userData} = useContext(UserContext);
    
    useEffect(()=>{
        getUserData();
       } , [])

  return (
    <>
    {userData && <div className="container my-5 py-5  bg-black">
          <div className="row">
              <div className="col-md-7">
                  <div className="container-fluid">
                    <div className="userImage border border-2 border-white">
                    <img src={userData.image.secure_url} alt="profile image" className=' w-100 h-100' />
                  </div>
                  </div>
              </div>
              <div className="col-md-5">
                  <div className="container-fluid h-100">
                    <div className="userData d-flex flex-column align-items-center justify-content-center h-100">
                        <h1 className=' text-info'>{userData.userName}</h1>
                        <p className='fs-3 text-white'>your role is <span className=' text-info'>{userData.role}</span></p>
                        <p className='fs-4 text-white'>your email is <span className=' text-info'>{userData.email}</span></p>
                        <p className='fs-4 text-white'>your status is <span className=' text-info'>{userData.status}</span></p>

                    </div>
                  </div>
              </div>
          </div>
        </div>}  
  </>
  )
}

