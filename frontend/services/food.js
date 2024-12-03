import axios from 'axios'
import { addTokenToHeader } from '../utils/addToken'

export const food = async (name) => {
    const URL = import.meta.env.VITE_API_URL;
    const headers = addTokenToHeader({ headers: {'Content-Type': 'application/x-www-form-urlencoded'} });
    try {
        const response = await axios.get(`${URL}/OrderIn/api/v1/food/${name}`, {headers});
        return {
            status: response ? response.status : 200,
            message: response.data.message ? response.data.message : "Food fetched successfully.",
            data: response.data.food ? response.data.food : null
        }
    } catch (error) {
        throw {
            status: error.response ? error.response.status : 500,
            message: error.response ? error.response.data.message : "Internal server error."
        }
    }
}