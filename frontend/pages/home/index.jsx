import styles from './index.module.css'
import { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';
import homeModel1 from '../../src/assets/homeModel1.png';
import homeModel2 from '../../src/assets/homeModel2.png';
import logo from '../../src/assets/logo.png';
import Homesecond from '../../src/assets/HomeSecond.png';
import homethird from '../../src/assets/homethird.png';
import PopularRestaurants from '../../components/popularRestaurants/PopularRestaurants';
import second1 from '../../src/assets/homeImg/second1.png';
import second2 from '../../src/assets/homeImg/second2.png';
import second3 from '../../src/assets/homeImg/second3.png';

function Home() {
  const [selectedFood, setSelectedFood] = useState('Pizza');

  const handleFoodSelect = (food) => {
    setSelectedFood(food);
  };
  return (
    <div className={styles.container}>
      <div className={styles.first}>
        <div className={styles.left}>
          <p>Order Restaurant food, takeaway and groceries.</p>
          <h1>Feast Your Senses,</h1>
          <h1 className={styles.themeHead}>Fast and Fresh</h1>
          <p>Enter a postcode to see what we deliver</p>
          <div className={styles.search}>
            <input type='text' placeholder='e.g. EC4R 3TE' />
            <button onClick={() => { toast.success("Sorry, we currently don't have any restaurants in your area.") }}>Search</button>
          </div>
        </div>
        <div className={styles.middle}>
          <img src={homeModel1} alt="homeModel1" className={styles.model1} />
          <img src={homeModel2} alt="homeModel2" className={styles.model2} />
        </div>
        <div className={styles.right}>
          <div className={styles.banners}>
            <div className={styles.notify} id={styles.notify1}>
              <span className={styles.top}>
                <img src={logo} alt="logo" />
                <p>now</p>
              </span>
              <b>We’ve Received your order! 📍</b>
              <p>Awaiting Restaurant acceptance</p>
            </div>
            <div className={styles.notify} id={styles.notify2}>
              <span className={styles.top}>
                <img src={logo} alt="logo" />
                <p>now</p>
              </span>
              <b>Order Accepted! ✅</b>
              <p>Awaiting Restaurant acceptance</p>
            </div>
            <div className={styles.notify} id={styles.notify3}>
              <span className={styles.top}>
                <img src={logo} alt="logo" />
                <p>now</p>
              </span>
              <b>Your rider's nearby 🎉</b>
              <p>Your order will be delivered shortly</p>
            </div>
          </div>

        </div>
      </div>

      <div className={styles.second}>
        <img src={Homesecond} alt="exclusive deals" className={styles.homeSecond} />
        <div className={styles.header}>
          <h2>Up to -40% 🎊 Order.in exclusive deals</h2>
          <div className={styles.foodTiles}>
            {['Pizza', 'Burger', 'Pasta', 'Sushi'].map((food, index) => (
              <div
                key={index}
                className={`${styles.foodTile} ${selectedFood === food ? styles.selected : ''}`}
                onClick={() => handleFoodSelect(food)}
              >
              {food}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.third}>
        <img src={homethird} alt="popular categories" className={styles.homeThird} />
      </div>

      <PopularRestaurants heading="Popular Restaurants"/>
    </div>
  )
}

export default Home
