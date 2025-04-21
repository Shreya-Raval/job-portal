import axios from "axios";

const apiCall = axios.create({
  baseURL: "http://localhost:8000/api", 
  withCredentials: true, 
});

export default apiCall;
