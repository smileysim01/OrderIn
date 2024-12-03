import axios from 'axios'
import { addTokenToHeader } from '../utils/addToken'

const URL = import.meta.env.VITE_API_URL;

export const register = async (data) => {
    const headers = addTokenToHeader({ headers: {'Content-Type': 'application/x-www-form-urlencoded'} });
    try {
        const response = await axios.post(`${URL}/OrderIn/api/v1/user/register`, data, {headers});
        return {
            status: response ? response.status : 200,
            message: response.data.message ? response.data.message : "User registration successful.",
            token: response.data.token ? response.data.token : null,
            name: response.data.name ? response.data.name : null
        }
    } catch (error) {
        throw {
            status: error.response ? error.response.status : 500,
            message: error.response ? error.response.data.message : "Internal server error."
        }
    }
}

export const login = async (data) => {
    const headers = addTokenToHeader({ headers: {'Content-Type': 'application/x-www-form-urlencoded'} });
    try {
        const response = await axios.post(`${URL}/OrderIn/api/v1/user/login`, data, {headers});
        return {
            status: response ? response.status : 200,
            message: response.data.message ? response.data.message : "User login successful.",
            token: response.data.token ? response.data.token : null,
            name: response.data.name ? response.data.name : null
        }
    } catch (error) {
        throw {
            status: error.response ? error.response.status : 500,
            message: error.response ? error.response.data.message : "Internal server error."
        }
    }
}

export const resetPwd = async (data) => {
    const headers = addTokenToHeader({ headers: {'Content-Type': 'application/x-www-form-urlencoded'} });
    try {
        const response = await axios.patch(`${URL}/OrderIn/api/v1/user/resetPwd`, data, {headers});
        return {
            status: response ? response.status : 200,
            message: response.data.message ? response.data.message : "Password updated successfully.",
        }
    } catch (error) {
        throw {
            status: error.response ? error.response.status : 500,
            message: error.response ? error.response.data.message : "Internal server error. Password could not be updated."
        }
    }
}

export const getAccount = async () => {
    const headers = addTokenToHeader({ headers: {'Content-Type': 'application/x-www-form-urlencoded'} });
    try {
        const response = await axios.get(`${URL}/OrderIn/api/v1/user/getAccount`, {headers});
        return {
            status: response ? response.status : 200,
            message: response.data.message ? response.data.message : "User data fetched successfully.",
            data: response.data.user ? response.data.user : null,
        }
    } catch (error) {
        throw {
            status: error.response ? error.response.status : 500,
            message: error.response ? error.response.data.message : "Internal server error."
        }
    }
}

export const settings = async (data) => {
    const headers = addTokenToHeader({ headers: {'Content-Type': 'application/x-www-form-urlencoded'} });
    try {
        const response = await axios.patch(`${URL}/OrderIn/api/v1/user/settings`, data, {headers});
        return {
            status: response ? response.status : 200,
            message: response.data.message ? response.data.message : "Account settings updated successfully.",
        }
    } catch (error) {
        throw {
            status: error.response ? error.response.status : 500,
            message: error.response ? error.response.data.message : "Internal server error."
        }
    }
}