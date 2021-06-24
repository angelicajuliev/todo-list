import React, { useReducer } from "react";

import { TodoState, Action, ToDoActions, ToDoInitialValues } from "./TodoContext";

export type ITodoProviderProps = {
  Context: React.Context<TodoState>;
  reducer: (state: TodoState, action: Action) => TodoState;
  initialValues?: TodoState;
};

const TodoProvider: React.FC<ITodoProviderProps> = (props) => {
  const { Context, reducer, initialValues, children } = props;
  const [state, dispatch] = useReducer(reducer, initialValues ?? ToDoInitialValues);
  const actions: any = {};
  for (const key in ToDoActions) {
    actions[key] = ToDoActions[key](dispatch);
  }

  return (
    <Context.Provider value={{ ...state, ...actions }}>
      {children}
    </Context.Provider>
  );
};

export { TodoProvider };
