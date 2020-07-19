import { configureStore } from '@reduxjs/toolkit';

import thunk from 'redux-thunk';
import reducer from './slice';

const store = configureStore({
  reducer,
  middleware: [thunk],
});

export default store;
