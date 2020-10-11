import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'; // Import and rename

import authReducer from './authReducer';
import dateReducer from './dateReducer';
import holidaysReducer from './holidaysReducer';
import contactsReducer from './contactsReducer';
import celebratingReducer from './celebratingReducer';
import errorReducer from './errorReducer';

export default combineReducers({
    auth: authReducer,
    date: dateReducer,
    allHolidays: holidaysReducer,
    contacts: contactsReducer,
    celebratingList: celebratingReducer,
    errorObj: errorReducer,
    form: formReducer,
});
