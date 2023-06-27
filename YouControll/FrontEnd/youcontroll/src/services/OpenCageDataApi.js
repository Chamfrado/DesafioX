import axios from "axios";


const OCDApi = axios.create({
	baseURL : "https://api.opencagedata.com/geocode/v1/json?q="
});

export default OCDApi;