import React from 'react';
import ButtonMaterial from '@material-ui/core/Button';

import styles from './Button.module.scss';

export type IButtonProps = {
  text: string,
  isLoading?: boolean;
}

const Button: React.FC<IButtonProps> = ({ text, isLoading }) => {
  return (
    <ButtonMaterial
      variant="contained" 
      color="primary"
      className={`${isLoading && styles.loading}`}
    >
      {text}
    </ButtonMaterial>
  );
}

export { Button };