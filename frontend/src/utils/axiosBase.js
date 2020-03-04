import axios from 'axios';

const customAxios = axios.create({
    baseURL : 'https://15.164.2.26:3307/api'
});

export default customAxios;
