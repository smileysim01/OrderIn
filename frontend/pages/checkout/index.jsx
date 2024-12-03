import styles from './index.module.css'
import { getCart } from '../../services/cart'
import Promo from '../../components/promo/Promo';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import pin from '../../src/assets/MapPin.png';
import { useNavigate } from 'react-router-dom';
import back from '../../src/assets/back.png';
import PopularRestaurants from '../../components/popularRestaurants/PopularRestaurants';

function Checkout() {
  const [cartData, setCartData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const syncCart = async () => {
      try {
        if (!localStorage.getItem("token")) {
          toast.error("Please login to checkout.");
          setIsLoading(false);
        }
        const response = await getCart();
        setCartData(response.data);
        setIsLoading(false);
      } catch (error) {
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
    <div className={styles.container}>
      <Promo />
      <Navbar />
      <h2 className={styles.checkoutTitle}><img src={back} alt="back" className={styles.backIcon} onClick={()=>navigate(-1)}/>Your Order Details</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : cartData && cartData.foodList && cartData.foodList.length > 0 ? (
        <div className={styles.checkout}>
          <div className={styles.checkoutCart}>
            {cartData.foodList.map((item) => (
              <div key={item._id} className={styles.foodItem}>
                <img src={item.item.image} alt={item.item.name} className={styles.foodImage} />
                <div className={styles.foodDetails}>
                  <span className={styles.name}>{item.item.name}</span>
                  <span className={styles.quantity}>{item.quantity}x item</span>
                </div>
                <span className={styles.price}>₹{item.item.price}</span>
              </div>
            ))}
            <div className={styles.notes}>
              <p>Notes</p>
              <input type="text" placeholder="Add order notes" />
            </div>
          </div>
          <div className={styles.right}>
            <span className={styles.deliveryTitle}>
              <img src={pin} alt="pin" className={styles.pinIcon} />
              <span className={styles.deliveryAddress}>
                <h5>Delivery Address</h5>
                <p>Kawungcarang road no.28..</p>
              </span>
              <h4>&gt;</h4>
            </span>
            <div className={styles.calculate}>
              <span className={styles.items}>
                <p>Items</p>
                <p>₹{cartData.totalAmount}</p>
              </span>
              <span className={styles.tax}>
                <p>Sales Tax</p>
                <p>₹10</p>
              </span>
            </div>
            <div className={styles.subtotal}>
              <span className={styles.subtotalTitle}>
                <p>Subtotal(3 items)</p>
                <p className={styles.subtotalPrice}>₹{cartData.totalAmount + 10}</p>
              </span>
            </div>
            <button className={styles.checkoutButton} onClick={() => navigate("/payment")}>Choose Payment Method</button>
          </div>
        </div>
      ) : null}
      <div className={styles.similarRestaurants}>
        <PopularRestaurants heading="Similar Restaurants" />
      </div>
      <Footer width={width} />
    </div>
  )
}

export default Checkout
