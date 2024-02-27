import Axios from "axios";

const BASE_URL = "https://localhost:8000/api";

Axios.defaults.baseURL = BASE_URL;

export const LOGIN_URL = "/token";
export const REGISTER_URL_ADMIN = "/register";
export const REGISTER_URL_EMPLOYEE = "";
