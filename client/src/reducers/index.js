import { combineReducers } from 'redux';

import authReducer from './authReducer';
import dateReducer from './dateReducer';
import fixedholReducer from './fixedholReducer';

export default combineReducers({
    auth: authReducer,
    date: dateReducer,
    fixedHolidays: fixedholReducer,
});
