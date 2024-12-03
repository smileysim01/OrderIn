import styles from './index.module.css';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { restaurantDetail } from '../../services/restaurant';
import { toast } from 'react-toastify';
import plus from '../../src/assets/plus.png';
import Cart from '../cart';

function RestaurantDetail() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const navigate = useNavigate()
  const [restaurantData, setRestaurantData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const params = useParams();
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await restaurantDetail(params.id)
        setRestaurantData(response.data)
        setIsLoading(false);
      } catch (error) {
        error?.message ? toast.error(error.message) : toast.error("An unexpected error occured. Please try again.")
      }
    }
    fetchData()
  }, [params.id])

  const handleAddFood = (food) => {
    setCartItems((prevItems) => {
      const existingFood = prevItems.find(item => item.item === food._id);
      let updatedCart;
      if (existingFood) {
        updatedCart = prevItems.map(item => item.item === food._id ? {...item, quantity: item.quantity + 1} : item);
      } else {
        updatedCart = [...prevItems, {item: food._id, quantity: 1}];
      }
      const newTotal = updatedCart.reduce((sum, cartItem) => {
        const foodItem = restaurantData.foodList.find(f => f._id === cartItem.item);
        return sum + (foodItem?.price || 0) * cartItem.quantity;
      }, 0);
      setTotalAmount(newTotal);
      return updatedCart;
    })
  }

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
      <div className={styles.navBar}>
        <button className={styles.hamburger} onClick={toggleMenu}>☰</button>
        <div className={styles.nav} id={isMenuOpen ? styles.show : ''}>
          <ul>
            <li><Link className={isActive(`/home/restaurants/${params.id}`) ? styles.active : null} onClick={toggleMenu}>Offers</Link></li>
            <li><Link className={isActive(`/home/restaurants/${params.id}/burgers`) ? styles.active : null} onClick={toggleMenu}>Burgers</Link></li>
            <li><Link className={isActive(`/home/restaurants/${params.id}/fries`) ? styles.active : null} onClick={toggleMenu}>Fries</Link></li>
            <li><Link className={isActive(`/home/restaurants/${params.id}/snacks`) ? styles.active : null} onClick={toggleMenu}>Snacks</Link></li>
            <li><Link className={isActive(`/home/restaurants/${params.id}/salads`) ? styles.active : null} onClick={toggleMenu}>Salads</Link></li>
            <li><Link className={isActive(`/home/restaurants/${params.id}/colddrinks`) ? styles.active : null} onClick={toggleMenu}>Cold drinks</Link></li>
            <li><Link className={isActive(`/home/restaurants/${params.id}/happymeal`) ? styles.active : null} onClick={toggleMenu}>Happy Meal®</Link></li>
            <li><Link className={isActive(`/home/restaurants/${params.id}/desserts`) ? styles.active : null} onClick={toggleMenu}>Desserts</Link></li>
            <li><Link className={isActive(`/home/restaurants/${params.id}/hotdrinks`) ? styles.active : null} onClick={toggleMenu}>Hot drinks</Link></li>
            <li><Link className={isActive(`/home/restaurants/${params.id}/sauces`) ? styles.active : null} onClick={toggleMenu}>Sauces</Link></li>
            <li><Link className={isActive(`/home/restaurants/${params.id}/orbit`) ? styles.active : null} onClick={toggleMenu}>Orbit®</Link></li>
          </ul>
        </div>
      </div>

      <div className={styles.restaurantDetails} id={width > 720 ? styles.desktopContainer : styles.mobileContainer}>
        {isLoading ? (
          <p>Loading...</p>
        ) : restaurantData && restaurantData.categories ? (
          restaurantData.categories.map((category) => (
            <div key={category._id} className={styles.category}>
              <h1>{category.name}</h1>
              <div className={styles.foodList}>
                {restaurantData.foodList && restaurantData.foodList.length > 0 ? (
                  restaurantData.foodList.map((food) => (
                    food.category.toString() === category._id.toString() && (
                      <div key={food._id} className={styles.foodItem}>
                        <div className={styles.left}>
                          <h3>{food.name}</h3>
                          <p>{food.description}</p>
                          <h2>₹ {food.price}</h2>
                        </div>
                        <img src={food.image} alt={food.name} className={styles.foodImage} />
                        <div className={styles.plusBackground}>
                          <img src={plus} alt="plus" onClick={()=>handleAddFood(food)} className={styles.plus} />
                        </div>                      
                      </div>
                    )
                  ))
                ) : (
                  <p>No food items available in this category.</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No categories found.</p>
        )}
      </div>
      <Cart cartItems={cartItems} restaurantData={restaurantData} />
    </div>
  )
}

export default RestaurantDetail
