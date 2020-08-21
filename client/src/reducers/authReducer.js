import { FETCH_USER } from '../actions/types';

// Όσο αφορά στο authentication του χρήστη, μπορούν να υπάρχουν 3 καταστάσεις:
// 1. Είναι άγνωστο αν έχει γίνει (περιμένουνε απάντηση)
// 2. Έχουμε απάντηση και είναι θετική
// 3. Έχουμε απάντηση και είναι αρνητική
// Στην πρώτη περίπτωση θέλουμε ο reducer να επιστρέφει state = null και γι'αυτό
// το βάζουμε ως default τιμή.
// Στην δεύτερη περίπτωση θα επιστρέφει state = action.payload (= User model)
// και στην τρίτη περίπτωση θα επιστρέφει state = false

export default function (state = null, action) {
    // console.log(action);
    switch (action.type) {
        case FETCH_USER:
            // Έχουμε απάντηση: επιστροφή action.payload
            // ή false αν το action.payload είναι κενό string
            return action.payload || false;
        default:
            // Δεν έχουμε ακόμα απάντηση από το authentication
            return state;
    }
}
