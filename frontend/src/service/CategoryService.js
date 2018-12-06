import {authedAxios} from './Settings';

const axios = authedAxios();
const categoryBaseApi = "/todo-lists/v1/category/";

export function findAll(){
    return axios.get(`${categoryBaseApi}list/`);
}

export function findOne(id){
    return axios.get(`${categoryBaseApi}${id}`);
}

export function insert(todo){
    return axios.post(`${categoryBaseApi}`, todo);
}

export function modify(todo){
    return axios.put(`${categoryBaseApi}${todo.id}/`, todo);
}

export function remove(id){
    return axios.delete(`${categoryBaseApi}${id}`);
}
