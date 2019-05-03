import entrance from './entrance';
import customer from './customer';
import merchant from './merchant';

import { combineReducers } from 'redux';

const rootReducer = (combineReducers as any)({
  entrance,
  customer,
  merchant
});

export default rootReducer;
