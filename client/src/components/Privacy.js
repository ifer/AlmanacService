import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';

const useStyles = makeStyles({
    h1: {
        color: 'darkred',
        fontSize: '2em',
        fontWeight: '700',
        marginTop: '0px',
        textAlign: 'center',
    },
    h2: {
        color: 'darkred',
        fontSize: '1.8em',
    },
    h3: {
        color: 'darkblue',
        fontSize: '1.6em',
    },
    wizardScreen: {
        color: 'darkgreen',
        fontSize: '1.2em',
    },
});

const Privacy = (props) => {
    const classes = useStyles();
    // console.log(props);
    return (
        <>
            <div style={{ fontFamily: '"Times New Roman", Times, serif', fontSize: '1.5em' }}>
                <IconButton
                    size="medium"
                    onClick={() => {
                        props.history.push('/');
                    }}
                >
                    <KeyboardBackspaceIcon style={{ fontSize: '50px', color: 'black', marginLeft: '-20px' }} />
                </IconButton>
                <h3 className={classes.h3}>Ημεροδείκτης: Πολιτική Απορρήτου</h3>
                <div>
                    Η εφαρμογή "Ημεροδείκτης" δηλώνει ότι δεν αποθηκεύει και δεν χρησιμοποιεί κατά κανένα τρόπο το
                    σύνολο ή μέρος των στοιχείων των επαφών του χρήστη ούτε οποιοδήποτε άλλο από τα προσωπικά δεδομένα
                    του, όπως ηλεκτρονική αλληλογραφία κλπ.
                </div>

                <div style={{ textAlign: 'center', marginTop: '40px', marginBottom: '20px' }}>
                    <EventAvailableIcon style={{ fontSize: '30px' }} />
                    <EventAvailableIcon style={{ fontSize: '30px' }} />
                    <EventAvailableIcon style={{ fontSize: '30px' }} />
                </div>
                <h3 className={classes.h3}>Almanac: Privacy policy</h3>
                <div>
                    The application 'Almanac' declares that does not store or use in any way all or part of the user's
                    contacts information as well as any other of his/her personal data, such as e-mail, etc..
                </div>
            </div>
        </>
    );
};

export default Privacy;
