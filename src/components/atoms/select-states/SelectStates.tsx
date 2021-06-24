import React from 'react';
import { Select } from '../select/Select';

export enum FILTER_STATES {
    WITHOUT_FILTER = 'without',
    COMPLETED = 'completed',
    PENDING = 'pending'
}

export type ISelectStatesProps = {
    className?: string,
    onChange?(isCompleted?: boolean): void;
}

const SelectStates: React.FC<ISelectStatesProps> = ({ className, onChange }) => {
    const states = [
        { value: FILTER_STATES.WITHOUT_FILTER, text: 'Todos' },
        { value: FILTER_STATES.COMPLETED, text: 'Completado' },
        { value: FILTER_STATES.PENDING, text: 'Por hacer' },
    ]

    const handleFilterToDos = (value: string) => {
        const isCompleted = value == FILTER_STATES.COMPLETED;
        const isWithoutFilter = value === FILTER_STATES.WITHOUT_FILTER
        onChange && onChange(isWithoutFilter ? undefined : isCompleted)
    }

    return <Select className={className} label="Filtro" options={states} onChange={handleFilterToDos} />;
}

export { SelectStates };