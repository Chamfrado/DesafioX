import axios from "axios";


const YCapi = axios.create({
	baseURL : "http://localhost:8080/",
	
});

export default YCapi;