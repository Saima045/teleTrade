import React, { useEffect } from 'react'
import { Adminsidebar } from '../../components/adminsidebar/Adminsidebar'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';

import { resetCatg } from '../../features/category/catSlice';

const DashboardAdmin = () => {

  const dispatch = useDispatch()

  const { isSuccess} = useSelector(state => state.category);

  useEffect(() => 
  {
    if (isSuccess) 
    {
      setTimeout(() => {
        // Code to be executed after 2 seconds
        console.log("Delayed code after 2 seconds");
        dispatch(resetCatg())
        // Continue with any other code you want to run after the delay
      }, 2000);
    }}, [isSuccess,dispatch,resetCatg])


  return (
    <>
     {/* <div>immm</div> */}

     
     <Container  fluid className='mt-3 px-0 ' style={{
                                                      padding:0,
                                                      width:''

                                                    }}>
         
                                                       
            <Row>
                <Col className='ps-3' xs={3}>
                    <Adminsidebar/>
                   
                </Col>
                <Col className='mt-1' xs={9}>
                    <h1>Welcome to the Admin Dashboard</h1>
                    {isSuccess && <div className='text-success fs-2'>Category added successfully</div>
             }
                </Col>
            </Row>

     </Container>

     
      </>
  )
}

export default DashboardAdmin