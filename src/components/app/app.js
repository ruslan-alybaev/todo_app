import React, {useEffect, useState} from 'react';

import Header from "../header";
import SearchPanel from "../search-panel";
import TodoList from "../todo-list";
import AddTodo from "../add-todo";

import './style.css'

const App = () => {

    const [todos, setTodos] = useState([]); // здесь будут все наши задачи
    const [input, setInput] = useState(''); // здесь будет то, куда мы должны писать инпуты
    const [filteredTodos, setFilteredTodos] = useState('') // отфильтрованные all, active, done
    const [status, setStatus] = useState('') // сколько осталось(статистика). Cocтояние, где проверяется статус.
    const [searchInputText, setSearchInputText] = useState(''); // для поиска определенных задач



    useEffect(() => {
        getItems();
        setStatus('all')
        }, []);

    useEffect(() => {
        saveItems();
        Array.from(document.getElementsByClassName('statusBtn')).map((btn) => {
            if (btn.value === status){
                return btn.classList.add('active')
            } else{
                return btn.classList.remove('active')
            }
        })
    }, [status, todos, filteredTodos]);


    const saveItems = () => {
        localStorage.setItem('todo', JSON.stringify(todos))
        localStorage.setItem('btnStatus', status)
    };

    const getItems = () => {
        setTodos(JSON.parse(localStorage.getItem('todo')))
        setStatus(localStorage.getItem('btnStatus'))
    }

    // setItem - по одному хранит каждую задачу. В данном случае 'todo' это ключ.


    const filterHandler = () => {
        if (status === 'active') {
            setFilteredTodos(todos.filter((item) => item.isActive))
        } else if (status === 'done') {
            setFilteredTodos(todos.filter((item) => !item.isActive))
        } else {
            setFilteredTodos(todos)
        }
    };

    useEffect(() => {
        filterHandler()
    }, [status, todos]);



    return (
        <div className="main">
            <div className='todo-container'>
                <Header
                    todos={todos}
                />
                <SearchPanel
                    setStatus={setStatus}
                    setSearchInputText={setSearchInputText}
                />
                {
                    filteredTodos ? filteredTodos.length === 0 ?
                            <div className="">Here should be todos</div>
                             : <TodoList
                            todos={todos}
                            setTodos={setTodos}
                            filteredTodos={filteredTodos}
                            searchInputText={searchInputText}
                            />
                            : setFilteredTodos([])
                }





                <AddTodo
                    todos={todos}
                    setTodos={setTodos}
                    input={input}
                    setInput={setInput}
                />
            </div>
        </div>
    );
};

export default App;