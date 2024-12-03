import styles from './popularRestaurants.module.css'
import { useNavigate } from 'react-router-dom'
import { popularRestaurants } from '../../services/restaurant'
import { useState, useEffect } from 'react'
import {toast} from 'react-toastify'

function PopularRestaurants({heading}) {
  const navigate = useNavigate()
  const [restaurantsData, setRestaurantsData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await popularRestaurants()
        setRestaurantsData(response.data)
        setIsLoading(false);
        // console.log(response.data, restaurantsData, Object.entries(restaurantsData || {})) 
      } catch (error) {
        error?.message ? toast.error(error.message) : toast.error("An unexpected error occured. Please try again.")
      }
    }
    fetchData()
  }, [])

  return (
    <div className={styles.container}>
      <h1>{heading}</h1>
        {isLoading ? (<p>Loading...</p>) : restaurantsData && restaurantsData.length > 0 ? (
          <div className={styles.restaurants}>
            {restaurantsData.map((restaurant, index) => (
              <div key={index} className={styles.restaurantCard} onClick={() => navigate(`/home/restaurants/${restaurant._id}`)} style={{backgroundImage: `url(${restaurant.image})`}}>
              </div>
            ))}
          </div>
        ) : (
          <p>Could not fetch popular restaurants. Try again later.</p>
        )}
    </div>
  )
}

export default PopularRestaurants
