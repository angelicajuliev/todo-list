import React, { useCallback, useEffect } from "react";
import { Home as HomeTemplate } from "../components/templates/home/Home";
import { useTodoContext } from "../context/TodoContext";
import { ToDo } from "../models/Todo";

export type IHomeProps = {};

const Home: React.FC<IHomeProps> = ({}) => {
  const { todos, formState, initialize, addTodo, updateTodo, deleteTodo } = useTodoContext();
  const handleAdd = useCallback((todo: ToDo) => addTodo && addTodo(todo), []);
  const handleUpdate = useCallback((todo: ToDo) => updateTodo && updateTodo(todo), []);
  const handleDelete = useCallback((todo: ToDo) => deleteTodo && deleteTodo(todo), []);

  useEffect(() => {
    initialize && initialize();
  }, []);

  return (
    <HomeTemplate
      todos={todos}
      formState={formState}
      onAdd={handleAdd}
      onDelete={handleDelete}
      onUpdate={handleUpdate}
    />
  );
};

export { Home };
