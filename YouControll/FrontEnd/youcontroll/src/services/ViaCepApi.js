import axios from "axios";


const ViaCepApi = axios.create({
	baseURL : "https://viacep.com.br/ws/"
});

export default ViaCepApi;