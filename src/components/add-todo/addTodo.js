import React from 'react';

import './style.css'

const AddTodo = ({todos, setTodos, input, setInput}) => {

    const formHandler = (e) => {
        e.preventDefault();
        setInput('')
        setTodos([...todos, {
            todoName: input,
            isActive: true,
            isImportant: false,
            id: Math.floor(1000 * Math.random())
        }])
    };

    const inputHandler = (e) => {
        setInput(e.target.value)
    }

    return (
        <form className='add-todo mt-3' onSubmit={formHandler}>
            <input type="text"
                   onChange={inputHandler}
                   value={input}
                   placeholder='What needs to be done?'
                   className='add-input'
                   required // будет напоминание о том, что ячейку нужно заполнить.
            />
            <button type='submit' className='btn btn-outline-success'>Add Todo</button>
        </form>
    );
};

export default AddTodo;