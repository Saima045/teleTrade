import React, { useEffect } from 'react'
import { getCategories, resetCatg } from '../../features/category/catSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CategoriesShow = () => {
  const dispatch = useDispatch();
  const { isLoading, isError,message,allCategories } = useSelector(state => state.category);

  useEffect(() => {
   // alert('intial')
  //  console.log('use effect in')
    dispatch(getCategories())
    dispatch(resetCatg())
   
}, [])

// useEffect(() => {
//   // alert('intial')
//  //  console.log('use effect in')
//  if(!isLoading)
//    dispatch(getCategories())
//   // dispatch(resetCatg)
  
// }, [isLoading])

  return (
    <>
    {
      (allCategories.length>0) && (

        <Container className='mt-2'>
              <h2>All Categories</h2>
              <Row>
                {allCategories.map((category) => (
                  // <Col key={category._id} lg={2} md={3}  sm={6} className='text-center text-capitalize '>
                  <Col key={category._id} xs={6}  sm={4} md={4} lg={3} className='text-center text-capitalize '>
                    <Link to={`/products/${category?.caption}`}  className="text-decoration-none">
                        <div className='imgCat rounded-circle'>
                            <img style={{ width: '90px', height: '90px' , borderRadius: '50%'  }}  src={category?.image ? category?.image : 'https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg'}  alt="" />
                          </div> 
                          <h5 className='text-black m-2'>{category?.caption}</h5>
                                            
                      </Link>
                    
                  </Col>
                ))}
              </Row>

              </Container>

     )
    }
    
   
  </>
  )
  }

export default CategoriesShow