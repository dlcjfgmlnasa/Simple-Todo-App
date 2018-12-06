import axios from 'axios';

const baseURL = "http://164.125.141.205:8002";


const authedAxios = ()=>{
    return axios.create({
    baseURL: baseURL,
    headers: {
        'Authorization': localStorage.getItem('Authorization'),
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        'Cache-Control' : 'no-cache',
        'Access-Control-Allow-Origin' : '*',
    },
    responseType: 'json',
    transformResponse: undefined
});
}


export {
    baseURL, authedAxios
}