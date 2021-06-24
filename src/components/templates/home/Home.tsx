import React, { useState } from 'react';

import { getRandomNumber } from '../../../util';
import { ToDo } from '../../../models/Todo';
import { RequestState, REQUEST_STATES } from '../../../models/App';
import { TodoList } from '../../organisms/todo-list/TodoList';
import { Select } from '../../atoms/select/Select';
import { FormTodo } from '../../molecules/form-todo/FormTodo';

import styles from './Home.module.scss'

export type IHomeProps = {}

const Home: React.FC<IHomeProps> = ({ }) => {
    const [todos, setTodos] = useState<ToDo[]>([]);
    const [newToDoState, setNewToDoState] = useState<RequestState>();
    const states = [
        { value: 'Sin filtro' },
        { value: 'Completado' },
        { value: 'Por hacer' },
    ]

    const handleAddToDo = (todo: ToDo) => {
        setNewToDoState(REQUEST_STATES.PENDING)
        const todoUpdated = { ...todo, order: todos.length, id: getRandomNumber() }
        setTodos([...todos, todoUpdated])

        setTimeout(() => {
            setNewToDoState(REQUEST_STATES.SUCCESS)
        }, 150);
    }

    const handleDeleteToDo = (todo: ToDo) => {
        const todosUpdated = todos.filter((t) => t.id !== todo.id)
        setTodos(todosUpdated)
    }

    const handleFilterToDos = (value: string) => console.log(value);

    return (
        <section className={styles.container}>
            <Select label="Filtro" options={states} onChange={handleFilterToDos} />
            <TodoList todos={todos} />
            <FormTodo state={newToDoState} onSubmit={handleAddToDo} />
        </section>
    );
}

export { Home };