import axios from "axios";

const instance = axios.create({
  baseURL: `https://algosipeosseong.site`,
  timeout: 10000,
});

export default instance;
