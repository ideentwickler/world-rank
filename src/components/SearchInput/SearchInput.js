import SearchRounded from '@material-ui/icons/SearchRounded';
import styles from './SearchInput.module.css'
import React from "react";

/* parameter immer innerhalb {} klammern! */
const SearchInput = ({...rest}) => {
    return (
        <div className={styles.wrapper}>
            <SearchRounded color="inherit"/>
            <input className={styles.input}  {...rest} />
        </div>
    );
};

export default SearchInput;