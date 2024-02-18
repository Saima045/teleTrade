import { useCallback, useEffect, useState } from "react"
import { TbH2 } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import ImageSlider from "../../components/ImageSlider";
import Header from '../../components/header/Header'
import { Col, Container, Row } from "react-bootstrap";
import { LuPhoneCall } from "react-icons/lu";
import { TbBrandWhatsapp } from "react-icons/tb";
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { MdOutlineMail } from "react-icons/md";
import { getCategory, resetCatg } from "../../features/category/catSlice";
import { getProduct, resetProd } from "../../features/product/prodSlice";
import { toast } from "react-toastify";
import { ClockLoader } from 'react-spinners';


const ShowSingleProduct = () => {
   const dispatch = useDispatch();

   const {Id } = useParams()
   
   const { isLoading, isError,isSuccess,productGetSuccess,message,productAd,products } = useSelector(state => state.product);
   const { category } = useSelector(state => state.category);

   const [foundProduct,setfoundProduct]=useState('')

   const { user } = useSelector(state => state.auth)
 //  const [price, setPrice] = useState('');
useEffect(() => {

    //console.log('in first use')
      
        const data = {
           _id:Id
         }

       
         dispatch(getProduct(data))
        //  console.log(products)
        //  const prod = products.find(product=>(product._id==Id));
        //  console.log(prod?.title)
         // console.log(prod.image[0])
         

     
    
       }, [])


     

       useEffect(() => {
        //console.log('in use')
        if (isError) {
          toast.error(message)
        }
         if (productGetSuccess) 
         {
          // console.log(productAd)
           setfoundProduct(productAd)
        }
        dispatch(resetProd())
      }, [ isError,productGetSuccess])
  

      //  useEffect(() => {

      //   // console.log(foundProduct?.category)
        
      //     const data = {
      //       category:foundProduct?.category
      //     }
      //  //  dispatch(getCategory(data))
       
      //  // dispatch(resetCatg())
 
      //  }, [foundProduct])

      //  useEffect(() => {
      // //  console.log(category)
      // //  if (category)
      // //  {
      // //    console.log(category)
      // //  }
      
      // // dispatch(resetCatg())

      // }, [category])
  
   
      if ( isLoading) {
        return <div style={{ height: '100vh', width: '100vw' }} className='d-flex justify-content-center align-items-center'>
            <ClockLoader color="#0D6EFD" />
        </div> 
      }

  return (
    <>
     <div style={{overflowX: 'hidden', height:'100vh' ,backgroundColor: 'rgba(60, 109, 113, 0.2)' ,color:'#BEEF62'}}>
   
     <Header/>
     
     {foundProduct && (
       <Container>
        <h1 className='text-left text-capitalize'style={{color:'#F4743B'}}>
           <Link to={`/`} className="text-decoration-none" style={{ color: '#F4743B' }}>
              All Categories
            </Link>
            &gt;&gt;
           <Link to={`/products/${foundProduct?.category}`} className="text-decoration-none" style={{ color: '#F4743B' }}>{foundProduct?.category}</Link>
            &gt;&gt;
            <span className="text-black">{foundProduct.title}</span> 
         
         </h1>
        <div className="  text-black rounded-2 shadow-lg p-2 py-3">
       
            
            <div className="mx-auto text-center">
              <ImageSlider images={foundProduct?.image} style={{background:'red'}}/>
            </div>
            <div className="px-5 py-3">
              <h2>Price:{foundProduct.price}</h2>
              <h4><b>Condition:</b>{foundProduct.condition}</h4>
              <div className="fs-6 border border-1 ">
                <h4><b>Decscription:</b></h4><p className="bg-white" >{foundProduct.desc}</p>
              </div>
              <div className="d-flex align-items-end">
                 <h4 className="text-capitalize"><b>Location:</b></h4>
                 <h4 className="fs-6">{foundProduct.location}</h4>
            

              </div>
                 <Row  className="gap-0 justify-content-center mt-3">
                              <Col md={4} lg={3} xs={4} >
                               
                              
                                      <Link style={{backgroundColor: '#F4743B' ,color:'#BEEF62'}}  to={`tel:${foundProduct?.user?.phone}`}  className="d-flex align-items-center justify-content-center gap-1 w-50 text-decoration-none btn  fs-6 p-1 px-2">
                                        <span className="d-none d-md-inline">Call</span> <LuPhoneCall size={24}/>  
                                       </Link>
                               
                              

                                
                                 
                              </Col>
                              <Col md={4} lg={3} xs={4}>
                            
                                    <Link style={{backgroundColor: '#F4743B' ,color:'#BEEF62'}} to={`mailto:${foundProduct?.user?.email}`} className="d-flex align-items-center justify-content-center gap-1 w-50 text-decoration-none btn fs-6 p-1">
                                    <span className="d-none d-md-inline">Email</span> <MdOutlineMail size={26} />
                                    </Link>
                               
                                  
                              </Col>  
                              <Col md={4} lg={3} xs={4}>
                           
                                  <Link style={{backgroundColor: '#F4743B' ,color:'#BEEF62'}}   to={`https://wa.me/${foundProduct?.user?.phone}`} className="d-flex align-items-center justify-content-center gap-1 w-50 text-decoration-none btn  fs-6 p-1">
                                  <span className="d-none d-md-inline">Whatsapp </span><TbBrandWhatsapp  size={26} />
                                  </Link>
                             
                              </Col>
                            
               </Row>
            </div>
       
      </div>
     
             

      </Container>

      
      )
      }
    
       
      
    
       
         {/* {
          foundProduct?.image && foundProduct?.image.map((productimg) => (
            <img
              src={productimg ? productimg : 'https://www.incathlab.com/images/products/default_product.png'}
              alt=""
              style={{ width: '50%', height: '200px' }}
            />
          ))
        }
         */}
    
     </div>
    </>
  )
}

export default ShowSingleProduct