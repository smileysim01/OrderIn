import styles from './navbar.module.css';
import logo from '../../src/assets/logo.png';
import { Link } from 'react-router-dom';
import account from '../../src/assets/account.png'

function Navbar() {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src={logo} alt="logo"/>
      </div>
      <div className={styles.nav}>
        <ul>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/home/menu">Browse Menu</Link></li>
          <li><Link to="/home/offers">Special Offers</Link></li>
          <li><Link to="/home/restaurants">Restaurants</Link></li>
          <li><Link to="/home/track">Track Order</Link></li>
        {
            localStorage.getItem("token") ?
                <li><Link to="/settings"><img src={account} alt='account'/>Hey {localStorage.getItem("name")}</Link></li>
                :
                <li><Link to="/"><img src={account} alt='account'/>Login/Signup</Link></li>
        }
        </ul>
      </div>
      
    </div>
  )
}

export default Navbar
