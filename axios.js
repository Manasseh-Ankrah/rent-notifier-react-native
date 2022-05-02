import axios from "axios";

const instance = axios.create({
  baseURL: "http://10.57.196.187:5000/",
  // baseURL: "https://school-mgt-server.herokuapp.com/",
});
export default instance;
