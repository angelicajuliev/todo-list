import React, { useEffect, useState } from "react";

import { getRandomNumber } from "../../../util";
import { ToDo } from "../../../models/Todo";
import { RequestState, REQUEST_STATES } from "../../../models/App";
import { TodoList } from "../../organisms/todo-list/TodoList";

import { Header } from "../../atoms/header/Header";
import { SelectStates } from "../../atoms/select-states/SelectStates";
import { FormTodo } from "../../molecules/form-todo/FormTodo";

import styles from "./Home.module.scss";

export type IHomeProps = {};

const Home: React.FC<IHomeProps> = ({}) => {
  const [todos, setTodos] = useState<ToDo[]>([]);
  const [shownToDos, setFilteredToDos] = useState<ToDo[]>([]);
  const [newToDoState, setNewToDoState] = useState<RequestState>();
  const [isFilteredCompleted, setFilterCompleted] = useState<boolean>();

  const _filterToDos = () => {
    if (isFilteredCompleted == undefined) {
      setFilteredToDos(todos);
      return;
    }

    if (isFilteredCompleted) {
      const filtered = todos.filter((todo) => todo.isCompleted);
      setFilteredToDos(filtered);
      return;
    }

    const filtered = todos.filter((todo) => !todo.isCompleted);
    setFilteredToDos(filtered);
  };

  const handleAddToDo = (todo: ToDo) => {
    setNewToDoState(REQUEST_STATES.PENDING);
    const todoUpdated = { ...todo, order: todos.length, id: getRandomNumber() };
    setTodos([...todos, todoUpdated]);

    setTimeout(() => {
      setNewToDoState(REQUEST_STATES.SUCCESS);
    }, 150);
  };

  const handleDeleteToDo = (todo: ToDo) => {
    const todosUpdated = todos.filter((t) => t.id !== todo.id);
    setTodos(todosUpdated);
  };

  const handleUpdateToDo = (todo: ToDo) => {
    const todosUpdated = todos.map((t) => (t.id === todo.id ? todo : t));
    setTodos(todosUpdated);
  };

  const handleFilterToDos = (value?: boolean) => setFilterCompleted(value);

  const handleUpdateToDos = () => {
    _filterToDos();
  };

  useEffect(handleUpdateToDos, [todos, isFilteredCompleted]);

  const emptyEl = (
    <h6>
      {isFilteredCompleted
        ? "No has completado tareas"
        : isFilteredCompleted === undefined
        ? "No has agregado tareas para hacer"
        : "No tienes tareas por hacer"}{" "}
    </h6>
  );
  const listEl = (
    <TodoList
      todos={shownToDos}
      onUpdateToDo={handleUpdateToDo}
      onDeleteToDo={handleDeleteToDo}
    />
  );

  return (
    <section>
      <Header />
      <main className={styles.container}>
        <SelectStates className={styles.filter} onChange={handleFilterToDos} />
        {shownToDos.length === 0 ? emptyEl : listEl}
        <FormTodo state={newToDoState} onSubmit={handleAddToDo} />
      </main>
    </section>
  );
};

export { Home };
