import { IPost } from '../entity/post/post.slice.ts';

export type RootStackParamList = {
    MainStack: undefined;
};

export type MainStackParamList = {
    Posts: undefined;
};

export type PostsStackParamList = {
    PostsList: undefined;
    SinglePost: { item: IPost };
};

export enum AppRoutes {
    POSTS = 'Posts',
    SINGLE_POST = 'SinglePost',
    POSTS_LIST = 'PostsList',
}

export enum AppStacks {
    MAIN = 'MainStack',
}