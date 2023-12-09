import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom'

function Category_details() {
    const {categoryID} = useParams();

    const getCategoryDetails = async ()=>{
        const {data} = await axios.get(import.meta.env.VITE_API_URL+`/products/category/${categoryID}`)
        return data.products
    }

    const {data , isLoading} = useQuery("CategoryDetails" , getCategoryDetails)

    if (isLoading){
        return <h2>Loading ...</h2>
    }
  return (
    <div className='products'>
      {data.length ? data.map((category)=>{
        return(
        <div className="category_details" key={category._id}>
          <h3>{category.name}</h3>
          <img src={category.mainImage.secure_url} className=' rounded-circle w-50 h-50 object-fit-fill'/>  
          <Link to={`/product/${category._id}`} >details</Link>
        </div>
        )
      }):<h2>no category details</h2>}
    </div>
  )
}

export default Category_details