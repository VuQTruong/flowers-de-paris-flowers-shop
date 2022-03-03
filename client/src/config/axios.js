import axios from 'axios';
import { signOut } from '../features/users/sign-out';
import swal from 'sweetalert2';
import { BASE_URL } from '../constants';

const Axios = axios.create({
  baseURL: `${BASE_URL}api`,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export const setUpAxiosResponseInterceptor = (userInfo, dispatch) => {
  Axios.interceptors.response.use(
    (response) => {
      // response with code 2xx comes here
      return response;
    },
    (error) => {
      if (error.response && error.response.status === 401 && userInfo) {
        dispatch(signOut());
        swal.fire({
          icon: 'error',
          title: 'Oops!...',
          html: `
            <p>Sorry! Your session has been expired!</p>
            <p>Please sign in again!</p>   
          `,
          footer: `<a href='/signin'>Sign In Here!</a>`,
        });
      }

      return Promise.reject(error);
    }
  );
};

export default Axios;
