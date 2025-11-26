import axios from 'axios';


const baseUrl = 'http://localhost:3000/todos';

export async function getTodos() {
    const res = await axios.get(baseUrl);
    return res.data;
} 

export async function addTodo(label) {
    const newTodo = {text: label, done: false};
    const res = await axios.post(baseUrl, newTodo);
    return res.data;
} 