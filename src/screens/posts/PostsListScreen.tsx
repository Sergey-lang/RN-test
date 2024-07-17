import React, { useEffect } from 'react';
import { Button, FlatList, StyleSheet, View } from 'react-native';
import PostCard from '../../components/PostCard/PostCard.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { IPost, postActions } from '../../entity/post/post.slice.ts';
import { postsApi } from '../../api/postsApi.ts';

export const getPostsSelector = (state) => state.post?.posts;

const PostsListScreen = () => {
    const dispatch = useDispatch()
    const posts = useSelector(getPostsSelector);

    const fetchPosts = async () => {
        try {
            const {posts} = await postsApi.getPosts();
            dispatch(postActions.setPosts(posts))
        } catch (e) {
            console.log(e)
        }
    }

    const onPressAddNewPost = async () => {
        const newPost: Omit<IPost, 'id'> = {
            title: `New Post Title`,
            body: `New Post Body`
        }
        const res = await postsApi.addPost(newPost);
        dispatch(postActions.addPost(res))
    }

    useEffect(() => {
        fetchPosts()
    }, []);

    return (
        <View>
            <View style={styles.addNewButton}>
                <Button onPress={onPressAddNewPost} title="Add New Post"/>
            </View>
            {posts?.length > 0 && (
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={posts}
                    keyExtractor={(item, index) => 'key' + item.id}
                    renderItem={({item, index}) => <PostCard item={item} key={item.id}/>}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    addNewButton: {
        zIndex: 10,
        position: 'absolute',
        marginVertical: 10,
        marginHorizontal: 5,
        bottom: 0,
        right: 0,
        width: 200,
    }
})

export default PostsListScreen;