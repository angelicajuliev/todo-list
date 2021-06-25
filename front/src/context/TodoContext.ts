import React, { createContext, FC, useContext, useReducer } from "react";
import { ToDo } from "../models/Todo";
import api from "../api/todo.api";
import { RequestState, REQUEST_STATES } from "../models/App";

export type TodoState = {
  todos: ToDo[];
  formState?: RequestState;

  initialize?(): void;
  addTodo?(todo: ToDo): void;
  updateTodo?(todo: ToDo): void;
  deleteTodo?(todo: ToDo): void;
};

export enum TODO_ACTIONS {
  INITIALIZE_PAGE = "init_todos",
  INIT_REQUEST_ADD_TODO = "initialize request to add_todo",
  ADD_TODO = "add_todo",
  UPDATE_TODO = "update_todo",
  DELETE_TODO = "delete_todo",
}

type ToDoAction = TODO_ACTIONS;
export type Action = { type: ToDoAction; payload: any };

export const ToDoReducer = (
  state: TodoState,
  { type, payload }: Action
): TodoState => {
  let todos = state.todos;
  switch (type) {
    case TODO_ACTIONS.INITIALIZE_PAGE:
      return { ...state, todos: payload };

    case TODO_ACTIONS.INIT_REQUEST_ADD_TODO:
      return { ...state, formState: REQUEST_STATES.PENDING };

    case TODO_ACTIONS.ADD_TODO:
      todos = [...todos, payload];
      return { ...state, todos, formState: REQUEST_STATES.SUCCESS };

    case TODO_ACTIONS.UPDATE_TODO:
      todos = todos.map((t) => (t.id === payload.id ? payload : t));
      return { ...state, todos };

    case TODO_ACTIONS.DELETE_TODO:
      todos = todos.filter((t) => t.id !== payload.id);
      return { ...state, todos };

    default:
      return { ...state };
  }
};

export const ToDoActions: any = {
  initialize: (dispatch: React.Dispatch<Action>) => {
    return async () => {
      const result = await api.get<ToDo[]>("/todo");
      dispatch({ type: TODO_ACTIONS.INITIALIZE_PAGE, payload: result.data });
    };
  },
  addTodo: (dispatch: React.Dispatch<Action>) => {
    return async (toDo: ToDo) => {
      const result = await api.post<ToDo>("/todo", toDo);
      dispatch({ type: TODO_ACTIONS.ADD_TODO, payload: result.data });
    };
  },
  deleteTodo: (dispatch: React.Dispatch<Action>) => {
    return async (toDo: ToDo) => {
      await api.delete<ToDo>(`/todo/${toDo.id}`);
      dispatch({ type: TODO_ACTIONS.DELETE_TODO, payload: toDo });
    };
  },
  updateTodo: (dispatch: React.Dispatch<Action>) => {
    return async (toDo: ToDo) => {
      const result = await api.put<ToDo>(`/todo/${toDo.id}`, toDo);
      dispatch({ type: TODO_ACTIONS.UPDATE_TODO, payload: result });
    };
  },
};

export const ToDoInitialValues = { todos: [] };
export const ToDoContext = createContext<TodoState>(ToDoInitialValues);
export const useTodoContext = () => useContext(ToDoContext);
