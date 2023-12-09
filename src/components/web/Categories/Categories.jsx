import axios from 'axios'
import React, { useContext } from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { Navigation, Pagination} from 'swiper/modules';
import { CartContext } from '../Context/Cart';

export default function Categories() {

  const getCategories = async ()=>{
    const {data} = await axios.get(import.meta.env.VITE_API_URL+"/categories/active?limit=10")
    return data;
  }
  
  const x = useContext(CartContext)

  const {data , isLoading} = useQuery("web-categories" , getCategories)

   if (isLoading){
    return <p>Loading ...</p>
   }
  return (
    <>
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={50}
      slidesPerView={4}
      navigation
      pagination={{ clickable: true }}
      onSlideChange={()=>{}}
      onSwiper={()=>{}}
    >
      {data.categories.length?data.categories.map(category=>{
        return(
          <SwiperSlide key={category._id} className=' text-center'>
            <Link to={`/products/category/${category._id}`}>
            <img src={category.image.secure_url} className=' rounded-circle w-50 h-50 object-fit-fill'/>
            <h3>{category.name}</h3>
            </Link>
          </SwiperSlide>
        )
      }):<h2>categories not found</h2>}      
    </Swiper>
    {/* <div className=' container-fluid'>
          <div className="row">
            {data.categories.length?data.categories.map(category=>{
              return(
                <div className="col-lg-4 col-md-6" key={category._id}>
                <img src={category.image.secure_url}/>
                <h3>{category.name}</h3>
              </div>
              )
            }):<p>categories not found</p>}
          </div>
        </div> */}
        <h2>{x.name}</h2>
    </>

  )
}
