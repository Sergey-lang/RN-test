import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IComment, IPost, IPostSliceSchema } from '../types';

const initialState: IPostSliceSchema = {
    posts: [],
    postsComments: {}
};

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setPosts: (state, action: PayloadAction<IPost[]>) => {
            state.posts = action.payload;
        },
        setComments: (state, action: PayloadAction<{ comments: IComment[], postId: number }>) => {
            const {comments, postId} = action.payload;
            const filteredComments = comments.filter((c) => c.postId === postId);
            if (filteredComments.length) {
                state.postsComments = {
                    ...state.postsComments,
                    [postId]: filteredComments
                };
            }
        },
        addPost: (state, action: PayloadAction<IPost>) => {
            state.posts.push(action.payload)
        },
        addPostComment: (state, action: PayloadAction<IComment>) => {
            const {postId} = action.payload;
            if (state.postsComments[postId]) {
                const updatedArr = [...state.postsComments[postId], action.payload];
                state.postsComments = {
                    ...state.postsComments,
                    [postId]: updatedArr,
                }
            } else {
                state.postsComments = {...state.postsComments, [postId]: [action.payload]}
            }
        },
        removePost: (state, action: PayloadAction<number>) => {
            state.posts = state.posts.filter((card) => card.id !== action.payload)
            if (state.postsComments[action.payload]) {
                delete state.postsComments[action.payload]
            }
        },
        removePostComment: (state, action: PayloadAction<{ postId: number, commentId: number }>) => {
            const {postId, commentId} = action.payload;
            state.postsComments = {
                ...state.postsComments,
                [postId]: state.postsComments[postId]
                    .filter((c) => c.id !== commentId)
            }
        },
        updatePost: (state, action: PayloadAction<IPost>) => {
            const post = action.payload;
            state.posts = state.posts.map((p) => p.id === post.id ? post : p)
        },
        updatePostComment: (state, action: PayloadAction<{ postId: number, comment: IComment }>) => {
            const {postId, comment: updatedComment} = action.payload;
            state.postsComments = {
                ...state.postsComments,
                [postId]: state.postsComments[postId]
                    .map((comment) => comment.id === updatedComment.id ? updatedComment : comment)
            }
        },
    },
})

export const {actions: postActions} = postSlice;
export const {reducer: postReducer} = postSlice;