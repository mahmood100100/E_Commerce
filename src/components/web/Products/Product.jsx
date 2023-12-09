import axios from 'axios';
import React, { useContext } from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom'
import { CartContext } from '../Context/Cart';
function Product() {
    const {productID} = useParams();

    const getProduct = async ()=>{
        const {data} = await axios.get(import.meta.env.VITE_API_URL+`/products/${productID}`)
        return data.product;
    }

    const {data , isLoading} = useQuery("product" , getProduct);


    const {AddToCartContext} = useContext(CartContext);
    
    const AddToCart = async (id)=>{
      const res = await AddToCartContext(id);
    }

    if (isLoading){
        return <h2>Loading ...</h2>
    }
  return (
    <div className='product'>
       <div className="d-flex">
        <div className="col-lg-8 overflow-hidden">
        {data.subImages.map((subImage , index)=>{
          return (
              <img src={subImage.secure_url} alt="" key={index}/>
          )
        }
        )}
        </div>
        <div className="col-lg-4">
          <h4 className=' fs-4'>{data.name}</h4>
          <p>{data.price}</p>
          <button className=' btn btn-outline-info' onClick={()=>AddToCart(data._id)}>Add to cart</button>
        </div>
        
       </div>
    </div>
  )
}

export default Product