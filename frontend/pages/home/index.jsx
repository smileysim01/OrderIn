import styles from './index.module.css'
import { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import homeModel1 from '../../src/assets/homeModel1.png';
import homeModel2 from '../../src/assets/homeModel2.png';
import logo from '../../src/assets/logo.png';
import PopularRestaurants from '../../components/popularRestaurants/PopularRestaurants';
import second1 from '../../src/assets/homeImg/second1.png';
import second2 from '../../src/assets/homeImg/second2.png';
import second3 from '../../src/assets/homeImg/second3.png';
import image1 from "../../src/assets/homeImg/image1.png";
import image2 from "../../src/assets/homeImg/image2.png";
import image3 from "../../src/assets/homeImg/image3.png";
import image4 from "../../src/assets/homeImg/image4.png";
import image5 from "../../src/assets/homeImg/image5.png";
import image6 from "../../src/assets/homeImg/image6.png";
import four1 from "../../src/assets/homeImg/four1.png";
import four2 from "../../src/assets/homeImg/four2.png";
import four3 from "../../src/assets/homeImg/four3.png";
import four4 from "../../src/assets/homeImg/four4.png";
import download from "../../src/assets/download.png";

function Home() {
  const [selectedFood, setSelectedFood] = useState('Pizza');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
        {/* <img
          src={Homesecond}
          alt="exclusive deals"
          className={styles.homeSecond}
        /> */}
        <div className={styles.header}>
          <h1 className={styles.headerTitle}>Up to -40% 🎊 Order.in exclusive deals</h1>
          <h1 className={styles.headerResponsiveTitle}>Up to -40% Discount Offers 🎊</h1>
          <button className={styles.hamburger} onClick={toggleMenu}>
            ☰
          </button>
          <div className={styles.foodTiles} id={isMenuOpen ? styles.show : ""}>
            <ul>
              <li onClick={toggleMenu}>Vegan</li>
              <li onClick={toggleMenu}>Sushi</li>
              <li onClick={toggleMenu}>
                <button className={styles.selected}>Pizza & Fast food</button>
              </li>
              <li onClick={toggleMenu}>others</li>
            </ul>
          </div>
        </div>
        <div className={styles.restoCards}>
          <div className={styles.card}>
            <img src={second1} alt="second1" />
            {/* <p>Restaurant</p>
              <p>Chef Burgers London</p> */}
          </div>
          <div className={styles.card}>
            <img src={second2} alt="second2" />
            {/* <p>Restaurant</p>
              <p>Grand Ai Cafe London</p> */}
          </div>
          <div className={styles.card}>
            <img src={second3} alt="second3" />
            {/* <p>Restaurant</p>
              <p>Butterbrot Caf'e London</p> */}
          </div>
        </div>
      </div>

      <div className={styles.third}>
        <h1>Order.uk Popular Categories</h1>
        <div className={styles.popular}>
          <div className={styles.popularCard}>
            <img src={image1} alt="popular1" />
            <p>Burgers & Fast food</p>
            <span>21 Restaurants</span>
          </div>
          <div className={styles.popularCard}>
            <img src={image2} alt="popular2" />
            <p>Salads</p>
            <span>32 Restaurants</span>
          </div>
          <div className={styles.popularCard}>
            <img src={image3} alt="popular3" />
            <p>Pasta & Casuals</p>
            <span>4 Restaurants</span>
          </div>
          <div className={styles.popularCard}>
            <img src={image4} alt="popular4" />
            <p>Pizza</p>
            <span>32 Restaurants</span>
          </div>
          <div className={styles.popularCard}>
            <img src={image5} alt="popular5" />
            <p>Breakfast</p>
            <span>4 Restaurants</span>
          </div>
          <div className={styles.popularCard}>
            <img src={image6} alt="popular6" />
            <p>Soups</p>
            <span>32 Restaurants</span>
          </div>
        </div>
      </div>

      <PopularRestaurants heading="Popular Restaurants"/>

      <div className={styles.fourth}>
        <div className={styles.models}>
          <img
            src={four1}
            alt="model background"
            className={styles.four1}
          />
          <img
            src={four2}
            alt="model"
            className={styles.four2}
          />
        </div>
        <div className={styles.fourthDownload}>
          <h1>
            <img src={logo} alt="logo" className={styles.downloadLogo} />
            ing is more
          </h1>
          <h2 className={styles.boxText}>
            <span className={styles.personalised}>Personalised</span>
            <span> & Instant</span>
          </h2>
          <p>Download the Order.uk app for faster ordering</p>
          <img src={download} alt="download" className={styles.downloadImg} />
        </div>
      </div>
      <div className={styles.fifth}>
        <img src={four3} alt="popular categories" className={styles.four3} />
        <img src={four4} alt="popular categories" className={styles.four4} />
      </div>
    </div>
  )
}

export default Home
