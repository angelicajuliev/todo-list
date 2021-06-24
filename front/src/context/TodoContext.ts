import React, { createContext, FC, useContext, useReducer } from "react";
import { ToDo } from "../models/Todo";
import api from "../api/todo.api";
import { RequestState } from "../models/App";

export type TodoState = {
  todos: ToDo[];
  formState?: RequestState;

  addTodo?(todo: ToDo): void;
  updateTodo?(todo: ToDo): void;
  deleteTodo?(todo: ToDo): void;
};

export enum TODO_ACTIONS {
  ADD_TODO = "add_todo",
  UPDATE_TODO = "update_todo",
  DELETE_TODO = "delete_todo",
}

type ToDoAction = TODO_ACTIONS;
export type Action = { type: ToDoAction; payload: any };

export const ToDoReducer = (state: TodoState, action: Action): TodoState => {
  const todo = action.payload;
  let todos = state.todos;
  switch (action.type) {
    case TODO_ACTIONS.ADD_TODO:
      todos = [...todos, todo];
      return { ...state, todos };

    case TODO_ACTIONS.UPDATE_TODO:
      todos = todos.map((t) => (t.id === todo.id ? todo : t));
      return { ...state, todos };

    case TODO_ACTIONS.DELETE_TODO:
      todos = todos.filter((t) => t.id !== todo.id);
      return { ...state, todos };

    default:
      return { ...state };
  }
};

export const ToDoActions: any = {
  addTodo: (dispatch: React.Dispatch<Action>) => {
    return async (todo: ToDo) => {
      const result = await api.get<ToDo>("/todo");
      dispatch({ type: TODO_ACTIONS.ADD_TODO, payload: result.data });
    };
  },
  // updateTodo?(todo: ToDo): void;
  // deleteTodo?(todo: ToDo): void;
};

export const ToDoInitialValues = { todos: [] };
export const ToDoContext = createContext<TodoState>(ToDoInitialValues);
export const useTodoContext = () => useContext(ToDoContext);
