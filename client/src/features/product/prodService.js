import axios from 'axios';
// base url
//const base_url = 'http://localhost:5174/api/product';
const base_url = 'https://teletradeapi.vercel.app/api/product';

// request to the server for registration

const addProdService = async (prodData) => {
  // request the server
  const response = await axios.post(`${base_url}/add-product`, prodData);
  return response.data;
}

const editProduct = async (prodData) => {
  // request the server
  const response = await axios.post(`${base_url}/update-product`, prodData);
 // console.log('response')
  return response.data;
}

const deleteProductServ = async (prodData) => {
  // request the server
  const response = await axios.post(`${base_url}/delete-product`, prodData);
 // console.log('response')
  return response.data;
}



const getProductsService = async (data) => {
  //console.log(data)
  const response = await axios.get(`${base_url}/get-productscat`, {
    params: data // Assuming `data` is an object containing your query parameters
  });
  //console.log(response.data)
  return response.data
}

const getProductService = async (data) => {
 // console.log(data)
  const response = await axios.get(`${base_url}/get-product`, {
    params: data // Assuming `data` is an object containing your query parameters
  });
  //console.log(response.data)
  return response.data
}

const getProdsUserSerc = async (data) => {
  
//  console.log(data)
  const response = await axios.get(`${base_url}/get-user-products`, {
    params: data // Assuming `data` is an object containing your query parameters
  });
 // console.log(response.data)
  return response.data
}

const listProductsSearch = async (data) => {
  
  //  console.log(data)
     const response = await axios.get(`${base_url}/get-search-products`, {
      params: data // Assuming `data` is an object containing your query parameters
    });
   // console.log(response.data)
    return response.data
  }
export const prodService = {
  addProdService,
  getProductsService,
  getProductService,
  getProdsUserSerc,
  editProduct,
  deleteProductServ,
  listProductsSearch
  
}
