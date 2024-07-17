import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { posts } from '../../../db.json';
import PostCard from '../../components/PostCard/PostCard.tsx';
import axios from 'axios';

const PostsListScreen = () => {

    const fetchPosts = async () => {
        const {data} = axios.get('')
    }

    return (
        <View>
            {posts.length > 0 && (
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={posts}
                    keyExtractor={(item, index) => 'key' + index}
                    renderItem={({item, index}) => <PostCard {...item} key={index}/>}
                />
            )}
            {/*<Button title="Add"/>*/}
        </View>
    );
};

const styles = StyleSheet.create({})

export default PostsListScreen;