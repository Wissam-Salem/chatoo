import axios from "axios";

let authenticate = async () => {
  let response = await axios.get("http://192.168.0.106:8080/authenticate", {
    withCredentials: true,
  });
  let data = await response;
  return data;
};

export default authenticate;
