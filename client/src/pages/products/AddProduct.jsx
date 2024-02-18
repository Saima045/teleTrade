import React, { useEffect, useState } from 'react'
import Header from '../../components/header/Header'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import { MdAddAPhoto } from "react-icons/md";
import { RxCross1 } from 'react-icons/rx';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../features/category/catSlice';
import './product.css'
import { addProduct, resetProd } from '../../features/product/prodSlice';
import { ClockLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
import { reset } from '../../features/auth/authSlice';

const AddProduct = () => 
{
  const navigate=useNavigate()
 
   // select specific state from the initial state
   const { user } = useSelector(state => state.auth)
   // get the state from the slice
   //Inside your component
   const {isLoading,  isError,isSuccess, message } = useSelector(state => state.product);
   

  const dispatch = useDispatch();
  const {allCategories } = useSelector(state => state.category);
  const [category,setCategory]=useState('')
  useEffect(() => {
    // alert('intial')
    if (allCategories.length==0)
      {
        dispatch(getCategories())
      }
        // console.log('in use effect')
        // console.log(allCategories[0]?._id)
        setCategory(allCategories[0]?.caption)

      //}
      if (!user)
      {
        navigate('/login')
        //navigate('/postad')


      }
    
    
 }, [])
 

    const [formFields, setFormFields] = useState({
      title:'',
      desc:'',
      condition:'New',
      location:''
       })

    const [price, setPrice] = useState('');
    const [numericValue, setNumericValue] = useState('');
     
    const handlePriceChange = (event) => {
         const inputValue = event.target.value;
     
         // Remove non-numeric characters
         const numericInput = inputValue.replace(/[^\d.]/g, '');
     
         // Format the numeric value as Pakistani currency
         const formattedInput = new Intl.NumberFormat('en-PK', {
           style: 'currency',
           currency: 'PKR',
           minimumFractionDigits: 0,
         }).format(numericInput);

        //  const formattedInputWithoutSymbol = formattedInput.replace('Rs', '');

        //  setPrice(formattedInputWithoutSymbol.trim());
     
         setPrice(formattedInput);
         setNumericValue(numericInput);
       };
     

    
       // destructure
    const {title,desc,condition,location} = formFields;  

    const [images, setImages] = useState([null,null,null,null,null]);
    const [imagePreviews, setImagePreviews] = useState([null,null,null,null,null]);
    const [imageLoading, setImageLoading] = useState(false)

   
    const handleCategory= (e)=>
    {
     // console.log(e.target.value)
      setCategory(e.target.value)
    }

    const handleChange = (e) => {
      setFormFields((prevValue) => ({
          ...prevValue,
          [e.target.name]: e.target.value
      }))
    }

    

    const handleImageSelect = (e,index) => {
        const file = e.target.files[0];
        const imagePath = URL.createObjectURL(file);
    
        const newImagePreviews = [...imagePreviews];
        newImagePreviews[index] = imagePath;
        setImagePreviews(newImagePreviews);

        const newImages = [...images];
        newImages[index] = file;
        setImages(newImages);


      };

      
      const handleImageDelete = (e,index) => {
        const newImagePreviews = [...imagePreviews];
        newImagePreviews[index] = null;
        setImagePreviews(newImagePreviews);

      }

      const handleCancel=() => {
        navigate('/')
       }
         

const uploadImage = async(e) => 
{

  const urls = [];
  if (images.length>0)
  {
    try {
                    
                      setImageLoading(true)
                      await Promise.all(images.map(async (imgfile)  => 
                      {
                          if (imgfile instanceof File && imgfile.size > 0) 
                          {
                             const data = new FormData();
                             data.append("file", imgfile);
                             data.append('upload_preset', 'wg45db7u');                         
                             const response = await fetch('https://api.cloudinary.com/v1_1/dkxy59efx/image/upload', {
                                                            method: 'POST',
                                                            body: data                                                      
                                                      })
                         
                           
                           
                              // Extracting URLs from imageData
                              const imageData = await response.json();
                              if (response.ok) 
                              {
                            
                               urls.push(imageData.url);
                              
                              }
                              else 
                              {
                                console.error('Error uploading images:',imageData.message);
                              }

                             
                            }
                            else
                            {
                              if (imgfile)
                              {
                                console.log('Invalid file');
                              }
                               
                            }

                        
                           
                       }))//end for 
                       
                       setImageLoading(false);
                      
                     return urls;
                        
                  } //end try
                      
                     
                  catch (error) 
                  {
                    //  console.log('in catch')
                      console.log(error)
                  }


              }
              else
               {
                  return urls
               }
      }

      const handleClick = async () => {

        if (!title) {
          toast.error('Please enter the title')
        }
        else if (!desc) {
          toast.error('Please enter the description')
        }
        else if (!price) {
          toast.error('Please enter the price')
        }
        else if (!location) {
          toast.error('Please enter ad location,city etc')
        }
        else if (images.length<1) {
          toast.error('Please select at least 1 image')
        }

        else
        {
          const imageURLs = await uploadImage(images)
          const data = {
            category,title,desc,condition,price, image: imageURLs,location,user:user?._id
          }
        
       //   console.log('after submit') 
        //  console.log(data)
          dispatch(addProduct(data))
         // dispatch(addProduct)
          
        }
       
      
      }


      useEffect(() => {
        if (isError) {
          toast.error(message)
        }
        if (isSuccess) 
        {
          toast.success('Product addded successfully!')
          navigate('/')
        }
        dispatch(resetProd())
      }, [isError, message,isSuccess,navigate,resetProd])
  

      
      if (imageLoading || isLoading) {
        return <div style={{ height: '100vh', width: '100vw' }} className='d-flex justify-content-center align-items-center'>
            <ClockLoader color="#0D6EFD" />
        </div> 
      }
  return (
    <>
    <div style={{overflowX: 'hidden', height:'100vh' ,backgroundColor: 'rgba(60, 109, 113, 0.2)' ,color:'#BEEF62'}}>
    
    <Header/>
    <Container>
    <h1 className='text-left'style={{color:'#F4743B'}}>Post your Ad</h1>
    <Form className='bg-white shadow-lg p-3  col-lg-8 mx-auto rounded-2'>
       
       
        <label className="" htmlFor="selectInput">Choose your category</label>
        
       
        <select className="form-control category" name='category'
          onChange={handleCategory}  value={category}>
             {allCategories.map((category) => 
             (
               // <option value={category?._id}>{category?.caption}</option>
               <option value={category?.caption}>{category?.caption}</option>
                             
               ))}
         </select>

        <label className="" htmlFor="selectInput">Ad Title</label>
        <Form.Control name="title"  className='title my-2 border-1 border-dark' onChange={handleChange}  value={title}  type='text' placeholder='Please enter title' />
        <label  htmlFor="selectInput">Description</label>
      
        <Form.Control  className="desc border-1 border-dark" name='desc' as='textarea' rows={3} onChange={handleChange}  value={desc} placeholder='Please enter brief description about item to be sold'  ></Form.Control>
        <label className="" htmlFor="selectInput">Condition</label><br></br>
        <div className='d-flex flex-column p-2'>
            <div className='d-flex gap-1 p-1'>
                <input   type="radio"   onChange={handleChange} value="New" name='condition'  checked={condition === 'New'} />
                <label className='p-0'>New </label>   
            </div>
            <div className='d-flex gap-1  p-1'>
                <input   type="radio" onChange={handleChange}  value="Used" name='condition' checked={condition === 'Used'} className='p-2'  />
                <label className='p-0'>Used </label>   
            </div>
      

        </div>
        <label htmlFor="">Set a Price</label><br></br>

        <Form.Control
        type="text"
        value={price}
        onChange={handlePriceChange}
        placeholder="Enter amount in PKR"
        className='price border-dark'
         />

      
    

        <label htmlFor="">Upload upto 5 Images</label>
        <Row className=' '>
        
          {imagePreviews.map((imagePrev, index) => 
          (
            <Col lg={2} md={4} xs={4} className='my-2'> 
              <Card className='image1 align-items-center my-auto justify-content-center text-center' style={{width:'100px',
                           height:'100px'}}>
                    {imagePrev ?
                        (
                          <div className="position-relative">
                            <RxCross1 onClick={(e) => handleImageDelete(e, index)} className="position-absolute top-0 end-0 mt-1 me-1 z-index-1" size={20} cursor="pointer" />

                            <img
                              width="100px"
                              height="100px"
                              src={imagePrev}
                              alt="Preview"
                              style={{ objectFit: 'cover', zIndex: 0 }}
                            />
                          </div>
                           
                        ) : 
                        (
                            <div className="d-flex align-items-center gap-2 position-relative">
                            <input type="file" className='position-absolute' style={{
                                opacity: '0',
                                cursor: 'pointer'
                            }} name="" id="" onChange={(e) => handleImageSelect(e, index)}/>
                             
                             <MdAddAPhoto size={25}   />
                            </div>
                            
                            
                        )} 
              </Card>
            </Col>  
             
         ))}
        
        </Row>
         {/* <Row>
            <Col lg={2}> 
              <Card className='image1 align-items-center my-auto justify-content-center' style={{width:'100px',
                             height:'100px'}}>
                  
                 <MdAddAPhoto size={25}/>
              </Card>
            </Col>
            <Col lg={2}> 
              <Card className='align-items-center my-auto justify-content-center' style={{width:'100px',
                             height:'100px'}}>
                 <MdAddAPhoto size={25}/>
              </Card>
            </Col>
            <Col lg={2}> 
              <Card className='align-items-center my-auto justify-content-center' style={{width:'100px',
                             height:'100px'}}>
                 <MdAddAPhoto size={25}/>
              </Card>
            </Col>
            <Col lg={2}> 
              <Card className='align-items-center my-auto justify-content-center' style={{width:'100px',
                             height:'100px'}}>
                 <MdAddAPhoto size={25}/>
              </Card>
            </Col>
            <Col lg={2}> 
              <Card className='align-items-center my-auto justify-content-center' style={{width:'100px',
                             height:'100px'}}>
                 <MdAddAPhoto size={25}/>
              </Card>
            </Col>
        </Row> */}
        <label htmlFor="">Your Ad Location</label>
        <Form.Control name="location"  onChange={handleChange}  value={location} className='loc my-2 border-dark' type='text' placeholder='' />

        <div className="d-flex justify-content-center gap-1">
        <Button  onClick={handleClick} style={{backgroundColor: '#F4743B' ,color:'#BEEF62'}} className='border-0 fw-medium py-2 px-4 d-block col-lg-3'>
                                              Post Ad
        </Button>
        <Button  onClick={handleCancel} style={{backgroundColor: '#F4743B' ,color:'#BEEF62'}} className='border-0 fw-medium py-2 px-5 d-block col-lg-3'>
                                              Back
        </Button>

        </div>
      
        
          
      </Form>
      </Container>
      </div>
    </>

  )
}

export default AddProduct