import React from 'react';
import ButtonMaterial from '@material-ui/core/Button';

import styles from './Button.module.scss';

export type IButtonProps = {
  text: string
}

const Button: React.FC<IButtonProps> = ({ text }) => {
  return (
    <ButtonMaterial variant="contained" color="primary">
      {text}
    </ButtonMaterial>
  );
}

export { Button };