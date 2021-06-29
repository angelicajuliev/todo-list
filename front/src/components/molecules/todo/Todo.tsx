import React, { useState } from "react";
import { useEffect } from "react";
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
    text,
    onComplete,
    onDelete,
    onChange,
  } = props;
  const [isCompleted, setIsCompleted] = useState<boolean>(isCompletedParent);
  const [textUpdate, setTextUpdate] = useState(text);
  const debouncedText = useDebounce(textUpdate, 500);

  const handleComplete = (isComplete: boolean) => {
    setIsCompleted(isComplete);
    onComplete(isComplete);
  };

  const handleDebounce = () => {
    if (debouncedText) {
      onChange(textUpdate);
    }
  };

  const handleDrag = () => console.log("Drag and drop");
  const handleEdit = () => onChange(textUpdate);
  const handleChange = (value: string) => setTextUpdate(value);
  const handleDeleteItem = () => onDelete();
  const handleCompletedParent = () => setIsCompleted(isCompletedParent);
  const handleChangeText = () => setTextUpdate(text);

  useEffect(handleCompletedParent, [isCompletedParent]);
  useEffect(handleChangeText, [text]);
  useEffect(handleDebounce, [debouncedText]);

  const todoText = isCompleted ? (
    <p className={styles.todoCompleted}>{text}</p>
  ) : (
    <Input
      variation={INPUT_VARIATIONS.NAKED}
      onEnter={handleEdit}
      onChange={handleChange}
      value={text}
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
      <Checkbox isChecked={isCompleted} onChange={handleComplete} name={text} />
      {todoText}
      <Icon action={ACTIONS.DELETE} onClick={handleDeleteItem} />
    </article>
  );
};

export { Todo };
