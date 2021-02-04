import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import storeReducer from 'stores/reducer';

const reducer = (state, action) => storeReducer(state, action);

const middleware = getDefaultMiddleware({
  immutableCheck: false,
  serializableCheck: false,
});

const store = configureStore({
  reducer,
  middleware,
  devTools: {
    name: 'Redux',
    trace: true,
  },
});

export default store;
export { middleware };
