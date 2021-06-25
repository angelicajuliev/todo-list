import React from 'react';
import styles from './Header.module.scss';

export type IHeaderProps = {

}

const Header: React.FC<IHeaderProps> = ({ }) => {
    return (
        <header className={styles.container}>
            <h1 className={styles.title}>Mi ToDo List</h1>
        </header>
    );
}

export { Header };