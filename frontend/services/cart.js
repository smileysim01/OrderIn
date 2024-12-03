import axios from 'axios'
import { addTokenToHeader } from '../utils/addToken'

const URL = import.meta.env.VITE_API_URL;
export const getCart = async () => {
    const headers = addTokenToHeader({ headers: {'Content-Type': 'application/x-www-form-urlencoded'} });
    try {
        const response = await axios.get(`${URL}/OrderIn/api/v1/user/cart`, {headers});
        return {
            status: response ? response.status : 200,
            message: response.data.message ? response.data.message : "Cart fetched successfully.",
            data: response.data.cart ? response.data.cart : null
        }
    } catch (error) {
        throw {
            status: error.response ? error.response.status : 500,
            message: error.response ? error.response.data.message : "Internal server error."
        }
    }
}

export const updateCart = async (data) => {
    const headers = addTokenToHeader({ headers: {'Content-Type': 'application/x-www-form-urlencoded'} });
    try {
        const response = await axios.patch(`${URL}/OrderIn/api/v1/user/cart`, data, {headers});
        return {
            status: response ? response.status : 200,
            message: response.data.message ? response.data.message : "Cart updated successfully.",
            data: response.data.cart ? response.data.cart : null
        }
    } catch (error) {
        throw {
            status: error.response ? error.response.status : 500,
            message: error.response ? error.response.data.message : "Internal server error."
        }
    }
}

export const deleteCartItem = async (itemId) => {
    const headers = addTokenToHeader({ headers: {'Content-Type': 'application/x-www-form-urlencoded'} });
    try {
        const response = await axios.delete(`${URL}/OrderIn/api/v1/user/cart/item/${itemId}`, {headers});
        return {
            status: response ? response.status : 200,
            message: response.data.message ? response.data.message : "Cart updated successfully.",
            data: response.data.cart ? response.data.cart : null
        }
    } catch (error) {
        throw {
            status: error.response ? error.response.status : 500,
            message: error.response ? error.response.data.message : "Internal server error."
        }
    }
}

