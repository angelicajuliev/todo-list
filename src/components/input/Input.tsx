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

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => onChange && onChange(event.target.value)

    const handleKeyUp = (e: any) => {
        const ENTER_KEY = 13;
        if (e.keyCode === ENTER_KEY) onEnter()
    };

    useEffect(() => { setValue(valueParent ?? '') }, [valueParent]);

    const inputVariation = {
        [INPUT_VARIATIONS.OUTLINE]: (
            <TextField
                onKeyUp={handleKeyUp}
                error={!!error}
                defaultValue={value}
                label={label}
                variant="outlined"
                placeholder={placeholder}
                onChange={handleChange}
                helperText={error}
            />
        ),
        [INPUT_VARIATIONS.NAKED]: (
            <InputBase defaultValue={value} onChange={handleChange} />
        )
    }
    return inputVariation[variation];
}

export { Input };