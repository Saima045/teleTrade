import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { logout, reset } from "../../features/auth/authSlice"
import { useEffect } from "react"


const Logout = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    // select specific state from the initial state
   const { user } = useSelector(state => state.auth)

    useEffect(() => {

        if (user)
        {
            dispatch(logout())
            dispatch(reset())
            navigate('/')
        }
        
        
  
        
  
    
        
           }, []) 

  return (
    <>Logout</>
  )
}

export default Logout