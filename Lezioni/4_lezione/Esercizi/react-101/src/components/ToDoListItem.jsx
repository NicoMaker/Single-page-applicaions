import clsx from 'clsx';
import { MyButton } from './MyButton';


export const TodoListItem = ({todo, toggleTodo, deleteTodo}) => {

    return (
        <li>
            <span className={clsx('todo', {'done': todo.done})}>{todo.text}</span>
            <MyButton 
                level={4} 
                icon="fa-trash" 
                clickHandler={deleteTodo} 
            />
            <MyButton 
                icon={ todo.done ? 'fa-times' : 'fa-check'} 
                clickHandler={toggleTodo} 
            />
        </li>
    )
}