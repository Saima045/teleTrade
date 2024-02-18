import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProduct, resetProd, updateProduct } from "../../features/product/prodSlice";
import { TbH1 } from "react-icons/tb";
import { getCategories } from "../../features/category/catSlice";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { MdAddAPhoto } from "react-icons/md";
import { RxCross1 } from 'react-icons/rx';
import { toast } from "react-toastify";
import { ClockLoader } from 'react-spinners';
import Header from "../../components/header/Header";


const EditProduct = () => {
   const {Id } = useParams()
   const dispatch=useDispatch()
   const navigate=useNavigate()
   
   const { isLoading, isError,isSuccess, updateSuccess,message,productAd } = useSelector(state => state.product);

   //const [foundProduct,setfoundProduct]=useState('')

   const { user } = useSelector(state => state.auth)

   const {allCategories } = useSelector(state => state.category);

   const [category,setCategory]=useState('')
   const [formFields, setFormFields] = useState({
                                                  title:'',
                                                  desc:'',
                                                  condition:'New',
                                                  location:''
                                                  })
    
   const [price, setPrice] = useState(productAd?.price);

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

         


                setPrice(formattedInput);
                //setNumericValue(numericInput);
    };

        // destructure
    const {title,desc,condition,location} = formFields;  

    const handleChange = (e) => {
        setFormFields((prevValue) => ({
            ...prevValue,
            [e.target.name]: e.target.value
        }))
      }
  
    
     
      
      
   const [images, setImages] = useState([]);
   const [imagePreviews, setImagePreviews] = useState([]);
   const [imageLoading, setImageLoading] = useState(false)

   const handleImageSelect = (e) => {
    const file = e.target.files[0];

    if (file instanceof File && file.size > 0)
    {
      
      const imagePath = URL.createObjectURL(file);

      const newImagePreviews = [...imagePreviews];
      newImagePreviews.push(imagePath)
    
      setImagePreviews(newImagePreviews);

  
      const newImages = [...images];
      newImages.push(file);
      setImages(newImages);

    }
   

  };

  
  
  const handleImageDelete = (e,index) => {
    const newImagePreviews = [...imagePreviews];
    newImagePreviews.splice(index, 1);
    setImagePreviews(newImagePreviews);

    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
    

  }

useEffect(() => {

    if (!user) {
      navigate('/login');
    }
   
    const data = {
      _id: Id,
    };

    dispatch(getProduct(data));

    if (allCategories.length === 0) {
      dispatch(getCategories());
    }

  },[])

useEffect(() => {
    
    if (productAd) 
    {
      setFormFields({
        title: productAd?.title,
        desc: productAd?.desc,
        condition: productAd?.condition,
        location: productAd?.location,
      });
      setCategory(productAd?.category);
      console.log(productAd?.images)
      setImagePreviews(productAd?.image)
      setImages(productAd?.image)
      setPrice(productAd?.price)
    //  console.log(isSuccess)
     
     // console.log(isSuccess)
    }
   // dispatch(resetProd()); 
  }, [productAd]);

  // useEffect(() => {
   
  //   if (allCategories.length === 0) {
  //     dispatch(getCategories());
  //   }
  

  // }, [allCategories, dispatch]);

      
  

useEffect(() => {
        if (isError) 
        {
          toast.error(message)
          dispatch(resetProd())
        }
        if (updateSuccess) 
        {
          toast.success('Product updated successfully!')
          dispatch(resetProd())
          navigate('/manage-ads')
        }
       
      }, [isError, message,updateSuccess,navigate,resetProd])

    
   const handleCategory= (e)=>
   {
    
     setCategory(e.target.value)
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
                                          if (imgfile.includes('cloudinary.com'))
                                          {
                                          // console.log('Invalid file');
                                            urls.push(imgfile);

                                          }
                                          else
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

   const handleCancel=() => {
    navigate('/manage-ads')
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
        category,title,desc,condition,price, image: imageURLs,location,user:user?._id,prod_id:Id
      }
    
   //   console.log('after submit') 
      console.log(data)
      dispatch(updateProduct(data))
     // dispatch(addProduct)
      
    }
   
  
  }

  if (imageLoading || isLoading) {
    return <div style={{ height: '100vh', width: '100vw' }} className='d-flex justify-content-center align-items-center'>
        <ClockLoader color="#0D6EFD" />
    </div> 
  }
   

  

  return (
    <>

     <div style={{overflowX: 'hidden', height:'100vh' ,backgroundColor: 'rgba(60, 109, 113, 0.2)' ,color:'#BEEF62'}}>
      <Header/>
      <Container className="text-capitalize">
      <h1 className='text-left' style={{color:'#F4743B'}}>Edit your Ad</h1>
      
      {
          productAd && (
              <Form className='bg-white shadow-lg p-3  col-lg-10 mx-auto rounded-2 '>
     
     
              <label className="" htmlFor="selectInput">Category</label>
              
             
              <select className="form-control category" name='category'
                onChange={handleCategory}  value={category}>
                   {allCategories.map((category) => 
                   (
                     // <option value={category?._id}>{category?.caption}</option>
                     <option value={category?.caption}>{category?.caption}</option>
                                   
                     ))}
               </select>
      
              <label className="" htmlFor="selectInput">Ad Title</label>
              <Form.Control name="title"  className='title my-2 border-1 border-dark' onChange={handleChange}  value={title}  type='text'  />
              <label  htmlFor="selectInput">Description</label>
            
              <Form.Control  className="desc border-1 border-dark" name='desc' as='textarea' rows={3} onChange={handleChange}  value={desc}   ></Form.Control>
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
      <Row>
      
        {imagePreviews && imagePreviews.map((imagePrev, index) => 
        (
          <Col lg={3} md={4} xs={6} className="my-2"> 
            <Card className=' align-items-center my-auto justify-content-center' style={{width:'100px',
                         height:'100px'}}>
                  {imagePrev &&
                      (
                        <div className="position-relative">
                          <RxCross1 onClick={(e) => handleImageDelete(e,index)} className="position-absolute top-0 end-0 mt-1 me-1 z-index-1" size={20} cursor="pointer" />

                          <img
                            width="100px"
                            height="100px"
                            src={imagePrev}
                            alt="Preview"
                            style={{ objectFit: 'cover', zIndex: 0 }}
                          />
                        </div>
                         
                       ) }
         
                       
            </Card>
          </Col>  
           
       ))}
      
      </Row>

      <div className="d-flex align-items-center justify-content-center gap-2 position-relative">
                          <input type="file" className='position-absolute' style={{
                              opacity: '0',
                              cursor: 'pointer'
                          }} name="" id="" onChange={(e) => handleImageSelect(e)}/>
                           
                           <MdAddAPhoto size={55}   />
       </div> 
          <label htmlFor="">Your Ad Location</label>
          <Form.Control name="location"  onChange={handleChange}  value={location} className='loc my-2 border-dark text-capitalize' type='text' placeholder='' />

           <Row className="justify-content-center gap-1">
           <Button  onClick={handleClick}style={{backgroundColor: '#F4743B' ,color:'#BEEF62'}} className=' col-5 col-lg-3 border-0 fw-medium py-1 px-0 '>
                                                Save Changes
          </Button>

          <Button  onClick={handleCancel} style={{backgroundColor: '#F4743B' ,color:'#BEEF62'}} className='col-5 col-lg-3 border-0 fw-medium py-1 px-0'>
                                                Cancel
          </Button>

           </Row>
       
   
      
            
          
      
      </Form>
            
      )
   }

      </Container> 
     
     </div>
        
       
      
    </>
  )
}

export default EditProduct