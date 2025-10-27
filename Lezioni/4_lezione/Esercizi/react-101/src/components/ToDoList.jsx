import { TodoListItem } from './TodoListItem';

export const ToDoList = ({ todos, toggleTodo, deleteTodo, editTodo }) => {
    return (
        <ul>
            {todos.map((t) => (
                <TodoListItem
                    key={t.id}
                    todo={t}
                    toggleTodo={() => toggleTodo(t)}
                    editTodo={() => editTodo(t)}
                    deleteTodo={() => deleteTodo(t)}
                />
            ))}
        </ul>
    );
};