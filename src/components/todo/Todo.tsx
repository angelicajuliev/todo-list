import React, { FC } from 'react'
import { Checkbox } from '../checkbox/Checkbox'

export type ITodoProps = {
    isCompleted: boolean;
    name: string;
}

const Todo: React.FC<ITodoProps> = (props) => {
    const { isCompleted, name } = props;
    const handleChange = () => console.log('testing change');

    return (
        <article>
            <Checkbox isChecked={isCompleted} label="My first todo item" onChange={handleChange} />
        </article>
    );
}

export { Todo };