import styles from './promo.module.css'
import pin from '../../src/assets/pin.png';
import cart from '../../src/assets/cart.png';
import arrow from '../../src/assets/arrow.png';
import { useState, useEffect } from 'react';

function Promo() {
    const [width, setWidth] = useState(window.innerWidth);
    // checking device size to make it responsive
    useEffect(() => {
      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  return (
    width < 720 ? null : (
    <div className={styles.container}>
        <p>
            <span className={styles.offer}>🌟 Get 5% Off your first order, <u>Promo: ORDER5</u></span>
            <span className={styles.address}><img src={pin} alt="pin"/>
                {localStorage.getItem("address") ? localStorage.getItem("address") : "Regent Street, A4, A4201, London"} 
                <span className={styles.changeLocation}> <u>Change Location</u></span>
            </span>
            <span className={styles.cart}>
                <span className={styles.myCart}>
                    <img src={cart} alt="cart"/> My Cart 
                </span>
                <span className={styles.cartValue}>GBP 79.89</span>
                <img src={arrow} alt="arrow" className={styles.arrow}/>
            </span>             
        </p>
    </div>
    )
  )
}

export default Promo