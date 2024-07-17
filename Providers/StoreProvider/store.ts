import { configureStore } from '@reduxjs/toolkit';
import { postReducer } from '../../src/entity/post/post.slice.ts';

export const store = configureStore({
    reducer: {
        post: postReducer
    }
});

export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatchType = typeof store.dispatch;