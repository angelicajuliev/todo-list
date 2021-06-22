export type ButtonType = 'button' | 'submit' | 'reset';
export type ButtonVariation =
  | 'transparent'
  | 'link'
  | 'primary'
  | 'secondary'
  | 'primary-outline'
  | 'secondary-outline'
  | 'icon';

export type ButtonProps = {
  variation: ButtonVariation;
  text?: string;
  className?: string;
  onClick?(e?: Event): void;
  isDisabled?: boolean;
  type?: ButtonType;
};
