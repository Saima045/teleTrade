
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import Home from './pages/auth/Home';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Main from './pages/home/Main';
import AddCategories from './pages/admin/AddCategories';
import DashboardAdmin from './pages/admin/DashboardAdmin';

import AddProduct from './pages/products/AddProduct';
import Register from './pages/auth/Register';
import LoginForm from './pages/auth/LoginForm';
import { useSelector } from 'react-redux';
import ShowProducts from './pages/products/ShowProducts';
import ShowSingleProduct from './pages/products/ShowSingleProduct';
import Logout from './pages/auth/Logout';
import EditProfile from './pages/auth/EditProfile';
import ManageAds from './pages/products/ManageAds';
import EditProduct from './pages/products/EditProduct';
import { ShowSearch } from './pages/products/ShowSearch';

const App = () => {
  const { user } = useSelector(state => state.auth)
  return (
    <Router>
      <ToastContainer />
    
      <Routes>
        {/* <Route path='/' element={<Home />} /> */}
        <Route path='/' element={<Main />} />
        <Route path='/addcategories' element={<AddCategories />} />
        <Route path='/admin' element={<DashboardAdmin />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/postad' element={<AddProduct />} />

        {/* <Route path='/postad' 
          {(user ?  element=<AddProduct />  :  element=<LoginForm /> )}
        /> */}
        <Route path='/register' element={<Register />} />
        {/* <Route path='/single-post/:id' element={<SinglePost />} /> */}
        <Route path='/products/:catId' element={<ShowProducts />} />
        <Route path='/single-product/:Id' element={<ShowSingleProduct />} />
        <Route path='/logout' element={<Logout/>} />
        <Route path='/edit-profile' element={<EditProfile />} />
        <Route path='/manage-ads' element={<ManageAds />} />
        <Route path='/edit-product/:Id' element={<EditProduct />} />
        <Route path='/show-search' element={<ShowSearch/>} />
      </Routes>
    </Router>
  )
}

export default App


// import React from 'react';
// import logo from './logo.svg';
// // import { Counter } from './features/counter/Counter';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <Counter />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <span>
//           <span>Learn </span>
//           <a
//             className="App-link"
//             href="https://reactjs.org/"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             React
//           </a>
//           <span>, </span>
//           <a
//             className="App-link"
//             href="https://redux.js.org/"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Redux
//           </a>
//           <span>, </span>
//           <a
//             className="App-link"
//             href="https://redux-toolkit.js.org/"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Redux Toolkit
//           </a>
//           ,<span> and </span>
//           <a
//             className="App-link"
//             href="https://react-redux.js.org/"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             React Redux
//           </a>
//         </span>
//       </header>
//     </div>
//   );
// }

// export default App;
