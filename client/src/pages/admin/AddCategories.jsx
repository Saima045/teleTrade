import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'

import { BiImages } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux';
import { addCategory } from '../../features/category/catSlice';
import { toast } from 'react-toastify';
import { ClockLoader } from 'react-spinners';
import { Adminsidebar } from '../../components/adminsidebar/Adminsidebar';
import { useNavigate } from 'react-router-dom';

const AddCategories = () => 
{

  const navigate = useNavigate()

  
 // get the state from the slice
  const { isLoading, isError,message } = useSelector(state => state.category);
  const [formFields, setFormFields] = useState({
                                                caption: ''
                                                
                                                    })

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageLoading, setImageLoading] = useState(false)
    // destructure
  const {caption } = formFields;



const dispatch = useDispatch()


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
const handleClick = async () => {

  if (!caption) {
    toast.error('Please enter the category caption')
  }
  else
  {
    const imageURL = await uploadImage(image)
    const data = {
         caption: caption, image: imageURL
    }
  
    console.log(data.caption)
    console.log(data.image)
    dispatch(addCategory(data))
    navigate('/admin') 
    

  }
 

}

useEffect(() => {
  if (isError) {

     // alert('4455')

      toast.error(message)
      
  }
}, [isError, message])
if (imageLoading || isLoading) {
  return <div style={{ height: '100vh', width: '100vw' }} className='d-flex justify-content-center align-items-center'>
      <ClockLoader color="#0D6EFD" />
  </div>

}

  return (
    <>
     <Container  fluid className='mt-3 px-0 ' style={{
                                                      padding:0,
                                                      width:''

                                                    }}>
            <Row>
                <Col className='ps-3' lg={3}>
                    <Adminsidebar/>
                </Col>
                <Col className='mt-1' lg={8}>
                                <Form className='  p-4 bg-white shadow rounded-3'>
                                
                                  <h1 className="text-center">Add Categories</h1>
                                

                                  
                                  <Row>

                                  <label htmlFor="">Name</label>
                                  <Form.Control  name='caption'  onChange={handleChange}  value={caption} className='my-2' type='text' placeholder='' />



                                  </Row>

                                  <Row className='align-items-center'>
                                    <Col className='text-center' xs={8}>

                                      <img width={'200px'} height={'200px'} style={{ objectFit: 'cover' }}
                                      src={imagePreview ? imagePreview : 'https://easy2crack.com/assets/default/default.jpg'}
                          
                                          alt="" />
                                        
                                          


                                    </Col>
                                    <Col xs={4}>
                                              <div className="d-flex align-items-center gap-2 position-relative">
                                                            <input type="file" onChange={handleImageChange} className='position-absolute' style={{
                                                                opacity: '0',
                                                                cursor: 'pointer'
                                                            }} name="" id="" />
                                                            <BiImages cursor='pointer' color='#41BE5E' size={70} />
                                                          
                                              </div>
                                    </Col>
                                  </Row>
                                  <hr></hr>
                              
                                  
                                  <Button onClick={handleClick}  style={{ background: '#36A420' }} className='border-0 fw-medium py-2 px-2 d-block mx-auto'>
                                              Add Category
                                  </Button>


    
        
                        </Form>

                        </Col>
            </Row>

     </Container>      
   
    </>
  )
}

export default AddCategories