import { CHANGE_DATE } from '../actions/types';

export default function (state = null, action) {
    // console.log(action);
    switch (action.type) {
        case CHANGE_DATE:
            // Έχουμε απάντηση: επιστροφή action.payload
            // ή false αν το action.payload είναι κενό string
            return action.payload || '';
        default:
            // Δεν έχουμε ακόμα απάντηση
            return state;
    }
}
