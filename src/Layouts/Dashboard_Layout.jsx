import React from 'react'
import Navbar from '../components/dashboard/Navbar/Navbar.jsx';
import Footer from '../components/dashboard/Footer/Footer.jsx';
import { Outlet } from 'react-router-dom';
export default function Dashboard_Layout() {
  return (
    <>
     <Navbar/>
     <Outlet/>
     <Footer/>
    </>
  )
}
