import { CELEB_SELECTED } from '../actions/types';

export default function (state = null, action) {
    // console.log(action);
    switch (action.type) {
        case CELEB_SELECTED:
            return action.payload || [];
        default:
            // Δεν έχουμε ακόμα απάντηση
            return state;
    }
}
