import axios from "axios";

const instance = axios.create({
  baseURL: "http://10.57.206.143:5000/",
  // baseURL: "https://school-mgt-server.herokuapp.com/",
});
export default instance;
