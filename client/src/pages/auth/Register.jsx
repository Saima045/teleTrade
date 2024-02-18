
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap"
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux'
import { reset, signUP } from "../../features/auth/authSlice";
import { ClockLoader } from 'react-spinners'
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import Main from "../home/Main";

const Register = () => {

    const dispatch = useDispatch()

    // navigate
   const navigate = useNavigate()
  // select specific state from the initial state
  const { isLoading, isError, isSuccess, message } = useSelector(state => state.auth)

    // check if user is registerd successfully

  //   useEffect(() => {
  //     if (isSuccess) {
  //       //  alert(999)
  //         navigate('/')
  //     }

  //     //dispatch(reset())

  // }, [isSuccess, navigate])

  const [formFields, setFormFields] = useState({
      name: '', email: '',phone:'', password: '', about_me:''
  });

  const [gender,setGender]=useState('Male')


  // destructure the fields
  const {  name, email,phone, password,about_me} = formFields;

  const handleGender = (e) => {
      setGender(e.target.value);
    };

  // get the onChange={handleChange} values that user types
  const handleChange = (e) => {
      setFormFields((prevValue) => ({
          ...prevValue,
          [e.target.name]: e.target.value
      }))
  }

  const closeRegForm =(e)=>{
    e.preventDefault()
    navigate('/')

  }

  
  const handleClick = (e) => {
      e.preventDefault()
      if (!name || !email || !phone || !password ) {
          toast.error('Please enter all required  fields!')
      } else {
          const formData = {
              name, email,phone, password, gender,about_me
          }

          console.log(formData)

        //  alert(formData.gender)
          dispatch(signUP(formData))
         // navigate('/')
          
      }
  }

  useEffect(() => {
      if (isError) {
        toast.error(message)
      }
      if (isSuccess) 
      {
        toast.success('User registered successfully!')
        navigate('/')
      }
      dispatch(reset())
    }, [isError, message,isSuccess,navigate,reset])

    if (isLoading) {
        return <div style={{ height: '100vh', width: '100vw' }} className='d-flex justify-content-center align-items-center'>
            <ClockLoader color="#0D6EFD" />
        </div>

    }

  return (
    <>

    <Main/>

      <div className="reg-form d-flex justify-content-center align-items-center">

<Form className=' shadow p-3 col-lg-6 mx-auto'  style={{backgroundColor: '#3C6D71' ,color:'#BEEF62'}}>
    <RxCross1 onClick={closeRegForm} className="d-block ms-auto" size={20} cursor="pointer" />
    <h3>Sign Up</h3>
  
    
 
    <Form.Control name="name" onChange={handleChange} value={name} className='my-2' type='text' placeholder='Please Enter Name' />
    <Form.Control name="email" onChange={handleChange} value={email} className='my-2' type='text' placeholder='Please Enter Email' />
  
    <Form.Control name="phone" onChange={handleChange} value={phone} className='mb-2' type='text' placeholder='Please Enter Mobile Number' />
    <Form.Control name="password" onChange={handleChange} value={password} className='my-2' type='text' placeholder='New Password' />

    <div className="d-flex gap-2 align-items-center">
        <label className="" htmlFor="selectInput">Gender:</label>
        <select className="form-control "
           onChange={handleGender} value={gender}
        >
            
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Prefer not to say" >Prefer not to say</option>
        </select>

        
        </div>
   
   

    
    <Form.Control name='about_me' as='textarea' rows={3} className="my-2" onChange={handleChange} value={about_me} placeholder='About Me'></Form.Control>

     <Button onClick={handleClick} style={{ background: '#F4743B' ,color:'#BEEF62' }} className="w-50 mt-3 mx-auto fw-bold d-block border-0">Sign Up</Button>
</Form>
</div>
    </>
  )
}

export default Register