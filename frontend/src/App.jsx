import {BrowserRouter, Routes, Route, Outlet} from 'react-router-dom'
import { useState, useEffect } from 'react';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Login, Registration, ResetPwd,Home, Settings, NotFound, Menu, Offers, Restaurants, Track, RestaurantDetail, Cart, Checkout, Payment, Success} from "../pages"
import Navbar from '../components/navbar/Navbar';
import Promo from '../components/promo/Promo';
import Footer from '../components/footer/Footer';

function HomeLayout(){
  // for responsiveness
  const [width, setWidth] = useState(window.innerWidth);
  // checking device size to make it responsive
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div>
      <Promo/>
      <Navbar/>
      <Outlet/>
      <Footer width={width} />
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
          <Route path="track" element={<Track />} />
          <Route path="settings" element={<Settings />} />
          <Route path="restaurants/:id" element={<RestaurantDetail />} />
        </Route>
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/payment/success" element={<Success/>}/>
        <Route path="*" element={<NotFound />} />
        
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App
