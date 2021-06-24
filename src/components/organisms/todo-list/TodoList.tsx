import React from 'react';

import { ToDo } from '../../../models/Todo';
import { Todo } from '../../molecules/todo/Todo';

export type ITodoListProps = {
    todos: ToDo[]
}

const TodoList: React.FC<ITodoListProps> = ({ todos }) => {
    const emptyState = <h5>No tienes tareas pendientes por hacer</h5>
    const todosEl = <> {todos.map((todo) => <Todo key={todo.id} {...todo} />)}</>;

    return todos.length > 0 ? todosEl : emptyState;
}

export { TodoList };