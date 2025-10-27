import { useState } from 'react';
import {produce} from 'immer';

export const useTodos = () =>  {
    const initialState = [
        {id: 1, text: 'fare la spesa', done: false},
        {id: 2, text: 'guardare batman', done: false},
        {id: 3, text: 'imparare a usare i colori', done: false},
        {id: 4, text: 'banana', done: false},
    ];


    const [todos, setTodos] = useState(initialState);

    function deleteTodo(td) {
        setTodos(todos.filter(t => t.id !== td.id));
    }

    function toggleTodo(td) {
        const index = todos.findIndex(t => t.id === td.id);

        setTodos(produce(todos, draft => {
            draft[index].done = !draft[index].done;
        }));
    }

    return {
        todos,
        toggleTodo,
        deleteTodo
    }
}
