import { combineReducers, Reducer } from '@reduxjs/toolkit';
import { notifyInitialStateModel, notifyReducer } from '../../features/common/notify/notify.reducer';

export type RootState = {
  notify: notifyInitialStateModel;
};

export const rootReducer: Reducer<RootState> = combineReducers({
  notify: notifyReducer,
});
