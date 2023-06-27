import axios from "axios"


const EstadosApi = axios.create({
    baseURL : 'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
});

export default EstadosApi;