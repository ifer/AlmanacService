import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles({
    container: {
        flexGrow: 1,
        maxWidth: '500px',
    },
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
    title: {
        color: 'darkred',
    },
    closeButton: {
        margin: '10px',
    },
});

const Celebrators = ({ dayNames, onClose }) => {
    const classes = useStyles();

    const handleClose = () => {
        onClose();
    };

    const renderDayNames = () => {
        // console.log(`CELEBRATORS dayNames=${JSON.stringify(dayNames)}`);
        return (
            <List>
                {dayNames.map((name) => (
                    <ListItem button onClick={() => console.log(name)} key={name}>
                        <ListItemAvatar>
                            <Avatar className={classes.avatar}>
                                <PersonIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={name} />
                    </ListItem>
                ))}
            </List>
        );
    };

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={true}>
            <Grid container justify="center" className={classes.container}>
                <Grid item container justify="center" className={classes.title}>
                    <DialogTitle id="simple-dialog-title">Πιθανά ονόματα που εορτάζουν σήμερα</DialogTitle>
                </Grid>
                <Grid item container justify="center">
                    {dayNames.length > 0 && renderDayNames()}
                </Grid>
                <Grid item container justify="center">
                    {dayNames.length === 0 && (
                        <Typography paragraph variant="body1">
                            Δεν υπάρχουν γνωστά ονόματα εορταζόντων.
                        </Typography>
                    )}
                </Grid>
                <Grid item container alignItems="center" justify="flex-end">
                    <Button variant="contained" onClick={handleClose} className={classes.closeButton}>
                        ΟΚ
                    </Button>
                </Grid>
            </Grid>
        </Dialog>
    );
};

export default Celebrators;
