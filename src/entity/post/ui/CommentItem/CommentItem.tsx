import React, { useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import Colors from '../../../../styles/colors.ts';
import { postActions } from '../../slices/post.slice.ts';
import { useDispatch } from 'react-redux';
import { IComment } from '../../types';
import { commentsApi } from '../../api/commentsApi.ts';

export const CommentItem = ({item}: { item: IComment }) => {
    const dispatch = useDispatch()
    const {id, text, postId} = item;
    const [inputText, setInputText] = useState<string>(text);
    const [borderColor, setBorderColor] = useState<string>(Colors.GRAY_100);
    const [borderWidth, setBorderWidth] = useState<number>(1);
    const [isEditable, setIsEditable] = useState<boolean>(false);

    const onPressRemoveComment = async () => {
        try {
            await commentsApi.removeComment(id);
            dispatch(postActions.removePostComment({commentId: id, postId}))
        } catch (e) {
            console.log(e)
        }
    }

    const onPressMakeEditable = async () => {
        setIsEditable(!isEditable)
        if (!isEditable) {
            setBorderColor(Colors.ACCENT)
        }

        if (isEditable) {
            const updatedComment = {id, text: inputText, postId};
            try {
                const resp = await commentsApi.updateComment(updatedComment)
                dispatch(postActions.updatePostComment({postId, comment: resp}));
                setBorderColor(Colors.GRAY_100);
                setBorderWidth(1);
            } catch (e) {
                console.log(e)
            }
        }
    }

    const onPressCancel = () => {
        setIsEditable(false);
        setBorderColor(Colors.GRAY_100)
        setInputText(item.text)
    }

    return (
        <View style={styles.card}>
            <View style={styles.topControls}>
                {!isEditable && (
                    <Button onPress={onPressMakeEditable} title={'Edit'}/>
                )}
                <Button onPress={onPressRemoveComment} title={'X'}/>
            </View>
            <View style={styles.content}>
                <TextInput
                    editable={isEditable}
                    multiline
                    style={[{borderColor, borderWidth}, styles.text]}
                    value={inputText}
                    onChangeText={setInputText}
                />
                {isEditable && (
                    <View style={styles.bottomControls}>
                        <Button onPress={onPressMakeEditable} title={'Send'}/>
                        <Button onPress={onPressCancel} title={'Cancel'}/>
                    </View>
                )}
            </View>
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
    topControls: {
        flexDirection: 'row',
        marginLeft: 'auto',
        gap: 10,
    },
    content: {
        width: '100%',
        gap: 10,
    },
    text: {
        display: 'flex',
        color: Colors.BLACK,
        fontSize: 18,
    },
    body: {
        fontSize: 16,
        color: Colors.BLACK,
    },
    bottomControls: {
        flexDirection: 'row',
        marginLeft: 'auto',
        gap: 10,
    },
    view: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
})