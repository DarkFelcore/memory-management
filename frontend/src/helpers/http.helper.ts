import axios from "axios";
import { baseUrl } from "../constants/endpoints";

const http = axios.create({
    baseURL: baseUrl
})

export default http;