import styles from './navbar.module.css';
import logo from '../../src/assets/logo.png';
import { Link, useLocation } from 'react-router-dom';
import account from '../../src/assets/account.png'
import { useState } from 'react';

function Navbar() {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen)
    }
  return (
    <div className={styles.container}>
      <img src={logo} alt="logo"/>
      <button className={styles.hamburger} onClick={toggleMenu}>☰</button>
      <div className={styles.nav} id={isMenuOpen ? styles.show : ''}>
        <ul>
          <li><Link to="/home" className={isActive('/home') ? styles.active : null} onClick={toggleMenu}>Home</Link></li>
          <li><Link to="/home/menu" className={isActive('/home/menu') ? styles.active : null} onClick={toggleMenu}>Browse Menu</Link></li>
          <li><Link to="/home/offers" className={isActive('/home/offers') ? styles.active : null} onClick={toggleMenu}>Special Offers</Link></li>
          <li><Link to="/home/restaurants" className={isActive('/home/restaurants') ? styles.active : null} onClick={toggleMenu}>Restaurants</Link></li>
          <li><Link to="/home/track" className={isActive('/home/track') ? styles.active : null} onClick={toggleMenu}>Track Order</Link></li>
        {
            localStorage.getItem("token") ?
                <li><Link to="/home/settings"><img src={account} alt='account'/>Hey {localStorage.getItem("name")}</Link></li>
                :
                <li><Link to="/"><img src={account} alt='account'/>Login/Signup</Link></li>
        }
        </ul>
      </div>
    </div>
  )
}

export default Navbar
