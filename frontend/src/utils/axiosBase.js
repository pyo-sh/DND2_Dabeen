import axios from 'axios';

const customAxios = axios.create({
    baseURL : 'http://15.164.2.26:3307/api'
});

export default customAxios;
