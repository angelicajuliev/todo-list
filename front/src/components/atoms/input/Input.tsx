import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import InputBase from '@material-ui/core/InputBase';

export enum INPUT_VARIATIONS {
    OUTLINE = 'outline',
    NAKED = 'naked'
}

export type inputVariation = INPUT_VARIATIONS;

export type IInputProps = {
    label?: string;
    value?: string;
    placeholder?: string;
    error?: string;
    onChange?(value: string): void;
    onEnter(): void;
    variation?: inputVariation
}

const Input: React.FC<IInputProps> = (props) => {
    const {
        error,
        label,
        placeholder,
        onChange,
        onEnter,
        variation = INPUT_VARIATIONS.OUTLINE,
        value: valueParent
    } = props;
    const [value, setValue] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setValue(value)
        onChange && onChange(value)
    }

    const handleKeyUp = (e: any) => {
        const ENTER_KEY = 13;
        if (e.keyCode === ENTER_KEY) onEnter()
    };

    const handleChangeValueParent = () => {
        setValue(valueParent ?? '')
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
            />
        ),
        [INPUT_VARIATIONS.NAKED]: (
            <InputBase
                value={value}
                placeholder={placeholder}
                onChange={handleChange}
                onKeyUp={handleKeyUp}
            />
        )
    }
    return inputVariation[variation];
}

export { Input };