import axios from "axios";
import store from '../store';
import { logout } from "../store/reducer/authSlice";


const httpClient = axios.create({
  baseURL: "http://localhost:8080/api",     // Mac 测试用的 API
  // baseURL: "http://39.105.169.246/api",  // 服务器在用的 API
})

/*
httpClient.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token
    // console.log('Before AxiosAPI.interceptors.request token:' ,token)

    if (token) {
      config.headers = {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`,
      }
    }
    return config
  },
  error => {
  });
*/

/* 响应拦截器 - 对响应数据做一些事情
 *  logoutUser() : localStorage.removeItem('userDetails');
 *   - 401 说明身份认证失败, 清除 localStorage 中的 userDetails
 */
/*
httpClient.interceptors.response.use(
  response => response,
  async (error) => {
    if (error?.response?.status === 401) {  // 401 Unauthorized - 身份认证失败
      // store.dispatch(logoutUser());
      console.log('error?.response?.status', error?.response?.status);
      store.dispatch(logout());
    }
  }
);
*/
export default httpClient;
