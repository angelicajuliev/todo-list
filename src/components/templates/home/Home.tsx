import React, { useState } from 'react';

import { TodoList } from '../../organisms/todo-list/TodoList'
import { Button } from '../../atoms/button/Button';
import { Input } from '../../atoms/input/Input';
import { ToDo } from '../../../models/Todo';
import { Select } from '../../atoms/select/Select';
import { FormTodo } from '../../molecules/form-todo/FormTodo';

import styles from './Home.module.scss'

export type IHomeProps = {}

const Home: React.FC<IHomeProps> = ({ }) => {
    const [todos, setTodos] = useState<ToDo[]>([]);
    const states = [
        { value: 'Sin filtro' },
        { value: 'Completado' },
        { value: 'Por hacer' },
    ]

    const handleAddToDo = (todo: ToDo) => { setTodos([...todos, todo]) }

    const handleDeleteToDo = (todo: ToDo) => {
        const todosUpdated = todos.filter((t) => t.id !== todo.id)
        setTodos(todosUpdated)
    }

    const handleFilterToDos = (value: string) => console.log(value);

    return (
        <section className={styles.container}>
            <Select label="Filtro" options={states} onChange={handleFilterToDos} />
            <TodoList todos={todos} />
            <FormTodo isLoading={false} isSuccess={false} onSubmit={handleAddToDo} />
        </section>
    );
}

export { Home };