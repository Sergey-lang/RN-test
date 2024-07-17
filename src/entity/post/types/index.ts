export interface IPost {
    id: number;
    title: string;
    body: string;
}

export interface IComment {
    id: number;
    postId: number;
    text: string;
}

export interface IPostSliceSchema {
    posts: IPost[]
    postsComments: { [key: string]: IComment[] }
}