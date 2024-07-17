import React, { useEffect } from 'react';
import { FlatList, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { postActions } from '../../entity/post/slices/post.slice.ts';
import { postsApi } from '../../entity/post/api/postsApi.ts';
import { PostCard } from '../../entity/post';
import { getPostsSelector } from '../../entity/post/selectors';

const PostsListScreen = () => {
    const dispatch = useDispatch()
    const posts = useSelector(getPostsSelector);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const {posts} = await postsApi.getPosts();
                dispatch(postActions.setPosts(posts))
            } catch (e) {
                console.log(e)
            }
        }

        (async () => {
            await fetchPosts();
        })()
    }, []);

    return (
        <View>
            {posts?.length > 0 && (
                <FlatList
                    keyboardShouldPersistTaps={'handled'}
                    showsVerticalScrollIndicator={false}
                    data={posts}
                    keyExtractor={(item) => 'key' + item.id}
                    renderItem={({item}) => <PostCard item={item} key={item.id}/>}
                />
            )}
        </View>
    );
};


export default PostsListScreen;