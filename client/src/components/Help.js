import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';

import homeImg from '../style/almanac_home.png';
import gotodateImg from '../style/almanac_gotodate.png';
import findholidayImg from '../style/almanac_findholiday.png';
import celebratorsImg from '../style/celebrators.png';
// import wizard1Img from '../style/almanac_wizard1.png';
// import wizard2Img from '../style/almanac_wizard2.png';
// import wizard3Img from '../style/almanac_wizard3.png';

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
    notif: {
        background: 'lightyellow',
        borderStyle: 'solid',
        padding: '15px',
        fontWeight: 'bold',
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
                </ul>

                <div className={classes.notif}>
                    Παρακαλώ διαβάστε μια σημείωση για την παρούσα έκδοση στο τέλος του κειμένου.
                </div>

                <h2 className={classes.h2}>Λειτουργίες και δυνατότητες της εφαρμογής</h2>
                <h3 className={classes.h3} id="home">
                    Αρχική οθόνη
                </h3>
                <div style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
                    <img
                        src={homeImg}
                        width="100%"
                        height="auto"
                        alt=""
                        style={{ textAlign: 'center', verticalAlign: 'middle' }}
                    />
                </div>
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
                    <div style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
                        <img
                            src={gotodateImg}
                            width="25%"
                            height="auto"
                            alt=""
                            style={{ textAlign: 'center', verticalAlign: 'middle' }}
                        />
                    </div>
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
                    <div style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
                        <img
                            src={findholidayImg}
                            width="40%"
                            height="auto"
                            alt=""
                            style={{ textAlign: 'center', verticalAlign: 'middle' }}
                        />
                    </div>
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
                    Αν πατήσουμε το κουμπί "Εορτάζοντες" η εφαρμογή θα μας δείξει τα πιθανά ονόματα που εορτάζουν την
                    συγκεκριμένη ημέρα, αν βέβαια υπάρχει κάποια γιορτή.
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
                    <img
                        src={celebratorsImg}
                        width="40%"
                        height="auto"
                        alt=""
                        style={{ textAlign: 'center', verticalAlign: 'middle' }}
                    />
                </div>
                <div>
                    <p />
                </div>
                <div>
                    <p />
                </div>
                <h3 className={classes.h3} id="home">
                    ΣΗΜΕΙΩΣΗ ΓΙΑ ΤΗ ΝΕΑ ΕΚΔΟΣΗ 6.0.0 light
                </h3>
                <p>
                    Είναι ασυνήθιστο μια νέα έκδοση ενός λογισμικού να προσφέρει λιγότερες δυνατότητες από τις
                    προηγούμενες (εξ ου και ο χαρακτηρισμός της έκδοσης ως light). Όμως αυτό αναγκάστηκα με λύπη μου να
                    κάνω στη νέα έκδοση του Ημεροδείκτη για το Web. Η νέα έκδοση δεν προσφέρει πια τη δυνατότητα στον
                    χρήστη να βρίσκει όσους από τις επαφές του γιορτάζουν μια συγκεκριμένη μέρα και κατόπιν να στέλνει
                    σε όσους επιλέξει από αυτούς ευχητήριο e-mail. Ο λόγος αυτής της υποβάθμισης είναι ο ακόλουθος.
                </p>
                <p>
                    Για να μπορέσει το πρόγραμμα να ψάξει ποιοι από τις επαφές του χρήστη εορτάζουν, χρειάζεται προφανώς
                    να έχει πρόσβαση στις επαφές αυτές, επομένως θα πρέπει να στείλει στην Google τα "διαπιστευτήριά
                    του", δηλαδή email και password. Στις προηγούμενες εκδόσεις, αυτό γινόταν από ένα ειδικό κουμπί της
                    εφαρμογής ("Σύνδεση μέσω Google"). Όμως, πριν επιτρέψει την διαδικασία αυτή, η Google ευλόγως
                    ελέγχει την ποιότητα της εφαρμογής βάσει κάποιων προδιαγραφών και κριτηρίων που η ίδια έχει θέσει.
                    Αν δεν ανταποκριθεί ο προγραμματιστής στα κριτήρια αυτά, ο χρήσης παίρνει ένα μήνυμα που λέει: "Η
                    Gοοgle δεν έχει επαληθεύσει την εφαρμογή αυτή" και του απαγορεύεται να προχωρήσει στη σύνδεση.
                </p>
                <p>
                    Την πρώτη φορά λοιπόν που ανέβασα την εφαρμογή στο web πέρασα επιτυχώς από την διαδικασία ελέγχου
                    και η εφαρμογή άρχισε να λειτουργεί. Μετά από κάποιο χρόνο που την άνοιξα πάλι για να ελέγξω αν όλα
                    είναι εντάξει, βλέπω με έκπληξη ότι εμφανίζει και πάλι το μήνυμα "Η Gοοgle δεν έχει επαληθεύσει την
                    εφαρμογή αυτή". Ξαναέκανα όλη την διαδικασία από την αρχή και η εφαρμογή άρχισε να λειτουργεί πάλι.
                    Πριν λίγες μέρες όμως, νάτο πάλι το ίδιο μήνυμα! Δεν έχω καταλάβει για ποιο λόγο συμβαίνει αυτό,
                    όμως μου είναι αδύνατο κάθε τόσο να κάνω αυτή τη διαδικασία, οπότε αναγκάστηκα να αφαιρέσω από την
                    εφαρμογή τις δυνατότητες που προανέφερα. Ζητώ συγγνώμη απ' όσους τυχόν τις χρησιμοποιούσαν.
                </p>
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
