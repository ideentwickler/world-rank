import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import styles from './CountryModal.module.css'
import Modal from '@material-ui/core/Modal';
import IconButton from "@material-ui/core/IconButton";

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `50%`,
        left: `50%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

function getTranslations (props)  {
    const value = props.country.translations;
    /* https://stackoverflow.com/questions/40803828/reactjs-map-through-object
    *  value ist kein Array => Object! Über Entries extrahieren, dann mappen!
    * */
    const listitems = Object.entries(value);
    const valueItems = listitems.map((key, value) => <div key={key}>
        <div>Language Code: {key}</div>
        <div>Translation: {value}</div>
    </div>)
    return valueItems;
}

export default function SimpleModal(props) {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const listTranslations = ({props}) => {
        const value = props.country;
        console.log("test");
        const listItems = value.translations.map((st, sx) => <div>
            {st} - {sx}
        </div>)
        return listItems;
    };

    const body = (
        <div className={styles.modal_container}>
            <h2 className={styles.details_panel_heading}>{props.country.name}</h2>
            <div className={styles.details_panel_value}>
                {props.country.name}
                {getTranslations(props)}
            </div>
        </div>
    );

    return (
        <div>
            <button type="button" onClick={handleOpen}>
                Click me
            </button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    );
}