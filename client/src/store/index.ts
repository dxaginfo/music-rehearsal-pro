import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import bandsReducer from './slices/bandsSlice';
import rehearsalsReducer from './slices/rehearsalsSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    bands: bandsReducer,
    rehearsals: rehearsalsReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
