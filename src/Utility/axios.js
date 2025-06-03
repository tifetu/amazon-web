import axios from "axios";
const instance = axios.create({
  // baseURL: "http://127.0.0.1:5001/clone-74e14/us-central1/api",
  baseURL: "https://amazon-web-1.onrender.com",
});
export { instance };
