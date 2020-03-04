import axios from 'axios';

const customAxios = axios.create({
    baseURL : 'https://www.dabeen.org:3307/api'
});
// https://15.164.2.26:3307
export default customAxios;
