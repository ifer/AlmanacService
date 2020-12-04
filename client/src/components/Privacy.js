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
    li: {
        display: 'listItem',
        listStyleType: 'disc!important',
        marginLeft: '30px',
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
                    Προκειμένου να αυξήσει την χρησιμότητά της και να βελτιώσει την εμπειρία του χρήστη, η εφαρμογή
                    Ημεροδείκτης του δίνει την δυνατότητα να ελέγχει αν κάποια πρόσωπα από τις επαφές του/της έχουν την
                    ονομαστική τους εορτή μια συγκεκριμένη ημέρα και προαιρετικά να τους στείλει e-mail με ευχές. Στην
                    περίπτωση που αυτός/αυτή επιθυμεί να χρησιμοποιήσει αυτή την δυνατότητα, θα πρέπει συνδεθεί στην
                    εφαρμογή μέσω Google ώστε η εφαρμογή να έχει πρόσβαση σε ορισμένα από τα προσωπικά του στοιχεία, των
                    οποίων η διαχείριση γίνεται όπως περιγράφεται παρακάτω:
                </div>
                <ol>
                    <li>
                        <b>Ποια στοιχεία συλλέγονται</b>
                    </li>
                    <ul>
                        <li className={classes.li}>
                            Τα στοιχεία ταυτοποίησης στο Google, δηλαδή το όνομα (username) και ο αριθμός μητρώου χρήστη
                            (userid).
                        </li>
                        <li className={classes.li}>
                            Τα στοιχεία των επαφών που ο χρήστης έχει καταχωρημένες στο Google.
                        </li>
                    </ul>
                    <li>
                        <b>Πώς χρησιμοποιούνται τα στοιχεία που συλλέγονται</b>
                    </li>
                    <ul>
                        <li className={classes.li}>
                            Τα στοιχεία ταυτοποίησης (όνομα και αριθμός μητρώου χρήστη) φυλάσσονται σε cookies
                            προκειμένου ο χρήστης να αναγνωρίζεται από την εφαρμογή.
                        </li>
                        <li className={classes.li}>
                            Τα στοιχεία των επαφών του χρήστη (όνομα, email, κινητό τηλέφωνο) συλλέγονται αποκλειστικά
                            για να παρουσιαστούν σε αυτόν. Ειδικά η διεύθυνση email χρησιμοποιείται και για την αποστολή
                            μηνύματος στον συγκεκριμένο παραλήπτη εφόσον ο χρήστης τον επιλέξει. Η εφαρμογή δεν
                            αποθηκεύει αυτά τα στοιχεία, δεν τα μοιράζεται και γενικά δεν τα χρησιμοποιεί με οποιοδήποτε
                            άλλο τρόπο.
                        </li>
                    </ul>
                    <li>
                        <b>Αποστολή email</b>
                    </li>
                    <ul>
                        <li className={classes.li}>
                            Προκειμένου να αποστείλει e-mail εκ μέρους του χρήστη σε επαφές που έχουν την ονομαστική
                            τους εορτή, η εφαρμογή χρησιμοποιεί σχετική προγραμματιστική δυνατότητα. Δεν έχει άδεια να
                            διαβάσει μηνύματα του χρήστη και δεν χρησιμοποιεί με οποιονδήποτε τρόπο δεδομένα που
                            σχετίζονται με αυτά.
                        </li>
                    </ul>
                </ol>

                <div style={{ textAlign: 'center', marginTop: '40px', marginBottom: '20px' }}>
                    <EventAvailableIcon style={{ fontSize: '30px' }} />
                    <EventAvailableIcon style={{ fontSize: '30px' }} />
                    <EventAvailableIcon style={{ fontSize: '30px' }} />
                </div>
                <h3 className={classes.h3}>Almanac: Privacy policy</h3>
                <div>
                    In order to become more useful and improve the user experience, the application “Almanac” gives user
                    the possibility to check whether some of his/her contacts have their name-day on a particular day
                    and optionally send them e-mail with greetings. If he/she wishes to use this feature, the user must
                    connect to the application via Google so that the application has access to some of his personal
                    data, which are managed as described below:
                </div>
                <ol>
                    <li>
                        <b>What information is collected</b>
                    </li>
                    <ul>
                        <li className={classes.li}>Google identification data, namely the username and the userid.</li>
                        <li className={classes.li}>The contacts data that the user has registered on Google.</li>
                    </ul>
                    <li>
                        <b>How the collected data is used</b>
                    </li>
                    <ul>
                        <li className={classes.li}>
                            The identification data (Google username and userid) are stored in cookies in order for the
                            user to be identified by the application.
                        </li>
                        <li className={classes.li}>
                            The details of the user's contacts (name, email address, mobile phone) are collected
                            exclusively to be presented to him/her. Especially the email address is also used to send a
                            message to the specific recipient, if the user selects him. The application does not store
                            this information, does not share it, and generally does not use it in any other way.
                        </li>
                    </ul>
                    <li>
                        <b>Email sending</b>
                    </li>
                    <ul>
                        <li className={classes.li}>
                            In order to send e-mail on behalf of the user to contacts that have their name-day, the
                            application uses the relevant programming feature. It has no permission to read user
                            messages and does not use data related to them in any way.
                        </li>
                    </ul>
                </ol>
            </div>
            <div style={{ textAlign: 'center', marginTop: '40px', marginBottom: '20px' }}>
                <EventAvailableIcon style={{ fontSize: '30px' }} />
                <EventAvailableIcon style={{ fontSize: '30px' }} />
                <EventAvailableIcon style={{ fontSize: '30px' }} />
            </div>
        </>
    );
};

export default Privacy;
