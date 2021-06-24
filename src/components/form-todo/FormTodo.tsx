import React, { useEffect, useState } from 'react';

import { ToDo } from '../../models/Todo';
import { Button } from '../button/Button';
import { Input } from '../input/Input';
import { ACTIONS, Icon } from '../icon/Icon';

import styles from './FormTodo.module.scss'

export type IFormTodoProps = {
    isLoading: boolean;
    isSuccess: boolean;
    error?: string;
    onSubmit(todo: ToDo): void;
}

const FormTodo: React.FC<IFormTodoProps> = ({ isLoading, isSuccess, error: errorParent, onSubmit }) => {
    const [text, setText] = useState<string>();
    const [error, setError] = useState('');

    const handleChangeText = (value: string) => setText(value)

    const handleNewToDo = () => {
        if (!text) {
            setError('Escribe tu pendiente')
            return;
        }

        const todo: ToDo = { id: '', text, isCompleted: false }
        setError('')
        onSubmit(todo);
    }

    const handleParentError = () => setError(errorParent ?? '')

    useEffect(handleParentError, [errorParent]);

    return (
        <section className={styles.container}>
            <Input placeholder="Escribe algo que tengas por hacer" onChange={handleChangeText} error={error} onEnter={handleNewToDo} />
            <Icon action={ACTIONS.SAVE} onClick={handleNewToDo} isLoading={isLoading} />
        </section>
    );
}

export { FormTodo };