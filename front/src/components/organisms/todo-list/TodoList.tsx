import React from "react";

import { ToDo } from "../../../models/Todo";
import { Todo } from "../../molecules/todo/Todo";

export type ITodoListProps = {
  todos: ToDo[];
  onUpdateToDo(todo: ToDo): void;
  onDeleteToDo(todo: ToDo): void;
};

const TodoList: React.FC<ITodoListProps> = ({
  todos,
  onDeleteToDo,
  onUpdateToDo,
}) => {
  const handleComplete = (todo: ToDo, isCompleted: boolean) => {
    onUpdateToDo({ ...todo, isCompleted });
  };

  const handleChangeText = (todo: ToDo, text: string) => {
    onUpdateToDo({ ...todo, text });
  };

  const handleDelete = (todo: ToDo) => {
    onDeleteToDo(todo);
  };

  return (
    <>
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          {...todo}
          onComplete={(e) => handleComplete(todo, e)}
          onChange={(e) => handleChangeText(todo, e)}
          onDelete={() => handleDelete(todo)}
        />
      ))}
    </>
  );
};

export { TodoList };
