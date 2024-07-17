import React, { useState } from 'react';
import { Button, Keyboard, StyleSheet, TextInput, View } from 'react-native';
import Colors from '../../../../styles/colors.ts';
import { postActions } from '../../slices/post.slice.ts';
import { AppRoutes } from '../../../../types/navigation.ts';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { postsApi } from '../../api/postsApi.ts';
import { IPost } from '../../types';
import { CommentsWrapper } from '../CommentsWrapper/CommentsWrapper.tsx';

export const PostCard = ({item}: { item: IPost }) => {
    const dispatch = useDispatch()
    const navigation: NavigationProp<ParamListBase> = useNavigation();
    const {id, title, body} = item;
    const [inputTitle, setInputTitle] = useState<string>(title);
    const [inputBody, setInputBody] = useState<string>(body);
    const [borderColor, setBorderColor] = useState<string>(Colors.GRAY_100);
    const [borderWidth, setBorderWidth] = useState<number>(1);
    const [isEditable, setIsEditable] = useState<boolean>(false);
    const [isOpenedComments, setIsOpenedComments] = useState<boolean>(false);
    const onPressOpenPost = () => navigation.navigate(AppRoutes.SINGLE_POST, item);

    const onPressRemovePost = async () => {
        try {
            await postsApi.removePost(id);
            dispatch(postActions.removePost(id))
        } catch (e) {
            console.log(e)
        }
    }

    const onPressOpenComments = async () => {
        setIsOpenedComments((prev) => !prev);
    }

    const onPressMakeEditable = async () => {
        setIsEditable(!isEditable)
        if (!isEditable) {
            setBorderColor(Colors.ACCENT)
        }

        if (isEditable) {
            const updatePost = {id, title: inputTitle, body: inputBody};
            try {
                const resp = await postsApi.updatePost(updatePost)
                dispatch(postActions.updatePost(resp));
                setBorderColor(Colors.GRAY_100);
                setBorderWidth(1);
            } catch (e) {
                console.log(e)
            }
        }
    }

    return (
        <View style={styles.card}>
            <View style={styles.controls}>
                <Button onPress={onPressMakeEditable} title={isEditable ? 'Save' : 'Edit'}/>
                <Button onPress={onPressRemovePost} title={'X'}/>
            </View>
            <View style={[{borderColor, borderWidth}, styles.content]}>
                <TextInput
                    editable={isEditable}
                    multiline
                    style={styles.title}
                    value={inputTitle}
                    onChangeText={setInputTitle}
                />
                <TextInput
                    editable={isEditable}
                    multiline
                    style={styles.body}
                    value={inputBody}
                    onChangeText={setInputBody}
                />
            </View>
            <View style={styles.view}>
                <Button onPress={onPressOpenComments} title="Comments"/>
                <Button onPress={onPressOpenPost} title="View Post"/>
            </View>
            {isOpenedComments && (
                <CommentsWrapper postId={id}/>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        shadowColor: 'rgba(94,94,94,0.38)',
        shadowOpacity: 0.5,
        shadowOffset: {width: 0, height: 3},
        shadowRadius: 6,
        elevation: 4,
        borderRadius: 6,
        paddingVertical: 20,
        paddingHorizontal: 10,
        gap: 10,
    },
    controls: {
        flexDirection: 'row',
        marginLeft: 'auto',
        gap: 10
    },
    content: {},
    title: {
        color: Colors.BLACK,
        fontSize: 24,
    },
    body: {
        fontSize: 16,
        color: Colors.BLACK,
    },
    view: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
})