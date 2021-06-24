import React, { useState } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import SelectMaterial from '@material-ui/core/Select';

export interface Option {
    value: string;
    text?: string;
}

export type ISelectProps = {
    id?: string;
    label?: string;
    onChange(value: string): void;
    options: Option[];
}

const Select: React.FC<ISelectProps> = (props) => {
    const { id = 'cmb', label, onChange, options } = props;
    const [value, setValue] = useState<string>();

    const handleChange = (_: any, value: any) => setValue(value)

    const optionsItems = options.map(({ value, text }) => (
        <MenuItem key={value} value={value}> {text ?? value} </MenuItem>)
    )

    return (
        <FormControl>
            <InputLabel id={`${id}-label`}>{label}</InputLabel>
            <SelectMaterial
                labelId={`${id}-label`}
                id={id}
                value={value}
                onChange={handleChange}
            >
                {optionsItems}
            </SelectMaterial>
        </FormControl>
    );
}

export { Select };