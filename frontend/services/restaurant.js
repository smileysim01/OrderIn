import axios from 'axios'
import { addTokenToHeader } from '../utils/addToken'

const URL = import.meta.env.VITE_API_URL;
export const popularRestaurants = async () => {
    const headers = addTokenToHeader({ headers: {'Content-Type': 'application/x-www-form-urlencoded'} });
    try {
        const response = await axios.get(`${URL}/OrderIn/api/v1/popularRestaurants`, {headers});
        return {
            status: response ? response.status : 200,
            message: response.data.message ? response.data.message : "Popular restaurants fetched successfully.",
            data: response.data.restaurants ? response.data.restaurants : null
        }
    } catch (error) {
        throw {
            status: error.response ? error.response.status : 500,
            message: error.response ? error.response.data.message : "Internal server error."
        }
    }
}

export const restaurantDetail = async (id) => {
    const headers = addTokenToHeader({ headers: {'Content-Type': 'application/x-www-form-urlencoded'} });
    try {
        const response = await axios.get(`${URL}/OrderIn/api/v1/popularRestaurants/${id}`, {headers});
        return {
            status: response ? response.status : 200,
            message: response.data.message ? response.data.message : "Restaurant details fetched successfully.",
            data: response.data.restaurant ? response.data.restaurant : null
        }
    } catch (error) {
        throw {
            status: error.response ? error.response.status : 500,
            message: error.response ? error.response.data.message : "Internal server error."
        }
    }
}
