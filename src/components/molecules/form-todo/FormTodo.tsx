import React, { useEffect, useState } from 'react';

import { ToDo } from '../../../models/Todo';
import { Input, INPUT_VARIATIONS } from '../../atoms/input/Input';
import { ACTIONS, Icon } from '../../atoms/icon/Icon';

import styles from './FormTodo.module.scss'
import { RequestState, REQUEST_STATES } from '../../../models/App';

export type IFormTodoProps = {
    state?: RequestState;
    error?: string;
    onSubmit(todo: ToDo): void;
}

const FormTodo: React.FC<IFormTodoProps> = ({ state, error: errorParent, onSubmit }) => {
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
        if (state === REQUEST_STATES.SUCCESS) {
            setError('');
            setText('')
        }
    }


    useEffect(handleParentError, [errorParent]);
    useEffect(handleSuccess, [state]);

    return (
        <section className={styles.container}>
            <Icon action={ACTIONS.ADD} onClick={handleNewToDo} isLoading={state === REQUEST_STATES.PENDING} />
            <Input
                value={text}
                variation={INPUT_VARIATIONS.NAKED}
                placeholder="¿Qué hay pa' hacer?"
                onChange={handleChangeText}
                onEnter={handleNewToDo}
                error={error}
            />
        </section>
    );
}

export { FormTodo };