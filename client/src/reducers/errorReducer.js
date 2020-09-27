import { ERROR } from '../actions/types';

export default function (state = null, action) {
    switch (action.type) {
        case ERROR:
            // console.log(action);
            return action.error || '';
        default:
            // Δεν έχουμε ακόμα απάντηση
            return state;
    }
}
