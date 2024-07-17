import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { IPost } from '../../entity/post';
import { postsApi } from '../../entity/post/api/postsApi.ts';
import { postActions } from '../../entity/post/slices/post.slice.ts';
import { useDispatch } from 'react-redux';

const HeaderRight = () => {
    const dispatch = useDispatch()
    const onPressAddNewPost = async () => {
        const newPost: Omit<IPost, 'id'> = {
            title: `New Post Title`,
            body: `New Post Body`
        }
        const res = await postsApi.addPost(newPost);
        dispatch(postActions.addPost(res))
    }
    return (
        <View>
            <Button onPress={onPressAddNewPost} title={'Add New'}/>
        </View>
    );
};

export default HeaderRight;