import React, { useCallback, useEffect, useState } from "react";

import { ToDo } from "../../../models/Todo";
import { RequestState  } from "../../../models/App";
import { TodoList } from "../../organisms/todo-list/TodoList";

import { Header } from "../../atoms/header/Header";
import { SelectStates } from "../../atoms/select-states/SelectStates";
import { FormTodo } from "../../molecules/form-todo/FormTodo";

import styles from "./Home.module.scss";

export type IHomeProps = {
  todos: ToDo[];
  formState?: RequestState;
  onAdd(todo: ToDo): void;
  onUpdate(todo: ToDo): void;
  onDelete(todo: ToDo): void;
};

const Home: React.FC<IHomeProps> = (props) => {
  const { todos, formState, onAdd, onUpdate, onDelete } = props;
  const [shownToDos, setFilteredToDos] = useState<ToDo[]>([]);
  const [isFilteredCompleted, setFilterCompleted] = useState<boolean>();

  const _filterToDos = () => {
    if (isFilteredCompleted === undefined) {
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

  const handleAddToDo = useCallback((todo: ToDo) => {
    onAdd(todo);
  }, []);

  const handleDeleteToDo = (todo: ToDo) => onDelete(todo);
  const handleUpdateToDo = (todo: ToDo) => onUpdate(todo);
  const handleFilterToDos = (value?: boolean) => setFilterCompleted(value);

  const handleUpdateToDos = () =>  _filterToDos();

  useEffect(handleUpdateToDos, [todos, isFilteredCompleted]);

  const emptyEl = (
    <h6>
      {isFilteredCompleted
        ? "No tienes tareas completadas"
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
        <FormTodo className={styles.form} state={formState} onSubmit={handleAddToDo} />
        <article className={styles.content}>{shownToDos.length === 0 ? emptyEl : listEl}</article>
      </main>
    </section>
  );
};

export { Home };
