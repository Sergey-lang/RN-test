import { IPost } from '../entity/post';
import { SvgProps } from 'react-native-svg';
import { ReactElement } from 'react';
import ChatIcon from '../components/svg/ChatIcon.tsx';

export type RootStackParamList = {
    MainStack: undefined;
};

export type MainStackParamList = {
    Posts: undefined;
};

export type PostsStackParamList = {
    PostsList: undefined;
    SinglePost: IPost;
};

export enum AppRoutes {
    POSTS = 'Posts',
    SINGLE_POST = 'SinglePost',
    POSTS_LIST = 'PostsList',
}

export enum AppStacks {
    MAIN = 'MainStack',
}

export type TypeRootStackParamsList = {
    Posts: undefined;
};

export interface ITabItem {
    screenTitle: keyof TypeRootStackParamsList;
    icon: (props: SvgProps) => ReactElement;
    label: string;
}

export const TABS_LIST: ITabItem[] = [
    {
        screenTitle: 'Posts',
        icon: ChatIcon,
        label: 'Posts',
    },
];