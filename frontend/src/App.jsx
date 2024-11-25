import {BrowserRouter, Routes, Route, Outlet} from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Login, Registration, ResetPwd,Home, Account, NotFound, Menu, Offers, Restaurants, Track} from "../pages"
import Navbar from '../components/navbar/Navbar';
import Promo from '../components/promo/Promo';

function HomeLayout(){
  return (
    <div>
      <Promo/>
      <Navbar/>
      <Outlet/>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Registration />} />
      <Route path="/resetPassword" element={<ResetPwd />} />
        <Route path="/home" element={<HomeLayout />}>
          <Route index element={<Home />} />
          <Route path="menu" element={<Menu />} />
          <Route path="offers" element={<Offers />} />
          <Route path="restaurants" element={<Restaurants />} />
          <Route path="track" element={<Track />} />
          <Route path="account" element={<Account />} />
        </Route>
        <Route path="*" element={<NotFound />} />
        
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App
