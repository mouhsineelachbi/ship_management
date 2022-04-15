import axios from 'axios';

const ApiClient = () => {
    const url = 'http://localhost:4000/api/'

    const axiosInstance = axios.create({
        baseURL: url
    })

    return axiosInstance
}

export default ApiClient;