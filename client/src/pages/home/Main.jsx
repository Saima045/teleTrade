import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout, reset } from '../../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/header/Header'
import CategoriesShow from './CategoriesShow'


const Main = () => {
   





  return (
    <>

    <div className='z-index-0'>
    <Header />
     {/* <div className='text-center'>
        <img width='100%' height='230px' src="https://t4.ftcdn.net/jpg/03/14/20/99/240_F_314209989_NwKevyiNyMvXcM4mMkWjhUn0TAyO4i6I.jpg" alt="" />
   
     </div> */}

     <div className='text-center'>
        <img width='100%' height='200px' src="https://t4.ftcdn.net/jpg/03/65/85/47/360_F_365854716_ZHB0YN3i3s0H7NjI9hiezH53D5nvoF0E.jpg" alt="" />
   
     </div>
     <CategoriesShow/>

    </div>
    
    
    </>
  )
}

export default Main