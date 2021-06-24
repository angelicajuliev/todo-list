import React from 'react';
import TextField from '@material-ui/core/TextField';

export type IInputProps = {
    label: string;
}

const Input: React.FC<IInputProps> = ({label }) => {
    return (
        <TextField id="outlined-basic" label={label} variant="outlined" />
    );
}

export { Input };