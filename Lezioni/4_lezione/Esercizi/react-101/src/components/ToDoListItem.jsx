import clsx from 'clsx';
import { MyButton } from './MyButton';


export const TodoListItem = ({todo, toggleTodo, deleteTodo}) => {

    return (
        <li className={clsx('todo-item', { 'completed': todo.done })}>
            <div 
                className={clsx('todo-checkbox', { 'checked': todo.done })}
                onClick={toggleTodo}
            >
            </div>
            <span className="todo-text">{todo.text}</span>
            <div className="todo-actions">
                <MyButton 
                    icon={ todo.done ? 'fa-times' : 'fa-check'} 
                    clickHandler={toggleTodo} 
                    className="toggle-btn"
                />
                <MyButton 
                    level={4} 
                    icon="fa-trash" 
                    clickHandler={deleteTodo} 
                    className="delete-btn"
                />
            </div>
        </li>
    )
}