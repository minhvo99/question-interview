import { configureStore } from '@reduxjs/toolkit';
import { rootApi } from '@services/rootApi';
// import storage from 'redux-persist/lib/storage';
// import {
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
//   persistStore,
// } from 'redux-persist';

// const persistConfig = {
//   key: 'root',
//   version: 1,
//   storage,
//   blacklist: [rootApi.reducerPath],
// };

// const persistedReducer = persistReducer(
//   persistConfig,
//   combineReducers({
//     [rootApi.reducerPath]: rootApi.reducer,
//   }),
// );

// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }).concat(rootApi.middleware),
// });

// // setupListeners(store.dispatch);

// export const persistor = persistStore(store);
export const store = configureStore({
  reducer: {
    [rootApi.reducerPath]: rootApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rootApi.middleware),
});
