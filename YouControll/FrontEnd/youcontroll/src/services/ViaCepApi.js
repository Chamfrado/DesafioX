import axios from "axios"


const YCapi = axios.create({
    baseURL : 'https://viacep.com.br/ws/'
});

export default YCapi;