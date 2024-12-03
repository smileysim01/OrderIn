import styles from './index.module.css'
import {getCart, updateCart, deleteCartItem} from '../../services/cart'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import cart from '../../src/assets/cart.png';
import arrow from '../../src/assets/arrow.png';
import arrow2 from '../../src/assets/arrow2.png';
import arrow3 from '../../src/assets/arrow3.png';
import trash from '../../src/assets/trash.png';
import delivery from '../../src/assets/delivery.png';
import collection from '../../src/assets/collection.png';
import share from '../../src/assets/share.png';

function Cart({cartItems, restaurantData}) {
  const [cartData, setCartData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const calculateTotal = (items) => {
    if(!restaurantData || !restaurantData.foodList) return 0;
    return items.reduce((total, item) => {
      const food = restaurantData.foodList.find((f) => f._id === item.item);
      return total + (food?.price || 0) * item.quantity;
    }, 0);
  }

  const mergeCartItems = (existingItems, newItems) => {
    return [...existingItems, ...newItems].reduce((acc, item) => {
      const existingItem = acc.find((i) => i.item === item.item || i.item_id === item.item);
      if (existingItem) {
        existingItem.quantity += item.quantity; // Add quantities if the item exists
      } else {
        acc.push(item); // Add new item if not already present
      }
      return acc;
    }, []);
  };
  
  useEffect(() => {
    const syncCart = async () => {
      if (!localStorage.getItem("token")) { 
        let localCart = [];
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
          try {
            localCart = JSON.parse(storedCart);
          } catch (error) {
            toast.error("Invalid cart data in localStorage, resetting to empty cart.");
            localCart = [];
          }
        }
  
        const updatedCart = mergeCartItems(localCart, cartItems);
        if (JSON.stringify(updatedCart) !== JSON.stringify(localCart)) {
          setCartData({
            foodList: updatedCart,
            totalAmount: calculateTotal(updatedCart),
          });
          localStorage.setItem("cart", JSON.stringify(updatedCart));
        }
        // setCartData({
        //   foodList: updatedCart,
        //   totalAmount: calculateTotal(updatedCart),
        // });
        localStorage.setItem("cart", JSON.stringify(updatedCart)); // Ensure valid JSON is stored
        setIsLoading(false);
      }
      else {
        try {
            const existingCartResponse = await getCart();
            const existingFoodList = existingCartResponse?.data?.cart?.foodList || [];
            const updatedFoodList = mergeCartItems(existingFoodList, cartItems);

            if(JSON.stringify(updatedFoodList) !== JSON.stringify(existingFoodList)) {
              const prepareFoodListForUpdate = (foodList) => {
                return foodList.map(item => ({
                  item: item.item._id || item.item, // Ensure only `_id` is sent
                  quantity: item.quantity,
                }));
              };
              const response = await updateCart({ 
                foodList: prepareFoodListForUpdate(updatedFoodList), 
                totalAmount: calculateTotal(updatedFoodList) 
              });
              // const mergedFoodList = [...existingFoodList, ...cartItems];
              // const uniqueFoodList = mergedFoodList.reduce((acc, item) => {
              //     const existingItem = acc.find((i) => i.item === item.item);
              //     if (existingItem) {
              //         existingItem.quantity += item.quantity;
              //     } else {
              //         acc.push(item);
              //     }
              //     return acc;
              // }, []);
              // const prepareFoodListForUpdate = (foodList) => {
              //   return foodList.map(item => ({
              //     item: item.item._id || item.item, // Ensure only `_id` is sent
              //     quantity: item.quantity,
              //   }));
              // };
              // const response = await updateCart({ 
              //   foodList: prepareFoodListForUpdate(uniqueFoodList), 
              //   totalAmount: calculateTotal(uniqueFoodList) 
              // });
            setCartData(response.data);
            }
        } catch (error) {
            toast.error(error?.message || "An unexpected error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
      }
    };
    syncCart();
  }, [cartItems]);

  const handleRemove = async (itemId) => {
    try {
      if(!localStorage.getItem("token") && localStorage.getItem("cart")) {
        setCartData((prevCart) => ({
          ...prevCart,
          foodList: prevCart.foodList.filter((item) => item.item !== itemId),
          totalAmount: calculateTotal(prevCart.foodList.filter((item) => item.item !== itemId)),
      }));
      return;
      }
      const response = await deleteCartItem(itemId);
      setCartData((prevCart) => ({
          ...prevCart,
          foodList: prevCart.foodList.filter((item) => item.item !== itemId),
          totalAmount: calculateTotal(prevCart.foodList.filter((item) => item.item !== itemId)),
      }));
    } catch (error) {
      toast.error(error.message || "Failed to remove item.");
    }
  }

  const handleCheckout = () => {
    navigate('/checkout');
  }

  const handleShareCart = () => {
  }

  return (
    <div className={styles.container}>
      <div className={styles.shareCart}>
        <img src={share} alt='share'></img>
        <p>Share this cart with your friends</p>
        <button onClick={handleShareCart}>Copy Link</button>
      </div>
      <div className={styles.cartContainer}>
        {isLoading ? (
          <p>Loading...</p>
        ) : cartData && cartData.foodList && cartData.foodList.length > 0 ? (
          <div className={styles.cart}>
            <div className={styles.myBasket}><img src={cart} alt="cart"/><h1>My Basket</h1></div>
            {cartData.foodList.map((item) => (
              <div key={item.item._id} className={styles.foodItem}>
                <span className={styles.quantity}>{item.quantity}x</span>
                <span className={styles.detail}>
                  <h3 className={styles.price}>₹{item.item.price}</h3>
                  <h4 className={styles.name}>{item.item.name}</h4>
                </span>
                <img src={trash} alt="trash" className={styles.removeIcon} onClick={() => handleRemove(item.item._id)}/>
              </div>
            ))}
            <div className={styles.calculateTotal}>
              <span><h2>Subtotal:</h2><p>₹{cartData.totalAmount}</p></span>
              <span><h2>Discounts:</h2><p>-₹3.00</p> </span>
              <span><h2>Delivery Fee:</h2> <p>₹3.00</p></span>
            </div>
            <div className={styles.total}>
              <h2>Total to pay:</h2><span>₹{cartData.totalAmount}</span>
            </div>
          </div>
        ) : null}
        <div className={styles.coupons}>
          <span>Choose your free item. <img src={arrow2} alt="clickHere" className={styles.freeItemArrow}/></span>
          <span>Apply Coupon Code here. <img src={arrow3} alt="clickHere" className={styles.couponArrow}/></span>
        </div>
        <div className={styles.deliveryType}>
          <span className={styles.active}>
            <img src={delivery} alt="delivery" className={styles.deliveryIcon}/>
            <h2>Delivery</h2>
            Starts at 17:50
          </span>
          <span>
            <img src={collection} alt="collection" className={styles.collectionIcon}/>
            <h2>Collection</h2>
            Starts at 16:50
          </span>
        </div>
        <button className={styles.checkoutButton} onClick={handleCheckout} id={!cartData || cartData?.totalAmount < 20 ? styles.block : null}><img src={arrow} alt="clickHere"/>Checkout!</button>
      </div>
    </div>
  )
}

export default Cart
