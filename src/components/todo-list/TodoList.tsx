import React from 'react';
import { Todo } from '../todo/Todo';

export type ITodoListProps = {

}

const TodoList: React.FC<ITodoListProps> = ({ }) => {
    return (
        <Todo isCompleted={true} name="Probando" />
    );
}

export { TodoList };