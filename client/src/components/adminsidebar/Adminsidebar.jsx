import React from 'react'
import { Link } from 'react-router-dom'

export const Adminsidebar = () => {
  return (
    <>
       {/* <ul className='p-5 m-0  bg-danger'>
          <li className=' m-0' > */}
          <div className='d-flex flex-column gap-2'>
            <Link to="/admin" className='fs-3 text-black' style={{ textDecoration: 'none' }}>Home</Link>
            <Link to="/addcategories" className='fs-3 text-black' style={{ textDecoration: 'none' }}>Add Categories</Link>

          </div>
            
          {/* </li>
          <li> */}
           
          {/* </li>
        </ul> */}
    </>
  )
}
