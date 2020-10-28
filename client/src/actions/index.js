import axios from 'axios';

import { FETCH_USER } from './types';
import { CHANGE_DATE } from './types';
import { FETCH_ALL_HOLIDAYS } from './types';
import { GOTO_DATE_OF_HOLIDAY } from './types';
import { FETCH_CONTACTS } from './types';
import { SHOW_CELEBRATING } from './types';
import { SET_RECIPIENTS } from './types';
import { SET_EMAILDATA } from './types';
import { ERROR } from './types';
import { HIDE_NOTIF } from './types';
import { CELEB_SELECTED } from './types';
import { SEND_EMAIL } from './types';

import messages from '../util/messages';

// axios.interceptors.response.use(
//     (res) => res,
//     (err) => {
//         const message = err.response.data.message ? err.response.data.message : err.message;
//         const newerr = new Error(message);
//         throw newerr;
//     }
// );

// Επειδή η axios δουλεύει ασύγχρονα, η action creator 'ferchUser' δεν μπορεί
// να επιστρέψει αμέσως ένα action object, σύμφωνα με τους κανόνες του Redux.
// Αντι γι'αυτό, επιστρέφει μια function την οποία το Redux Θα εκτελέσει αμέσως
// και θα την περάσει στον dispatcher το action object που θα δημιουργηθεί
// μόλις επιστρέψει τα data η axios. Αυτή τη δουλειά κάνει το package 'redux-thunk'
// που περάσαμε ως παράμετρο στην createStore στο index.js
export const fetchUser = () => {
    return async (dispatch) => {
        try {
            // console.log('fetchUser called');
            const res = await axios.get('/api/current_user');
            dispatch({ type: FETCH_USER, payload: res.data, error: null });
            // console.log('axios fetchuser res=' + JSON.stringify(res.data));
        } catch (err) {
            dispatch({ type: FETCH_USER, payload: null, error: err });
            // dispatch({ type: ERROR, error: err });
        }
    };
};

export const changeDate = (where, basedate) => {
    return async (dispatch) => {
        // console.log(`changeDate called ${where}/${basedate}`);
        try {
            const res = await axios.get(`/api/goto/${where}/${basedate}`);
            dispatch({ type: CHANGE_DATE, payload: res.data, error: null });
        } catch (err) {
            dispatch({ type: CHANGE_DATE, payload: null, error: err });
        } // console.log('axios changedate res=' + JSON.stringify(res.data));
    };
};

export const fetchAllHolidays = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get('/api/allHolidays');
            dispatch({ type: FETCH_ALL_HOLIDAYS, payload: res.data, error: null });
            // console.log('axios fetchAllHolidays res=' + JSON.stringify(res.data));
        } catch (err) {
            dispatch({ type: FETCH_ALL_HOLIDAYS, payload: null, error: err });
        }
    };
};

export const gotoDateOfHoliday = (key, year) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`/api/findholiday/${key}/${year}`);
            dispatch({ type: GOTO_DATE_OF_HOLIDAY, payload: res.data, error: null });
            // console.log('axios gotoDateOfHoliday res=' + JSON.stringify(res.data));
        } catch (err) {
            dispatch({ type: GOTO_DATE_OF_HOLIDAY, payload: null, error: err });
        }
    };
};

export const fetchContacts = () => {
    return async (dispatch) => {
        let res;
        // debugger;
        try {
            res = await axios.get(`/api/contacts`);
            dispatch({ type: FETCH_CONTACTS, payload: res.data, error: null });
        } catch (err) {
            // console.log('ERROR FETCHING: ');
            // console.log(err);
            dispatch({ type: FETCH_CONTACTS, payload: null, error: err });
            // dispatch({ type: ERROR, error: err });
        }
        // console.log('axios fetchAllHolidays res=' + JSON.stringify(res.data));
    };
};

export const sendEmail = (emaildata) => {
    return async (dispatch) => {
        let res;
        try {
            res = await axios.post('/api/sendemail', emaildata);
            dispatch({ type: SEND_EMAIL, payload: null, error: res.data });
        } catch (err) {
            dispatch({ type: SEND_EMAIL, payload: null, error: err });
        }
    };
};

export const openCelebrating = (personlist, history) => {
    return async (dispatch) => {
        dispatch({ type: SHOW_CELEBRATING, payload: personlist, error: null });
        // Redirect user to celebrating page
        history.push('/celebrating');
    };
};

export const noCelebrating = () => {
    return async (dispatch) => {
        dispatch({
            type: ERROR,
            payload: null,
            error: { statusCode: '-1', message: messages.no_celebrating, severity: 'info' },
        });
    };
};

export const hideNotif = () => {
    return {
        type: HIDE_NOTIF,
    };
};

export const setRecipients = (recipients) => {
    // console.log('dispatch:' + recipients);
    return (dispatch) => {
        dispatch({ type: SET_RECIPIENTS, payload: recipients });
    };
};

export const setEmailData = (emaildata) => {
    // console.log('dispatch:' + emaildata);
    return (dispatch) => {
        dispatch({ type: SET_EMAILDATA, payload: emaildata });
    };
};

export const setCelebSelected = (selected) => {
    // console.log('dispatch:' + recipients);
    return (dispatch) => {
        dispatch({ type: CELEB_SELECTED, payload: selected });
    };
};
