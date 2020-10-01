import { combineReducers } from 'redux';

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
    celebrating: celebratingReducer,
    errorObj: errorReducer,
});
