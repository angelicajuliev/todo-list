import React, { useEffect, useRef, useState } from "react";

import { ToDo } from "../../../models/Todo";
import { Input, INPUT_VARIATIONS } from "../../atoms/input/Input";
import { ACTIONS, Icon } from "../../atoms/icon/Icon";

import styles from "./FormTodo.module.scss";
import { RequestState, REQUEST_STATES } from "../../../models/App";

export type IFormTodoProps = {
  state?: RequestState;
  error?: string;
  onSubmit(todo: ToDo): void;
  className?: string;
};

const FormTodo: React.FC<IFormTodoProps> = (props) => {
  const { state, error: errorParent, onSubmit, className } = props;
  const [text, setText] = useState<string>("");
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>();

  const handleChangeText = (value: string) => {
    setText(value);
  };

  const handleSubmitToDo = (e: any) => {
    e.preventDefault();

    if (isLoading) return;
    if (!text) {
      setError("Escribe tu pendiente");
      inputRef?.current && inputRef.current.focus();
      return;
    }

    const todo: ToDo = { id: "", text, isCompleted: false };
    setLoading(true);
    setError("");
    onSubmit(todo);
  };

  const handleParentError = () => setError(errorParent ?? "");

  const handleStateChange = () => {
    setLoading(state === REQUEST_STATES.PENDING);
    if (state === REQUEST_STATES.SUCCESS) {
      setError("");
      setText("");
    }
  };

  useEffect(handleParentError, [errorParent]);
  useEffect(handleStateChange, [state]);

  return (
    <form
      className={`${styles.container} ${className}`}
      onSubmit={handleSubmitToDo}
    >
      <Icon type="submit" action={ACTIONS.ADD} isLoading={isLoading} />
      <Input
        value={text}
        label="Agregar una tarea"
        variation={INPUT_VARIATIONS.NAKED}
        placeholder="Agregar una tarea"
        onChange={handleChangeText}
        error={error}
        ref={inputRef}
        autoFocus={true}
      />
    </form>
  );
};

export { FormTodo };
