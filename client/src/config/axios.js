import axios from 'axios';

const Axios = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/api`,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export default Axios;
