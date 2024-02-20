import axios from 'axios';
// base url
const base_url = 'https://teletradeapi.vercel.app/api/data';

// request to the server for registration

const registerUser = async (userData) => {

  
  console.log(userData)


  
  // request the server
  const response = await axios.post(`${base_url}/register-user`, userData);
 
  if (response.data) {
      console.log('no error')
      localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
}

// logout the user

const signOUT = () => {

    localStorage.removeItem('user')
    console.log('in signout')
}

// login the user
const signIn = async (userData) => {
  const response = await axios.post(`${base_url}/login-user`, userData);
  if (response.data) {
       
      localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}

const updateUserService = async (userData) => {
  const response = await axios.post(`${base_url}/update-user`, userData);
  if (response.data) {
      localStorage.removeItem('user')
      localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}

const getUserService = async (userData) => {
  const response = await axios.get(`${base_url}/get-user`,  {
    params: userData}) // Assuming `data` is an object containing your query parameter);
 
  return response.data
}






export const authService = {
    registerUser,
    signOUT,
    signIn,
    updateUserService,
    getUserService
}