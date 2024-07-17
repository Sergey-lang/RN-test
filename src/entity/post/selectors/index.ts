import { StateSchema } from '../../../providers/StoreProvider/store.ts';

export const getPostsSelector = (state: StateSchema) => state.posts?.posts;
export const getCommentsSelector = (state: StateSchema) => state.posts?.postsComments;