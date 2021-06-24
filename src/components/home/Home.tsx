import React, { useState } from 'react';

import { TodoList } from '../todo-list/TodoList'
import { Button } from '../button/Button';
import { Input } from '../input/Input';
import { ToDo } from '../../models/Todo';
import { Select } from '../select/Select';
import { FormTodo } from '../form-todo/FormTodo';

import styles from './Home.module.scss'

export type IHomeProps = {

}

const Home: React.FC<IHomeProps> = ({ }) => {
    const [todos, setTodos] = useState<ToDo[]>([]);
    const states = [
        { value: 'Sin filtro' },
        { value: 'Completado' },
        { value: 'Por hacer' },
    ]

    const handleAddToDo = (todo: ToDo) => { setTodos([...todos, todo]) }

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