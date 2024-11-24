import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Login, Registration, ResetPwd,Home, Account, NotFound, Menu, Offers, Restaurants, Track} from "../pages"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />}>
          <Route path="/home/menu" element={<Menu />} />
          <Route path="/home/offers" element={<Offers />} />
          <Route path="/home/restaurants" element={<Restaurants />} />
          <Route path="/home/track" element={<Track />} />
          <Route path="/home/account" element={<Account />} />
        </Route>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/resetPassword" element={<ResetPwd />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App
