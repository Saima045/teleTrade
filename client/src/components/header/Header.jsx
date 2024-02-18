import React, { useState } from 'react'
import { Button, Col, Form, NavDropdown, Row } from 'react-bootstrap'

import './header.css'
// import RegForm from '../../pages/auth/RegForm';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SearchProduct from '../../pages/products/SearchProduct';
// import LogForm from '../../pages/auth/LogForm';
//import RegForm from '../auth/RegForm';
const Header = () => {

     // select specific state from the initial state
     const { user } = useSelector(state => state.auth)


    const navigate=useNavigate()

    const showReg =()=>{


        navigate('/register')
       

    }

    const showLogin =()=>{
        //alert('uuuu')
        navigate('/login')
        
    }

    const handleSell = () => {

        if (user)
        {
            navigate('/postad')
        }
        else
        {
            showLogin()
        }
          


       
    }
    
    return (
        <>
        
         <Row className='w-100 border border-0 p-0 m-0   align-items-center' style={{width:'100%',height:'', backgroundColor: '#3C6D71'}}>
       
         <Col className='logo text-center' xl={3} lg={3} md={4} sm={4} xs={4}>
         <Link to='/'>
          <img style={{ width: '90%', height: '100px', maxWidth: '200px' }}  src={process.env.PUBLIC_URL + '/teletrade-high-resolution-logo.png'} alt="" />
        </Link>
                       
                
                  

            </Col>
            <Col className='mb-1'  xl={5} lg={9} md={8} sm={8} xs={8}>
                    {/* <div className="search-bar d-flex gap-2 justify-content-end align-items-center border  border-0  px-1 py-2">
                           <Form>
                           <Form.Control type='search' value={search} onChange={handleChange} className=' ' placeholder='Search the Store' />
                            <span>
                                <IoSearchOutline onClick={handleClick} size={30} style={{color:'#BEEF62'}}/>
                            </span>

                           </Form>
                        
                     </div> */}
                     <SearchProduct/>
            </Col>
            <Col className='mb-2' xl={4} lg={12} md={12} sm={12} xs={12}>
            <div className='d-flex gap-2 justify-content-center'>
                <Button onClick={handleSell} className='fs-5   btn    rounded-pill border border-0 py-1 px-4' style={{backgroundColor: '#F4743B' ,color:'#BEEF62'}}>
                     Sell +
                </Button>
                
                {user === null && (
                        <>
                        <Button onClick={showReg} className='fs-5   btn    rounded-pill border border-0 py-1 px-3' style={{backgroundColor: '#F4743B' ,color:'#BEEF62'}}>
                            Signup
                        </Button>
                        <Button onClick={showLogin} className='fs-5   btn    rounded-pill border border-0 py-1 px-3' style={{backgroundColor: '#F4743B' ,color:'#BEEF62'}}>
                            Login
                        </Button>
                        </>
                 )}
                {user !== null && (
                      <NavDropdown className='ms-3' title={
                             <img
                                src={user?.image || "https://cdn-icons-png.freepik.com/512/186/186313.png"}
                                style={{ width: '50px', height: '50px' }}
                                alt=""
                                className='rounded-circle'
                            />
                            }
                       >
                        
                       <NavDropdown.Item ><p className='text-capitalize cursor-default mb-1'><b>Welcome {user?.name}</b></p> 
                        <Link to='/edit-profile' className='text-decoration-none text-dark mt-0 '>
                             Edit your Profile
                        </Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/manage-ads">
                            My Ads
                        </NavDropdown.Item>


                         <NavDropdown.Item as={Link} to="/logout">
                                    Logout
                         </NavDropdown.Item>
                      
                    </NavDropdown>
               
            
                )}
              </div>
            </Col>
            


         </Row>

        
          
        </>
    )

}
export default Header