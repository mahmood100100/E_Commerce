import React, { useContext } from 'react'
import { UserContext } from '../Context/User';

export default function Contact() {
    let {loading , userData} = useContext(UserContext);
    if (loading) {
        return <h2> Loading ...</h2>
    }
  return (
    <>
    {userData&&<h2>{userData.email}</h2>}
    </>
  )
}
