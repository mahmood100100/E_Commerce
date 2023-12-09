import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../Context/User';
import { CartContext } from '../Context/Cart';
import './Navbar.css'
export default function Navbar() {

  let {userToken , setUserToken , userData} = useContext(UserContext);
  let {count} = useContext(CartContext)

  const logout = ()=>{
    localStorage.removeItem("user Token");
    setUserToken(null);
    const navigate = useNavigate();
    navigate("/");
  }
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
      <a className="navbar-brand" href="#">T-shop</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav m-auto mb-2 mb-lg-0">
         
          <li className="nav-item">
            <Link className="nav-link" to={"/"}>Home</Link>
          </li>

          <li className="nav-item">
            <a className="nav-link" href="#">Categories</a>
          </li>

          <li className="nav-item">
          <a className="nav-link" href="#">Products</a>
        </li>
        {userToken&&
          <li className="nav-item">
          <Link to={"/cart"} className="nav-link position-relative">
              Cart
            <div className="count position-absolute bg-danger text-white px-1 rounded-circle d-flex justify-content-center align-items-center">
                {count}
              </div>
          </Link>
         </li> }
       
        
        </ul>
        <ul className="navbar-nav">
        <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          {userData ? userData.userName:"Account"}
        </a>
        <ul className="dropdown-menu ">
          {!userToken ?<>
            <li><Link className="dropdown-item" to="/register">register</Link></li>
          <li><hr className="dropdown-divider" /></li>
          <li><Link className="dropdown-item" to="/login">login</Link></li>
          </>:<>
          <li><Link className="dropdown-item" to="/profile">profile</Link></li>
          <li><hr className="dropdown-divider" /></li>
          <li><Link className="dropdown-item" onClick={logout}>logout</Link></li>
          </>}
          
        </ul>
      </li>
        </ul>
      
      </div>
    </div>

  </nav>
  )
}
