import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom"
import { getProductsInCat, resetProd } from "../../features/product/prodSlice";
import { useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import Header from '../../components/header/Header'
import { LuPhoneCall } from "react-icons/lu";
import { IoMdText } from "react-icons/io";
import { TbBrandWhatsapp } from "react-icons/tb";
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { MdOutlineMail } from "react-icons/md";
import { ClockLoader } from 'react-spinners';
import ReactTooltip from 'react-tooltip';
import { getCategory, resetCatg } from "../../features/category/catSlice";

const ShowProducts = () => {

    const dispatch = useDispatch();
    const {catId } = useParams()
    const navigate=useNavigate()
    const { isLoading, isError,isSuccess,products } = useSelector(state => state.product);

    const { category } = useSelector(state => state.category);


    // select specific state from the initial state
   const { user } = useSelector(state => state.auth)
  
    useEffect(() => {
      
     const data = {
        category:catId
      }
      dispatch(getProductsInCat(data))
      dispatch(resetProd())
      // dispatch(getCategory(data))
      // dispatch(resetCatg())
 
    }, [])

    useEffect(() => {
      
      
        dispatch(resetProd())
       // dispatch(resetCatg())

     

        
     
    }, [isSuccess])

    if ( isLoading) {
      return <div style={{ height: '100vh', width: '100vw' }} className='d-flex justify-content-center align-items-center'>
          <ClockLoader color="#0D6EFD" />
      </div> 
    }
   
return (
    <>
    <div style={{overflowX: 'hidden', height:'100vh' ,backgroundColor: 'rgba(60, 109, 113, 0.2)' ,color:'#BEEF62'}}>
     <Header/>

      <Container className='mt-2'>
                  {/* <h2>All Categories &gt;&gt;</h2>  */}
                  {/* {category ? ( */}
                  <h2 className='text-left'  style={{ color: '#F4743B' }} >
                   <Link to='/' className="text-decoration-none" style={{ color: '#F4743B' }}>All Categories</Link>  &gt;&gt;
                    {/* <span className="text-black">{category ? category.caption : 'Products'}</span> */}
                    <span className="text-black">{catId ? catId : 'Products'}</span>
                  </h2>
                  {/* // ) : (
                  //   <h2 className='text-left' style={{ color: '#F4743B' }}>
                  //     Products
                  //   </h2>
                  // )} */}
                            
                <Row>
                {products.map((product) => (
                  
                   <Col lg={5} md={6} xs={10} className="bg-white py-2  shadow-lg border-1 rounded-2 mx-auto my-2">
                        <div className="d-flex gap-3 text-black">
                           <div className="col-5" >
                           <img
                                src={product?.image[0] ? product?.image[0] : 'https://www.incathlab.com/images/products/default_product.png' }                                alt=""
                                style={{ width: '100%', height: '200px' }}
                                />

                           </div>
                           
                           
                           <div className="col-5"> 
                            <h3 className="text-capitalize">{product?.title}</h3>
                            <h3 className="">{product?.price}</h3>
                            <h3 className="text-capitalize">{product?.location}</h3>
                            <Link to={`/single-product/${product?._id}`} className="text-decoration-none text-black">
                    
                            <h6 className="text-end" style={{color:'#F4743B'}}>...View Detail</h6>

                            </Link>

                            <Row>
                              <Col md={4}>
                               
                                {/* <OverlayTrigger
                                      placement="bottom"
                                      overlay={<Tooltip >Call</Tooltip>}> */}
                                      <Link  to={`tel:${product?.user?.phone}`}  className="text-decoration-none btn   p-1" style={{backgroundColor: '#F4743B' ,color:'#BEEF62'}} >
                                        <LuPhoneCall className="" size={26}/>  
                                       </Link>
                                {/* </OverlayTrigger> */}
                              

                                
                                 
                              </Col>
                              <Col md={4}>
                              {/* <OverlayTrigger
                                      placement="bottom"
                                      overlay={<Tooltip >Email</Tooltip>}> */}
                                    <Link to={`mailto:${product?.user?.email}`} className="text-decoration-none btn   p-1" style={{backgroundColor: '#F4743B' ,color:'#BEEF62'}}>
                                      <MdOutlineMail size={26} />
                                    </Link>
                                {/* </OverlayTrigger> */}
                                  
                              </Col>  
                              <Col md={4}>
                              {/* <OverlayTrigger
                                      placement="bottom"
                                      overlay={<Tooltip >Whatsapp</Tooltip>}> */}
                                  <Link    to={`https://wa.me/${product?.user?.phone}`} className="text-decoration-none btn   p-1" style={{backgroundColor: '#F4743B' ,color:'#BEEF62'}}  >
                                    <TbBrandWhatsapp  size={26} />
                                  </Link>
                              {/* </OverlayTrigger> */}
                              </Col>
                            
                            </Row>
             
                           
                           

                          </div>
                          

                        </div>
                    
                  
                    </Col>
                  
                   
                 

                    // <Col key={product?._id} lg={2} className='text-center text-capitalize '>
                    
                    // <Link to={`/products/${category?._id}`}  className="text-decoration-none">
                    //     <div className='imgCat rounded-circle'>
                    //         <img style={{ width: '90px', height: '90px' , borderRadius: '50%'  }}  src={category?.image ? category?.image : 'https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg'}  alt="" />
                    //         </div> 
                    //         <h5 className='text-black m-2'>{category?.caption}</h5>
                                            
                    //     </Link>
                    
                    // </Col>
                ))}
                </Row>

    </Container>
    </div>
    </>
  )
}

export default ShowProducts