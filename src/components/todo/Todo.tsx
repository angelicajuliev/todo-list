import React, { FC, useState } from 'react'
import { useEffect } from 'react';

import { Checkbox } from '../checkbox/Checkbox'
import { ACTIONS, Icon } from "../icon/Icon";
import { Input, INPUT_VARIATIONS } from '../input/Input';

import styles from './Todo.module.scss'

export type ITodoProps = {
    isCompleted: boolean;
    text: string;
}

const Todo: React.FC<ITodoProps> = (props) => {
    const { isCompleted: isCompletedParent, text } = props;
    const [isCompleted, setIsCompleted] = useState<boolean>(isCompletedParent);

    const handleComplete = (isComplete: boolean) => setIsCompleted(isComplete);
    const handleDrag = () => console.log('Drag and drop')
    const handleEdit = () => console.log('Editar')
    const handleDeleteItem = () => console.log('Eliminar')
    const handleCompletedParent = () => setIsCompleted(isCompletedParent)

    useEffect(handleCompletedParent, [isCompletedParent])

    const todoText = (
        isCompleted ?
            <p className={styles.todoCompleted}>{text}</p> :
            <Input variation={INPUT_VARIATIONS.NAKED} onEnter={handleEdit} value={text} />
    )

    return (
        <article className={styles.container}>
            <Icon action={ACTIONS.DRAG_DROP} onClick={handleDrag} className={styles.dragDropIcon} />
            <Checkbox isChecked={isCompleted} onChange={handleComplete} />
            {todoText}
            <Icon action={ACTIONS.DELETE} onClick={handleDeleteItem} />
        </article>
    );
}

export { Todo };