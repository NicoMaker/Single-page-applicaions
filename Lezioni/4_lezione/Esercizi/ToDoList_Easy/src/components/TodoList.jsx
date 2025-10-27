import { TodoListItem } from './TodoListItem';

export const TodoList = ({todos, toggleTodo, deleteTodo}) => {

    return (
      <ul>
        {todos.map(t => <TodoListItem key={t.id}
                          todo={t} 
                          toggleTodo={() => toggleTodo(t)}
                          deleteTodo={() => deleteTodo(t)}
                        />)}
      </ul>

    )
}