import Main from "../home/Main"
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { login, reset } from '../../features/auth/authSlice'
import { toast } from 'react-toastify'
import { RxCross1 } from 'react-icons/rx'
import { useNavigate } from 'react-router-dom'
import './authStyles.css'


const LoginForm = () => {
    const { isError,isSuccess ,message } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [formFields, setFormFields] = useState({
        email: '', password: ''
    })
    // destructure
    const { email, password } = formFields;

       useEffect(() => {
      //  alert('im here')

        setFormFields({
            email: '',
            password: ''
          });

  
      
         }, [])


   

    const handleChange = (e) => {
        setFormFields((prevValue) => ({
            ...prevValue,
            [e.target.name]: e.target.value
        }))
    }

    const closeLogForm= (e)=>{

        e.preventDefault()
        navigate('/')
        

    }

    const handleLogin = (e) => {

        if (!email || !password) {
            toast.error('Please enter the fields')
        } else {
            const userData = {
                email, password
            }
            dispatch(login(userData))
            dispatch(reset())
            // if (isError)
            // {
            //     toast.error(message)
            // }
            // else{
            //     navigate('/')
            // }
        }

    }

    useEffect(() => {
        if (isError) {
      
          
      
            toast.error(message)
            
        }

        if (isSuccess) 
        {
         //   console.log('login success')         
           // show()

          // toast.success('User loged in successfully!')

           navigate('/')


        }
        dispatch(reset())
      }, [isError, message,isSuccess])



  return (
    <>
     <Main />
     <div className="reg-form d-flex justify-content-center align-items-center z-index-3" >
          
          <Form className=' shadow col-lg-6  mx-auto py-2 px-4 rounded-3'  style={{backgroundColor: '#3C6D71' ,color:'#BEEF62'}}>
          <RxCross1 onClick={closeLogForm} className="d-block ms-auto" size={20} cursor="pointer" />
                       
          <h1 className='text-center'>Login</h1>  
           <label className="" htmlFor="">Email:</label>
            <Form.Control onChange={handleChange} name='email' value={email} className='my-2' type='text' placeholder='Enter Email address' />
            <label className="" htmlFor="">Password:</label>
            <Form.Control onChange={handleChange} name='password' value={password} className='my-2' type='password' placeholder='Enter Password' />
             <div className="text-center">
             <Button onClick={handleLogin} className='w-50 fw-bold px-2 mt-4 border-0'  style={{backgroundColor: '#F4743B' ,color:'#BEEF62'}}>
                Log In
            </Button>

             </div>
            
            <a href="" className='mb-4 text-decoration-none d-block mx-auto my-2 text-center' style={{color:'#BEEF62'}} >Forgot Password?</a>
          
            
        </Form>
        </div>

    </>
  )
}

export default LoginForm