import { combineReducers } from 'redux';

import authReducer from './authReducer';
import dateReducer from './dateReducer';

export default combineReducers({
    auth: authReducer,
    date: dateReducer,
});
