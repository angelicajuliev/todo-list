import React from 'react';

import { ToDo } from '../../models/Todo';
import { Todo } from '../todo/Todo';

export type ITodoListProps = {
    todos: ToDo[]
}

const TodoList: React.FC<ITodoListProps> = ({ todos }) => {
    return <> {todos.map((todo) => <Todo key={todo.id} {...todo} />)}</>;
}

export { TodoList };