import axios from 'axios';
// base url
const base_url = 'http://localhost:5174/api/category';

// request to the server for registration

const addCategoryService = async (catData) => {
  // request the server
  const response = await axios.post(`${base_url}/create-Category`, catData);
//   if (response.data) {
//       localStorage.setItem('user', JSON.stringify(response.data));
//   }
  return response.data;
}

const getCategoryService = async () => {
  const response = await axios.get(`${base_url}/get-Category`)
  return response.data
}
const getCategoryDataService = async (data) => {
  const response = await axios.get(`${base_url}/get-Categorydata`, {
    params: data // Assuming `data` is an object containing your query parameters
  });
  
  return response.data
}




export const catService = {
    addCategoryService,
    getCategoryService,
    getCategoryDataService
}