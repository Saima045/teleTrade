import { Col, Container, Row } from "react-bootstrap";
import Header from "../../components/header/Header"
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { LuPhoneCall } from "react-icons/lu";
import { TbBrandWhatsapp } from "react-icons/tb";
import { MdOutlineMail } from "react-icons/md";


export const ShowSearch = () => {
    const {products } = useSelector(state => state.product);
    const { user } = useSelector(state => state.auth)
  
  return (
    <>
      <div style={{overflowX: 'hidden', height:'100vh' ,backgroundColor: 'rgba(60, 109, 113, 0.2)' ,color:'#BEEF62'}}>
       <Header/>
       <Container className='mt-2'>
        {
            products.length==0 && (
                <h2 className="text-black">No Product Found</h2>
            )
        }
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
                            <h3 className="text-capitalize">{product?.category}</h3>
                            <h3 className="">{product?.price}</h3>
                            <h3 className="text-capitalize">{product?.location}</h3>
                            <Link to={`/single-product/${product?._id}`} className="text-decoration-none text-black">
                    
                            <h6 className="text-end" style={{color:'#F4743B'}}>...View Detail</h6>

                            </Link>

                            <Row>
                              <Col md={4}>
                                      <Link to={`tel:${user?.phone}`}  className="text-decoration-none btn   p-1" style={{backgroundColor: '#F4743B' ,color:'#BEEF62'}} >
                                        <LuPhoneCall className="" size={26}/>  
                                       </Link>
                                
                                 
                              </Col>
                              <Col md={4}>
                             
                                    <Link to={`mailto:${user?.email}`} className="text-decoration-none btn   p-1" style={{backgroundColor: '#F4743B' ,color:'#BEEF62'}}>
                                      <MdOutlineMail size={26} />
                                    </Link>
                               
                                  
                              </Col>  
                              <Col md={4}>
                             
                                  <Link    to={`https://wa.me/${user?.phone}`} className="text-decoration-none btn   p-1" style={{backgroundColor: '#F4743B' ,color:'#BEEF62'}}  >
                                    <TbBrandWhatsapp  size={26} />
                                  </Link>
                            
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
