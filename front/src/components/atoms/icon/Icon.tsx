import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import SaveIcon from '@material-ui/icons/Save';

import styles from './Icon.module.scss'

export enum ACTIONS {
    SAVE = 'save',
    ADD = 'add',
    DELETE = 'delete',
    EDIT = 'edit',
    DRAG_DROP = 'drag_drop',
}

export type typeActions = ACTIONS

export type IIconProps = {
    className?: string;
    type?: "button" | "submit" | "reset";
    isLoading?: boolean;
    action: typeActions;
    onClick?(): void;
}

const Icon: React.FC<IIconProps> = (props) => {
    const { action, onClick, isLoading, className, type } = props;

    const handleClick = () => onClick && onClick()

    const icons = {
        [ACTIONS.SAVE]: <SaveIcon />,
        [ACTIONS.DELETE]: <DeleteIcon />,
        [ACTIONS.EDIT]: <EditIcon />,
        [ACTIONS.DRAG_DROP]: <DragIndicatorIcon />,
        [ACTIONS.ADD]: <AddIcon aria-label="Agregar" />,
    }

    return (
        <IconButton aria-label={action} type={type} color="primary" onClick={handleClick} className={`${className} ${isLoading && styles.loading}`} disabled={isLoading}>
            {icons[action]}
        </IconButton>
    );
}

export { Icon };