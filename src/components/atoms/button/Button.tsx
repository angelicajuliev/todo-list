import { FC } from 'react';
import styles from './Button.module.scss';
import { ButtonProps } from './Button.types';

const Button: FC<ButtonProps> = (props): JSX.Element => {
  const { variation, text, className, onClick, children, isDisabled, type } = props;

  const handleClick = (event: any) => onClick && onClick(event);

  return (
    <button
      onClick={handleClick}
      className={`${styles[variation]} ${className}`}
      disabled={isDisabled}
      type={type}
    >
      {text}
      {children}
    </button>
  );
};

export default Button;
