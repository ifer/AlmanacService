import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';

import homeImg from '../style/almanac_home.png';
import gotodateImg from '../style/almanac_gotodate.png';
import findholidayImg from '../style/almanac_findholiday.png';
import wizard1Img from '../style/almanac_wizard1.png';
import wizard2Img from '../style/almanac_wizard2.png';
import wizard3Img from '../style/almanac_wizard3.png';

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

const Help = (props) => {
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
                <h1 className={classes.h1}>Ημεροδείκτης: οδηγίες χρήσης</h1>
                <div>
                    Ο Ημεροδείκτης είναι μια απλή εφαρμογή που προσομοιώνει τους επιτραπέζιους ημεροδείκτες. Δηλαδή
                    προσφέρει πληροφορίες για κάθε ημέρα του έτους.
                </div>
                <ul>
                    <li style={{ listStyleType: 'square' }}>
                        Εμφανίζει όλες τις εορτές της Ελληνικής Ορθόδοξης Εκκλησίας, κινητές και ακίνητες.
                    </li>
                    <li style={{ listStyleType: 'square' }}>
                        Εμφανίζει τη φάση σελήνης καθώς και τις ώρες ανατολής και δύσης ηλίου.
                    </li>
                    <li style={{ listStyleType: 'square' }}>
                        Ο χρήστης μπορεί να <a href="#move">μετακινηθεί</a> σε οποιαδήποτε ημερομηνία.
                    </li>
                    <li style={{ listStyleType: 'square' }}>
                        Ο χρήστης μπορεί επίσης να <a href="#search">αναζητήσει</a> μια κινητή εορτή (πχ Καθαρά Δευτέρα,
                        Πάσχα, κλπ) οποιουδήποτε έτους.
                    </li>
                    <li style={{ listStyleType: 'square' }}>
                        Προσφέρει δυνατότητα <a href="#search">αναζήτησης</a> στις ακίνητες εορτές με βάση, για
                        παράδειγμα, το όνομα ενός αγίου.
                    </li>
                    <li style={{ listStyleType: 'square' }}>
                        Ψάχνει στις "Επαφές" που είναι καταχωρημένες στον Google λογαριασμό του χρήστη και βρίσκει τους
                        <a href="#celebrating"> εορτάζοντες</a> της ημέρας, τους οποίους εμφανίζει σε λίστα με τα
                        τηλέφωνα και τις ηλεκτρονικές διευθύνσεις τους.
                    </li>
                    <li style={{ listStyleType: 'square' }}>
                        Μπορεί να στείλει μαζικά μήνυμα <a href="#celebrating">e-mail</a> σε όλους (ή σε επιλεγμένους)
                        εορτάζοντες.
                    </li>
                </ul>
                <h2 className={classes.h2}>Λειτουργίες και δυνατότητες της εφαρμογής</h2>
                <h3 className={classes.h3} id="header">
                    Γραμμή επικεφαλίδας
                </h3>
                <div>
                    Στο δεξί μέρος της γραμμής επικεφαλίδας που υπάρχει στην κορυφή της σελίδας, εμφανίζεται ένα κουμπί
                    με ετικέτα: <b>Σύνδεση μέσω Google</b>. Αν θέλουμε να χρησιμοποιήσουμε την δυνατότητα να μάθουμε
                    ποιοι από τις επαφές μας έχουν την ονομαστική τους εορτή μια συγκεκριμένη μέρα, θα πρέπει
                    προηγουμένως να συνδεθούμε στην εφαρμογή μέσω Google. Αφού πατήσουμε το κουμπί, θα εμφανιστεί ένα
                    πλαίσιο που μας καλεί να επιλέξουμε τον λογαριασμό Google με τον οποίο θέλουμε να συνδεθούμε και στη
                    συνέχεια ένα δεύτερο πλαίσιο μας ζητάει να επιβεβαιώσουμε ότι παραχωρούμε στην εφαρμογή{' '}
                    <i>Ημεροδείκτης </i>
                    το δικαίωμα να έχει πρόσβαση στις επαφές μας.
                </div>
                <div>
                    <b>
                        <ul>
                            <li>
                                Εδώ πρέπει να δηλωθεί πως η εφαρμογή <i>Ημεροδείκτης </i>
                                <u> δεν αποθηκεύει και δεν χρησιμοποιεί με οποιονδήποτε τρόπο</u> όλα ή μέρος των
                                στοιχείων των επαφών του χρήστη.
                            </li>
                        </ul>
                    </b>
                </div>
                <div>
                    <p />
                </div>
                <div>
                    <p />
                </div>
                <h3 className={classes.h3} id="home">
                    Αρχική οθόνη
                </h3>
                <Paper variant="outlined">
                    <img
                        src={homeImg}
                        width="100%"
                        height="auto"
                        alt=""
                        style={{ textAlign: 'center', verticalAlign: 'middle' }}
                    />
                </Paper>
                <div>
                    Στο δεξί μέρος της σελίδας εμφανίζονται τα δεδομένα της ημέρας. Στο αριστερό μέρος βρίσκονται τα
                    στοιχεία ελέγχου που προσφέρουν τις εξής επιλογές:
                </div>
                <div>
                    <p />
                </div>
                <ul>
                    <li id="move">
                        <b>Μετακίνηση στον χρόνο</b>
                    </li>
                    <div>
                        Στην πρώτη σειρά, με τα βέλη προχωράμε μιά ημέρα μπροστά ή πίσω και με το κουμπί <b>Σήμερα </b>
                        επιστρέφουμε στην σημερινή ημερομηνία. Στην δεύτερη σειρά, τα βέλη μας οδηγούν ένα μήνα μπροστά
                        ή πίσω.
                    </div>
                    <Paper variant="outlined" style={{ textAlign: 'center' }}>
                        <img
                            src={gotodateImg}
                            width="25%"
                            height="auto"
                            alt=""
                            style={{ textAlign: 'center', verticalAlign: 'middle' }}
                        />
                    </Paper>
                    <div>
                        Αμέσως πιο κάτω, αν κάνουμε κλικ δίπλα από την ετικέτα <b>Ημερομηνία</b>, θα εμφανιστεί ένα
                        πλαίσιο διαλόγου για να μεταβούμε σε οποιαδήποτε ημερομηνία επιθυμούμε.
                    </div>
                    <div>
                        <p />
                    </div>
                    <li id="search">
                        <b>Αναζήτηση εορτής</b>
                    </li>
                    <Paper variant="outlined" style={{ textAlign: 'center' }}>
                        <img
                            src={findholidayImg}
                            width="40%"
                            height="auto"
                            alt=""
                            style={{ textAlign: 'center', verticalAlign: 'middle' }}
                        />
                    </Paper>
                    <div>
                        Κάτω από την ετικέτα <b>Αναζήτηση εορτής</b> εμφανίζεται ένα πλαίσιο αναζήτησης. Αν πατήσουμε το
                        βελάκι στο δεξί μέρος του πλαισίου, θα εμφανιστεί μια λίστα μέ όλες τις εορτές του έτους. Πρώτα
                        εμφανίζονται οι <b>κινητές εορτές</b> (ταξινομημένες με χρονολογική σειρά) και κατόπιν οι{' '}
                        <b>ακίνητες</b> (αλφαβητικά).
                    </div>
                    <div>
                        Εναλλακτικά μπορούμε να αρχίσουμε να πληκτρολογούμε μέρος του ονόματος της εορτής που
                        αναζητούμε, και η λίστα που θα εμφανιστεί θα περιέχει τις εορτές που ταιριάζουν με αυτό που
                        γράφουμε.
                    </div>
                </ul>
                <h3 className={classes.h3} id="celebrating">
                    Εορτάζοντες
                </h3>
                <div>
                    <b>
                        Όπως αναφέρθηκε και παραπάνω, για να μπορέσουμε να χρησιμοποιήσουμε τη συγκεκριμένη δυνατότητα,
                        θα πρέπει προηγουμένως να <a href="#header">συνδεθούμε στην εφαρμογή μέσω Google</a>.
                    </b>
                </div>
                <div>
                    <p />
                </div>
                <div>
                    Αν πατήσουμε το κουμπί <b>Εορτάζοντες</b> η εφαρμογή θα προσπαθήσει να βρει στις επαφές που έχουμε
                    καταχωρήσει στο Google, πρόσωπα που έχουν την ονομαστική τους εορτή την συγκεκριμένη ημέρα. Αν δεν
                    υπάρχουν εορτάζοντες, θα ενημερωθούμε με σχετικό μήνυμα. Αν βρεθούν, τότε ξεκινάει μια διαδικασία
                    από 3 διαδοχικές οθόνες (wizard):
                </div>
                <ol>
                    <li className={classes.wizardScreen}>
                        <b>Λίστα εορταζόντων - Επιλογή παραληπτών μηνύματος</b>
                    </li>
                    <Paper variant="outlined" style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                        <img
                            src={wizard1Img}
                            width="100%"
                            height="auto"
                            alt=""
                            style={{ textAlign: 'center', verticalAlign: 'middle' }}
                        />
                    </Paper>
                    <div>
                        Εμφανίζεται ένας πίνακας με τα στοιχεία των εορταζόντων: ονοματεπώνυμο, email, τηλέφωνο. Η λίστα
                        παρουσιάζεται σε σελίδες των 10 ατόμων η κάθε μία. Για μετακίνηση στην επόμενη ή προηγούμενη
                        σελίδα πατάμε τα κουμπιά <b>&gt;</b> και <b>&lt;</b> αντίστοιχα, που βρίσκονται ακριβώς κάτω από
                        τον πίνακα και δεξιά.
                    </div>
                    <div>
                        Αν θέλουμε να προχωρήσουμε στην αποστολή μηνύματος email σε εορτάζοντες, πρέπει να επιλέξουμε
                        τους παραλήπτες κάνοντας κλικ στα τετραγωνάκια που βρίσκονται αριστερά από κάθε εγγραφή. Για να
                        επιλέξουμε όλους/ες, κάνουμε κλικ στο τετραγωνάκι που βρίσκεται στην γραμμή των ετικετών του
                        πίνακα. Στη συνέχεια πατάμε το κουμπί <b>Επόμενο</b>.
                    </div>
                    <div>
                        Για να επιστρέψουμε στην αρχική οθόνη χωρίς να αποστείλουμε μήνυμα, πατάμε <b>Άκυρο</b>.
                    </div>
                    <div>
                        <p />
                    </div>
                    <li className={classes.wizardScreen} id="email">
                        <b>Σύνταξη μηνύματος</b>
                    </li>
                    <Paper variant="outlined" style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                        <img
                            src={wizard2Img}
                            width="100%"
                            height="auto"
                            alt=""
                            style={{ textAlign: 'center', verticalAlign: 'middle' }}
                        />
                    </Paper>
                    <div>
                        Στην σελίδα αυτή μπορούμε να γράψουμε το μήνυμα που θα αποστείλουμε στους επιλεγμένους
                        αποδέκτες. Εμφανίζονται δύο πεδία για συμπλήρωση: <i>Θέμα</i> και <i>Κείμενο</i>. Και τα δύο
                        είναι υποχρεωτικά. Μετά την συμπλήρωση, πατάμε το κουμπί <b>Επόμενο</b> για να προχωρήσουμε στην
                        επόμενη οθόνη. Με το κουμπί <b>Προηγούμενο</b> επιστρέφουμε στην λίστα εορταζόντων.
                    </div>
                    <div>
                        <p />
                    </div>
                    <li className={classes.wizardScreen}>
                        <b>Επαλήθευση και αποστολή</b>
                    </li>
                    <Paper variant="outlined" style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                        <img
                            src={wizard3Img}
                            width="100%"
                            height="auto"
                            alt=""
                            style={{ textAlign: 'center', verticalAlign: 'middle' }}
                        />
                    </Paper>
                    <div>
                        Στην σελίδα αυτή καλούμαστε να επαληθεύσουμε τα δεδομένα που έχουμε εισαγάγει, δηλαδή τους
                        παραλήπτες και τα στοιχεία του μηνύματος (θέμα, κείμενο). Αν όλα είναι εντάξει, πατάμε
                        <b> Αποστολή</b> για να αποσταλεί το μήνυμα. Αλλιώς, πατάμε <b>Προηγούμενο</b> για επιστροφή
                        στις προηγούμενες σελίδες.
                    </div>
                </ol>
                <div>
                    <p />
                </div>
                Αφού πατήσουμε <b>Αποστολή</b>, η εφαρμογή επιστρέφει στην <a href="#home">αρχική οθόνη</a>, ενώ στο
                παρασκήνιο αποστέλλεται το μήνυμα στους αποδέκτες.
                <b>Η αποστολή αυτή μπορεί να διαρκέσει αρκετά δευτερόλεπτα, ανάλογα με το πλήθος των παραληπτών</b>.
                Όταν η διαδικασία ολοκληρωθεί, ο χρήστης θα ειδοποιηθεί με μήνυμα στην οθόνη για την επιτυχία της
                αποστολής ή για πιθανό πρόβλημα.
                <div>
                    <p />
                </div>
                <div>
                    <p />
                </div>
                <div style={{ textAlign: 'center' }}>
                    <EventAvailableIcon style={{ fontSize: '30px' }} />
                    <EventAvailableIcon style={{ fontSize: '30px' }} />
                    <EventAvailableIcon style={{ fontSize: '30px' }} />
                </div>
            </div>
        </>
    );
};

//plugin styles as props (material-ui)
// const styledHelp = withStyles(useStyles)(Help);
export default Help;
