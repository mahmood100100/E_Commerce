import React, { useContext } from 'react'
import { UserContext } from '../Context/User';

export default function ProfileOrder() {
    let {loading , userOrder} = useContext(UserContext);
    if (loading) {
        return <h2> Loading ...</h2>
    }
  return (
    <>
    {userOrder?.orders.map((order , index) => {
      return (
        <div className="order border border-3 border-info text-center bg-black text-white" key={index}>
        <h1>Order {index+1}</h1>
        <h2>Order address is <span className='text-info'>{order.address}</span></h2>
        <h2>the final price for this order is <span className='text-info'>{order.finalPrice}$</span> </h2>
        <h2>the paymant type for this order is <span className='text-info'>{order.paymentType}</span> </h2>
        <h2>the phone number for this order is <span className='text-info'>{order.phoneNumber}</span> </h2>
        <h2>order status is <span className='text-info'>{order.status}</span>  </h2>
      </div>
      )
    })}
      
    </>
  )
}
