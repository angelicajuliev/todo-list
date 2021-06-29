import React, { Ref, useEffect, useRef, useState } from "react";
import TextField from "@material-ui/core/TextField";
import InputBase from "@material-ui/core/InputBase";

export enum INPUT_VARIATIONS {
  OUTLINE = "outline",
  NAKED = "naked",
}

export type inputVariation = INPUT_VARIATIONS;

export type IInputProps = {
  label?: string;
  value?: string;
  placeholder?: string;
  error?: string;
  onChange?(value: string): void;
  onEnter?(): void;
  variation?: inputVariation;
  ref?: React.Ref<any>;
  ariaInvalid?: boolean;
  autoFocus?: boolean;
};

const Input: React.FC<IInputProps> = React.forwardRef(
  (props, ref: Ref<HTMLInputElement>) => {
    const {
      error,
      label,
      placeholder,
      onChange,
      onEnter,
      variation = INPUT_VARIATIONS.OUTLINE,
      value: valueParent,
    } = props;
    const [value, setValue] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setValue(value);
      onChange && onChange(value);
    };

    const handleKeyUp = (e: any) => {
      const ENTER_KEY = 13;
      if (e.keyCode === ENTER_KEY) onEnter && onEnter();
    };

    const handleChangeValueParent = () => {
      setValue(valueParent ?? "");
    };

    useEffect(handleChangeValueParent, [valueParent]);

    const inputVariation = {
      [INPUT_VARIATIONS.OUTLINE]: (
        <TextField
          error={!!error}
          value={value}
          label={label}
          variant="outlined"
          placeholder={placeholder}
          onKeyUp={handleKeyUp}
          onChange={handleChange}
          helperText={error}
          inputRef={ref}
        />
      ),
      [INPUT_VARIATIONS.NAKED]: (
        <div>
          <InputBase
            value={value}
            {...props}
            inputRef={ref}
            error={!!error}
            aria-label={label}
            style={{width: '100%'}}
            onKeyUp={handleKeyUp}
            onChange={handleChange}
          />
          {error && <p style={{color: 'red'}}>{error}</p>}
        </div>
      ),
    };
    return inputVariation[variation];
  }
);

export { Input };
