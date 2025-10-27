import clsx from 'clsx';
import { MyButton } from './MyButton';
import style from '../App.module.css';


export const TodoListItem = ({todo, toggleTodo, deleteTodo, editTodo}) => {

    return (
        <li className={clsx(style['todo-item'], { [style.completed]: todo.done })}>
            <span className={style['todo-text']} onClick={toggleTodo}>
                {todo.text}
            </span>
            <div className={style['todo-actions']}>
                <MyButton 
                    icon={ todo.done ? 'fa-times' : 'fa-check'} 
                    clickHandler={toggleTodo} 
                />
                <MyButton 
                    level={1}
                    icon="fa-pencil" 
                    clickHandler={editTodo} 
                />
                <MyButton 
                    level={4} 
                    icon="fa-trash" 
                    clickHandler={deleteTodo} 
                />
            </div>
        </li>
    )
}