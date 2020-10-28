import { HIDE_NOTIF } from '../actions/types';

export default function (state = null, action) {
    const { error } = action;

    // isOpen: whether the ShowNotification component should open
    if (error) {
        const severity = error.statusCode === 200 ? 'info' : 'error';
        return { error: error, isOpen: true, severity: severity };
    } else if (action.type === HIDE_NOTIF) {
        return { error: null, isOpen: false };
    }

    return state;
}
