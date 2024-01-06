import { combineReducers } from '@reduxjs/toolkit';
import postsSlice from './postsSlice';

export const rootReducer = combineReducers({
  posts: postsSlice,
});
