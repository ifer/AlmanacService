import axios from 'axios';

import { FETCH_USER } from './types';
import { CHANGE_DATE } from './types';
import { FETCH_ALL_HOLIDAYS } from './types';
import { GOTO_DATE_OF_HOLIDAY } from './types';
import { FETCH_CONTACTS } from './types';
import { ERROR } from './types';

const handleErrorResponse = (error) => {
    let errorResponse;
    if (error.response && error.response.data) {
        // I expect the API to handle error responses in valid format
        errorResponse = error.response.data;
        // JSON stringify if you need the json and use it later
    } else if (error.request) {
        // TO Handle the default error response for Network failure or 404 etc.,
        errorResponse = error.request.message || error.request.statusText;
    } else {
        errorResponse = error.message;
    }
    throw new Error(errorResponse);
};

axios.interceptors.response.use(
    (res) => res,
    (error) => {
        let errorResponse;
        if (error.response && error.response.data) {
            // I expect the API to handle error responses in valid format
            errorResponse = error.response.data;
            // JSON stringify if you need the json and use it later
        } else if (error.request) {
            // TO Handle the default error response for Network failure or 404 etc.,
            errorResponse = error.request.message || error.request.statusText;
        } else {
            errorResponse = error.message;
        }
        throw new Error(errorResponse);
    }
);

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
            dispatch({ type: FETCH_USER, payload: res.data });
            // console.log('axios fetchuser res=' + JSON.stringify(res.data));
        } catch (err) {
            dispatch({ type: ERROR, error: err });
        }
    };
};

export const changeDate = (where, basedate) => {
    return async (dispatch) => {
        // console.log(`changeDate called ${where}/${basedate}`);
        try {
            const res = await axios.get(`/api/goto/${where}/${basedate}`);
            dispatch({ type: CHANGE_DATE, payload: res.data });
        } catch (err) {
            console.log('ERROR CHANGING: ' + err);
            dispatch({ type: ERROR, error: err });
        } // console.log('axios changedate res=' + JSON.stringify(res.data));
    };
};

export const fetchAllHolidays = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get('/api/allHolidays');
            dispatch({ type: FETCH_ALL_HOLIDAYS, payload: res.data });
            // console.log('axios fetchAllHolidays res=' + JSON.stringify(res.data));
        } catch (err) {
            dispatch({ type: ERROR, error: err });
        }
    };
};

export const gotoDateOfHoliday = (key, year) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`/api/findholiday/${key}/${year}`);
            dispatch({ type: GOTO_DATE_OF_HOLIDAY, payload: res.data });
            // console.log('axios gotoDateOfHoliday res=' + JSON.stringify(res.data));
        } catch (err) {
            dispatch({ type: ERROR, error: err });
        }
    };
};

export const fetchContacts = () => {
    return async (dispatch) => {
        let res;
        // debugger;
        try {
            res = await axios.get(`/api/contacts`);
            dispatch({ type: FETCH_CONTACTS, payload: res.data });
        } catch (err) {
            console.log('ERROR FETCHING: ');
            console.log(err);
            dispatch({ type: ERROR, error: err });
        }
        // console.log('axios fetchAllHolidays res=' + JSON.stringify(res.data));
    };
};
