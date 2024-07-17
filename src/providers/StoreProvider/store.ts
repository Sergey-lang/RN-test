import { combineReducers, configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { postReducer } from '../../entity/post/slices/post.slice.ts';
import { IPostSliceSchema } from '../../entity/post';

export interface StateSchema {
    posts: IPostSliceSchema;
}

const rootReducers: ReducersMapObject<StateSchema> = {
    posts: postReducer
};

const combinedReducerValue = combineReducers(rootReducers)

export const store = configureStore({
    reducer: combinedReducerValue
});

export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatchType = typeof store.dispatch;