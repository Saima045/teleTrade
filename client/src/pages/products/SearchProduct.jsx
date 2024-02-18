
import { Form } from "react-bootstrap";
import { IoSearchOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//import { getSearchProduct } from "../../../../server/controllers/productController";
import { toast } from "react-toastify";
import { getProductsSearch, resetProd } from "../../features/product/prodSlice";



const SearchProduct = () => {

  const [search, setSearch] = useState('');

  const navigate=useNavigate()
  
  const {isLoading,  isError,searchSuccess, message } = useSelector(state => state.product);
   

  const dispatch = useDispatch();

  useEffect(() => {
    //console.log('in use')
    if (isError) {
      toast.error(message)
      dispatch(resetProd())
    }
     if (searchSuccess) 
     {
       dispatch(resetProd())
       navigate('/show-search')
    }
   
  }, [ isError,searchSuccess])

    const handleChange = (e) => {
      //  console.log(e.target.value)
        setSearch( e.target.value )
    }

    const handleClick = () => {
     // setFormFields( e.target.value )

     const data = {
      searchStr:search
    }
     //console.log()



     dispatch(getProductsSearch(data))

  }
  return (
    <>
       <Form>
      <div className="search-bar w-100 d-flex gap-2 justify-content-end align-items-center border  border-0  px-1 py-2">
                          
                           <Form.Control type='search' value={search} onChange={handleChange} className=' ' placeholder='Search the Store' />
                            <span>
                                <IoSearchOutline  className="fw-bold" onClick={handleClick} size={30} cursor={'pointer'} style={{color:'#BEEF62'}}/>
                            </span>

                          
                        
        </div>
      </Form>          
    </>
  )
}

export default SearchProduct