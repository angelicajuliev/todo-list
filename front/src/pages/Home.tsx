import React, { useCallback } from "react";
import { Home as HomeTemplate } from "../components/templates/home/Home";
import { useTodoContext } from "../context/TodoContext";
import { ToDo } from "../models/Todo";

export type IHomeProps = {};

const Home: React.FC<IHomeProps> = ({}) => {
  const { todos, formState, addTodo } = useTodoContext();
  const handleAdd = useCallback((todo: ToDo) => addTodo && addTodo(todo), []);
  const handleAction = (todo: ToDo) => console.log(todo);

  return (
    <HomeTemplate
      todos={todos}
      formState={formState}
      onAdd={handleAdd}
      onDelete={handleAction}
      onUpdate={handleAction}
    />
  );
};

export { Home };
