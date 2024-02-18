import { useEffect,  useRef , useState } from "react";
import { Button, Form } from "react-bootstrap"
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux'
import { reset, signUP, updateUser } from "../../features/auth/authSlice";
import { ClockLoader } from 'react-spinners'
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import Main from "../home/Main";
import { TbNumber0Small } from "react-icons/tb";


const EditProfile = () => {

    // Create a ref to the file input element
  const fileInputRef = useRef(null);

   const dispatch = useDispatch()

    // select specific state from the initial state
   //const { user,message } = useSelector(state => state.auth)

    // navigate
  const navigate = useNavigate()
  // select specific state from the initial state
  const { isLoading, isError, isSuccess, message,user } = useSelector(state => state.auth)

  const [image, setImage] = useState(user?.image);
  const [imagePreview, setImagePreview] = useState(user?.image);
  const [imageLoading, setImageLoading] = useState(false)
   

  

  const [formFields, setFormFields] = useState({
      name: user?.name, email: user?.email,phone:user?.phone, about_me:user?.about_me
  });

  const [gender,setGender]=useState(user.gender)


  // destructure the fields
  const {  name, email,phone, about_me} = formFields;

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setImagePreview(url);
    setImage(file);
  }
  
const uploadImage = async (e) => {
    const data = new FormData();
   // console.log(image)
    data.append('file', image);
   // data.append('upload_preset', 'xola95pc');
   data.append('upload_preset', 'wg45db7u');
    try {
        setImageLoading(true)
        const response = await fetch('https://api.cloudinary.com/v1_1/dkxy59efx/image/upload', {
          method: 'POST',
          body: data
        
    })
  
        const imageData = await response.json();
        setImageLoading(false)
        console.log(imageData.url)
        return imageData.url
    } catch (error) {
        console.log(error)
    }
  
  }

  const handleImageDelete = (e) => {
     //alert('dfff')
    setImagePreview(null);
    setImage(null)

  }

  
  const handleClick =async (e) => {
      e.preventDefault()

      const imageURL = await uploadImage(image)
      console.log(imageURL)


      if (!name || !email || !phone  ) {
          toast.error('Please enter all required  fields!')
      } else {
          const formData = {
              name, email,phone,gender,about_me,image: imageURL,_id:user?._id
          }

          console.log(formData)

        //  alert(formData.gender)
          dispatch(updateUser(formData))
         // navigate('/')
          
      }
  }

  useEffect(() => {
      if (isError) {
        toast.error(message)
        dispatch(reset())
      }
      if (isSuccess) {
        //  alert(999)
          toast.success(message)
          dispatch(reset()) 
          navigate('/')
      }
     
    }, [isError, message,isSuccess,navigate,reset])

    if (isLoading) {
        return <div style={{ height: '100vh', width: '100vw' }} className='d-flex justify-content-center align-items-center'>
            <ClockLoader color="#0D6EFD" />
        </div>

    }

    

  // Function to trigger click on the file input
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleCancel = () => {
     navigate('/')
  };

 


  return (
    <>

    <Header />

      <div className="" style={{backgroundColor: 'rgba(60, 109, 113, 0.2)' ,color:'#BEEF62'}}>
      <div className=" fs-1 ps-5">Edit Profile</div>
<Form className='bg-white shadow-lg p-3  col-xs-12 col-md-10 col-sm-10 col-lg-8 mx-auto  rounded-2'>
   
    
    
  
    
    <div className="fw-medium fs-5">Profile Photo</div>
    <div className="d-flex gap-2 align-items-center m-3">

        <div className="col-md-2">
        {/* {user && ( */}
            <img
              src={imagePreview || "https://cdn-icons-png.freepik.com/512/186/186313.png"}
              alt="dropdown-icon"
              style={{ width: '100px', height: '100px' }}
             
            />
        {/* )} */}
        </div>
       

         <div className="col-md-2">
              {/* Hidden file input */}
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleImageChange}
              />

              {/* Button to trigger file input click */}
              <Button onClick={handleButtonClick} className="border border-0" style={{backgroundColor: '#F4743B' ,color:'#BEEF62'}}>Upload Photo</Button>
        </div>  
        {
          imagePreview && (

            <div className="col-md-2">
            <Button onClick={handleImageDelete } className="border border-0" style={{backgroundColor: '#F4743B' ,color:'#BEEF62'}} >Remove Photo</Button>
           </div>

          )
        }
       
    </div>

    <label htmlFor="" className="fw-medium fs-5">Name</label> 
    <Form.Control name="name" onChange={handleChange} value={name} className='my-2 text-capitalize' type='text'  style={{ textTransform: 'capitalize' }} />

    <label htmlFor="" className="fw-medium fs-5">Email</label> 
    <Form.Control name="email" onChange={handleChange} value={email} className='my-2' type='text' />
  
    <label htmlFor="" className="fw-medium fs-5">Phone</label> 
    <Form.Control name="phone" onChange={handleChange} value={phone} className='mb-2' type='text' />
   
    <div className="d-flex gap-2 align-items-center">
        <label className="fw-medium fs-5" htmlFor="selectInput">Gender:</label>
        <select className="form-control"
           onChange={handleGender} value={gender}
        >
            
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Prefer not to say" >Prefer not to say</option>
        </select>

        
        </div>
   
   

    
    <Form.Control name='about_me' as='textarea' rows={3} className="mt-2" onChange={handleChange} value={about_me} ></Form.Control>
     <div className="d-flex justify-content-center gap-2 mx-auto">
     
         <Button onClick={handleClick} style={{backgroundColor: '#F4743B' ,color:'#BEEF62'}} className="col-lg-3 mt-3 border-0">Save Changes</Button>
         <Button onClick={handleCancel} style={{backgroundColor: '#F4743B' ,color:'#BEEF62'}} className="col-lg-3 mt-3  border-0 px-5">Cancel</Button>
      </div> 
    
</Form>
<br></br>
</div>
    </>
  
  )
}

export default EditProfile