import React, { useEffect, useState } from 'react';
import CheckboxMaterial from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export type ICheckboxProps = {
    isChecked: boolean;
    name?: string;
    label?: string;
    onChange(value: boolean): void;
}

const Checkbox: React.FC<ICheckboxProps> = ({ isChecked, name, label, onChange }) => {
    const [value, setValue] = useState<boolean>();

    const handleChange = (_: any, checked: boolean) => {
        setValue(checked)
        onChange(checked);
    }

    const handleChangeFromParent = () => setValue(isChecked)

    useEffect(() => handleChangeFromParent, [isChecked]);

    return (
        <div>
            <FormControlLabel
                control={<CheckboxMaterial checked={value} onChange={handleChange} name={name} />}
                label={label}
            />

        </div>
    );
}

export { Checkbox };