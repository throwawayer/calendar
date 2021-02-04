import { combineReducers } from 'redux';

import calendar from 'stores/calendar';

const storeReducer = combineReducers({
  calendar,
});

export default storeReducer;
