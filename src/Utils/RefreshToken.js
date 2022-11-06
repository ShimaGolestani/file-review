/* -disable */
import axios from "axios";
import jwtDecode from "jwt-decode";
import axiosInstance from "../config/axios";

const RefreshToken = () => {
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();
  const token = localStorage.getItem("Token");
  if (token) {
    const { refresh_token } = JSON.parse(token);
    axios({
      url: "http://192.168.130.195:7080/api/v1/user/refresh_token",
      headers: { Authorization: refresh_token },
      method: "GET",
      cancelToken: source.token,
    })
      .then((response) => {
        if (response.status < 300) {
          const newToken = { refresh_token, ...response.data };
          localStorage.setItem("Token", JSON.stringify(newToken));
          const { exp } = jwtDecode(response.data.token);
          // handleTokenExipration({ exp });
          axiosInstance.defaults.headers.common.Authorization = `${response.data.token}`;
        }
      })
      .catch((thrown) => {
        if (axios.isCancel(thrown)) {
          console.log("Request canceled", thrown.message);
        }
      });
  }
};
export default RefreshToken;

export const handleTokenExipration = ({ exp }) => {
  let expiredTimer;

  window.clearTimeout(expiredTimer);
  const currentTime = Date.now();
  const timeLeft = exp * 1000 - currentTime;
  expiredTimer = window.setTimeout(() => {
    RefreshToken();
  }, timeLeft);
};
