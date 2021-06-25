import React, { useState } from "react";
import { useEffect } from "react";

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

  const handleComplete = (isComplete: boolean) => {
    setIsCompleted(isComplete);
    onComplete(isComplete);
  };

  const handleDrag = () => console.log("Drag and drop");

  const handleEdit = () =>  onChange(text);

  const handleChange = (value: string) =>  onChange(value);

  const handleDeleteItem = () => onDelete();

  const handleCompletedParent = () => setIsCompleted(isCompletedParent);

  useEffect(handleCompletedParent, [isCompletedParent]);

  const todoText = isCompleted ? (
    <p className={styles.todoCompleted}>{text}</p>
  ) : (
    <Input
      variation={INPUT_VARIATIONS.NAKED}
      onEnter={handleEdit}
      onChange={handleChange}
      value={text}
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
