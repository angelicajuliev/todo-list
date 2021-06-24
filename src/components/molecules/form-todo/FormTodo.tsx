import React, { useEffect, useState } from 'react';

import { ToDo } from '../../../models/Todo';
import { Button } from '../../atoms/button/Button';
import { Input, INPUT_VARIATIONS } from '../../atoms/input/Input';
import { ACTIONS, Icon } from '../../atoms/icon/Icon';

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

    const handleSuccess = () => {
        setError('');
        setText('')
    }


    useEffect(handleParentError, [errorParent]);
    useEffect(handleSuccess, [isSuccess]);

    return (
        <section className={styles.container}>
            <Icon action={ACTIONS.ADD} onClick={handleNewToDo} isLoading={isLoading} />
            <Input
                variation={INPUT_VARIATIONS.NAKED}
                placeholder="Agregar tarea para hacer"
                onChange={handleChangeText}
                onEnter={handleNewToDo}
                error={error}
            />
        </section>
    );
}

export { FormTodo };