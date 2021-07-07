import React, { useState, useEffect } from "react";
import useDebounce from "../../../hooks/useDebounce";

import { Checkbox } from "../../atoms/checkbox/Checkbox";
import { ACTIONS, Icon } from "../../atoms/icon/Icon";
import { Input, INPUT_VARIATIONS } from "../../atoms/input/Input";

import styles from "./Todo.module.scss";

export type ITodoProps = {
  isCompleted: boolean;
  text: string;
  onComplete(isComplete: boolean): void;
  onDelete(): void;
  onChange(text: string): void;
};

const Todo: React.FC<ITodoProps> = (props) => {
  const {
    isCompleted: isCompletedParent,
    text: todoText,
    onComplete,
    onDelete,
    onChange,
  } = props;
  const SECONDS_TO_UPDATE = 1000 * 1;
  const [isCompleted, setIsCompleted] = useState<boolean>(isCompletedParent);
  const [textUpdate, setTextUpdate] = useState(todoText);
  const [isFirstTime, setFirstTime] = useState(true);
  const debouncedText = useDebounce(textUpdate, SECONDS_TO_UPDATE);

  const handleComplete = (isComplete: boolean) => {
    setIsCompleted(isComplete);
    onComplete(isComplete);
  };

  const handleDebounce = () => {
    if (debouncedText && !isFirstTime) {
      onChange(textUpdate);
    }
  };

  const handleDrag = () => console.log("Drag and drop");

  const handleEdit = () => {
    setFirstTime(true);
    onChange(textUpdate);
  };

  const handleChange = (value: string) => {
    setFirstTime(false);
    setTextUpdate(value);
  };

  const handleDeleteItem = () => onDelete();

  const handleCompletedParent = () => setIsCompleted(isCompletedParent);

  const handleChangeText = () => setTextUpdate(todoText);

  useEffect(handleCompletedParent, [isCompletedParent]);
  useEffect(handleChangeText, [todoText]);
  useEffect(handleDebounce, [debouncedText]);

  const todoTextEl = isCompleted ? (
    <p className={styles.todoCompleted}>{todoText}</p>
  ) : (
    <Input
      variation={INPUT_VARIATIONS.NAKED}
      onEnter={handleEdit}
      onChange={handleChange}
      value={textUpdate}
      label="tarea por hacer"
    />
  );

  return (
    <article className={styles.container}>
      <Icon
        action={ACTIONS.DRAG_DROP}
        onClick={handleDrag}
        className={styles.dragDropIcon}
      />
      <Checkbox
        isChecked={isCompleted}
        onChange={handleComplete}
        name={todoText}
      />
      {todoTextEl}
      <Icon action={ACTIONS.DELETE} onClick={handleDeleteItem} />
    </article>
  );
};

export { Todo };
