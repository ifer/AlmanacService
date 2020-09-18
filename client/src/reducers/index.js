import { combineReducers } from 'redux';

import authReducer from './authReducer';
import dateReducer from './dateReducer';
import holidaysReducer from './holidaysReducer';
import contactsReducer from './contactsReducer';

export default combineReducers({
    auth: authReducer,
    date: dateReducer,
    allHolidays: holidaysReducer,
    contacts: contactsReducer,
});
