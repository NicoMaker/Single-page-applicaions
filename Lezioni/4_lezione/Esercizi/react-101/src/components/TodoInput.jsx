import { useState } from 'react';
import style from '../App.module.css';

export const TodoInput = ({ addTodo }) => {
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim()) {
            addTodo(text.trim());
            setText('');
        }
    };

    return (
        <form className={style.inputSection} onSubmit={handleSubmit}>
            <input
                type="text"
                className={style.newTodo}
                placeholder="Cosa vuoi fare oggi? 🎯"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button type="submit" className={style.addTodo}>➕ Aggiungi</button>
        </form>
    );
};