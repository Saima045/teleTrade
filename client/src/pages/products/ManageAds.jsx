import { useEffect } from "react"
import Header from "../../components/header/Header"
import { deleteProduct, getProductsUser, resetProd } from "../../features/product/prodSlice"
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { MdBrowserUpdated } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { ClockLoader } from 'react-spinners';


const ManageAds = () => {

    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth)

    const { isLoading, isError,isSuccess,message,products,productAd } = useSelector(state => state.product);




    const handleDelete = (product_id) => {
      console.log(product_id)
      dispatch(deleteProduct({prod_id:product_id,user_id:user?._id}))
      //dispatch(rese)
      


    }

    useEffect(() => {
    
      if (isError) {
        toast.error(message);
        dispatch(resetProd());
      }
    
      // if (productAd === null && isSuccess && products === null) {
      //   console.log('delete success');
      //   toast.error(message);
      // }
    
      if (isSuccess) {
        console.log(products);
        toast.success('Add deleted successfully ')
        dispatch(resetProd());
      }
    }, [ isError, message, isSuccess, resetProd]);
    useEffect(() => {
      const fetchData = async () => {
        if (user?._id) {
          const data = {
            user: user?._id
          };
        //  console.log('in first use');
    
          try {
            const result = await dispatch(getProductsUser(data));
            // Handle the result if needed
            if (result)
            {
             
               dispatch(resetProd())
            }
          // console.log(res);
          } catch (error) {
            // Handle errors if necessary
            console.error(error);
          }
        }
      };
    
      fetchData();
    }, [user?._id, dispatch]);
    



   // First useEffect
// useEffect(() => {
//   if (user?._id) {
//     const data = {
//       user: user?._id
//     };
//     console.log('in first use')
//     dispatch(getProductsUser(data));

//     // Handle the result if needed
//    // console.log(res);
//   }
// }, [[user?._id, dispatch]]);

// // Second useEffect
// useEffect(() => {
//    console.log('in use ')
//   if (isError) {
//     toast.error(message);
//     dispatch(resetProd());
//   }
//   if (productAd==null && isSuccess) {
//     console.log('delete success');
  
//     toast.error(message);
//     dispatch(resetProd());
//     // navigate('/')
//   }
//   // if (products.length>0) {
//   //   console.log(products)
//   //   //console.log('in successs');
//   //   dispatch(resetProd());
//   //   // navigate('/')
//   // }
  

//  // console.log(isSuccess);
// }, [isError, message, dispatch,resetProd]);

// useEffect(() => {
//   if (user?._id) {
//     const data = {
//       user: user?._id
//     };
    
//     dispatch(getProductsUser(data));
//   }
 
// }, [products]);

// if (isLoading) {
//   return <div style={{ height: '100vh', width: '100vw' }} className='d-flex justify-content-center align-items-center'>
//       <ClockLoader color="#0D6EFD" />
//   </div> 
// }

if ( isLoading) {
  return <div style={{ height: '100vh', width: '100vw' }} className='d-flex justify-content-center align-items-center'>
      <ClockLoader color="#0D6EFD" />
  </div> 
}

  return (
    <div style={{overflowX: 'hidden', height:'100vh' ,backgroundColor: 'rgba(60, 109, 113, 0.2)' ,color:'#BEEF62'}}>
    <Header />



    <div className='mt-0' style={{   }}>

    <Container>
    <h2 style={{color:'#F4743B'}}>My Ads</h2>
    <Row className="justify-content-center gap-0">

    {products &&  products.map((product) => (
      <Col xl={3} md={4} xs={6} className="shadow-lg p-2 bg-white rounded-2 border border-1">
          <div    className='my-3 p-0 text-decoration-none text-black text-capitalize '>

            
           <div className=" text-center">
              <div className="p-2 fs-4 fw-medium text-capitalize">{product?.title}</div>
              <div className="">
                                <img
                                    src={product?.image[0] ? product?.image[0] : 'https://www.incathlab.com/images/products/default_product.png' }                                alt=""
                                    style={{ width: '80%', height: '200px' }}
                                    />
                </div> 
            </div>     

          </div>
          <div className="d-flex gap-3 justify-content-center fs-5">
        
         <Link  to={`/edit-product/${product?._id}`} className="fs-6 px-2 btn border border-2 border-dark text-decoration-none text-black rounded-pill">
         <span className="d-none d-lg-inline">Update</span> <MdBrowserUpdated size={25} />  
          </Link>

             
          <Link
              to="#"  // You can set the 'to' prop to "#" or any valid path based on your application structure
              className="btn border border-2 px-2 border-dark text-decoration-none text-black rounded-pill"
              onClick={() => handleDelete(product?._id)}
            >
              <span className="d-none d-lg-inline">Delete</span> {/* Display only on large screens */}
               <RiDeleteBin5Line size={25} />
         </Link>
              
             
             
          </div>
       </Col>
      
    ))}
    </Row>



    </Container>
    

</div>



   </div>
  )
}

export default ManageAds