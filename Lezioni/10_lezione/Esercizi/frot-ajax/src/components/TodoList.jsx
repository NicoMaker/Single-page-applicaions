import { TodoListItem } from "./TodoListItem"


export const TodoList = ({todos}) => {

    return (
        <ul className="list-group">
            {todos.map(t => <TodoListItem  key={t.id} todo={t} />)}
        </ul>
    )
}