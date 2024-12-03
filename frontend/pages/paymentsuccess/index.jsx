import styles from './index.module.css'
import success from '../../src/assets/success.png';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCart } from '../../services/cart';

function Success() {
    const [cartData, setCartData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        const syncCart = async () => {
          try{
            if (!localStorage.getItem("token")) {
              toast.error("Please login to checkout.");
              setIsLoading(false);
            }
            const response = await getCart();
            setCartData(response.data);
            setIsLoading(false);
          } catch(error) {
            toast.error(error?.message || "An unexpected error occurred. Please try again.");
            setIsLoading(false);
          }
        }
        syncCart();
      }, [])

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
        <Navbar/>
        {isLoading ? (
          <p>Loading...</p>
        ) : cartData && cartData.foodList && cartData.foodList.length > 0 ? (
            <div className={styles.container}>
            <img src={success} alt="success" className={styles.success}/>
            <h1>Order Placed Successfully</h1>
            <p>Your order is confirmed and on its way. Get set to savor your chosen delights!</p>
            <div className={styles.details}>
                {cartData.foodList.map((item) => (
                <div key={item._id} className={styles.foodItem}>
                    {item.item.name}
                </div>
                ))}
                <button className={styles.checkoutButton} onClick={()=>navigate("/home")}>Back to Home</button>
            </div>
            </div>
        ):null}
        
      <Footer width={width}/>
    </div>
  )
}

export default Success
