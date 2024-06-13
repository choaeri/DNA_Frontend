import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_TOUR_API}`,
    headers: {
      'Content-type': 'application/json',
    },
    withCredentials: true
  });

export { axiosInstance };