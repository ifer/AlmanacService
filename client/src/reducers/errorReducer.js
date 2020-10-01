import { HIDE_ERROR } from '../actions/types';

export default function (state = null, action) {
    const { error } = action;

    // isOpen: whether the ShowNotification component should open
    if (error) {
        return { error: error, isOpen: true };
    } else if (action.type === HIDE_ERROR) {
        return { error: null, isOpen: false };
    }

    return state;

    // switch (action.type) {
    //     case ERROR:
    //         // console.log(action);
    //         return action.error || '';
    //     default:
    //         // Δεν έχουμε ακόμα απάντηση
    //         return state;
    // }
}
