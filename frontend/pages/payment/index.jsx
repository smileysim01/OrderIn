import styles from './index.module.css';
import back from '../../src/assets/back.png';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import { useState, useEffect } from 'react';
import zeldapay from '../../src/assets/paymentImg/zeldapay.png';
import maestrokard from '../../src/assets/paymentImg/maestrokard.png';
import paypol from '../../src/assets/paymentImg/paypol.png';
import strike from '../../src/assets/paymentImg/strike.png';
import { useNavigate } from 'react-router-dom';

function Payment() {
    const navigate = useNavigate();

    // for responsiveness
    const [width, setWidth] = useState(window.innerWidth);
    // checking device size to make it responsive
    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
  return (
    <div className={styles.container}>
        <Navbar/>
        <div className={styles.left}>
            <h2 className={styles.checkoutTitle}><img src={back} alt="back" className={styles.backIcon}/>Your Order Details</h2>
            <div className={styles.zeldapay}>
                <img src={zeldapay} alt="zeldapay" className={styles.paymentImg} />
                <span>
                    <h4>ZeldaPay</h4>
                    <p>Available balance: £183.43</p>
                </span>
            </div>
            <div className={styles.otherPayments}>
                <label for="maestro" className={styles.paymentOption}>
                    <input type="radio" name="payment" id="maestro" />
                    <img src={maestrokard} alt="maestro" className={styles.paymentImg} />
                    <p>MaestroKard</p>
                </label>
                <label for="paypol" className={styles.paymentOption}>
                    <input type="radio" name="payment" id="paypol" />
                    <img src={paypol} alt="paypol" className={styles.paymentImg} />
                    <p>Paypol</p>
                </label>
                <label for="strike" className={styles.paymentOption}>
                    <input type="radio" name="payment" id="strike" />
                    <img src={strike} alt="strike" className={styles.paymentImg} />
                    <p>Strike</p>
                </label>
                <label for="debit" className={styles.paymentOption}>
                    <h4>+</h4>
                    <p>Add Debit Card</p>
                </label>
            </div>
        </div>
        <div className={styles.right}>
            <span className={styles.total}>
                <p>Amount to be paid</p>
                <p>₹240</p>
            </span>
            <button className={styles.paymentBtn} onClick={()=>navigate("/payment/success")}>Proceed Payment</button>
        </div>
        <Footer width={width} />
    </div>
  )
}

export default Payment
