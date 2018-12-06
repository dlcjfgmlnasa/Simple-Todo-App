import {authedAxios} from './Settings';

const axios = authedAxios();
const todoBaseApi = "/todo-lists/v1/todo/";

export function findAll(){
    const url = todoBaseApi+'list/';

    //const url = "/api/v2/list_movies.json?sort_by=download_count";
    return axios.get(url);
}

export function findOne(id){
    return axios.get(`${todoBaseApi}${id}/`);
}

export function insert(todo){
    let url = todoBaseApi;
    if(todo.category > 0){
        url += `?category=${todo.category}`;
    }
    return axios.post(`${url}`, todo);
}

export function modify(todo){
    return axios.put(`${todoBaseApi}${todo.id}/`, todo);
}

export function remove(id){
    return axios.delete(`${todoBaseApi}${id}/`);
}
