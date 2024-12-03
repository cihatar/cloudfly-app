import axios from "axios";

const customAxios = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true,
});

/*
// check if the response status is 401, and redirect to home page
customAxios.interceptors.response.use(
    (response) => response, 
    (error) => {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('user');
        window.location.href = '/auth/login';
      }
      return Promise.reject(error);
    }
);
*/

export default customAxios;