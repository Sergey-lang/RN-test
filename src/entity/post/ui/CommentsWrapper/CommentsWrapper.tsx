import React, { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { commentsApi } from '../../api/commentsApi.ts';
import { postActions } from '../../slices/post.slice.ts';
import { CommentItem } from '../CommentItem/CommentItem.tsx';
import Colors from '../../../../styles/colors.ts';
import { getCommentsSelector } from '../../selectors';

interface IProps {
    postId: number
}

export const CommentsWrapper = ({postId}: IProps) => {
    const dispatch = useDispatch()
    const comments = useSelector(getCommentsSelector);
    const [newCommentText, setNewCommentText] = useState<string>('');

    const filteredComments = comments[postId];

    const onPresSendNewComment = async () => {
        try {
            const newComment = {
                text: newCommentText,
                postId,
            }
            const res = await commentsApi.addComment(newComment)
            dispatch(postActions.addPostComment(res))
            setNewCommentText('')
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        if (!postId) return;
        const fetchComments = async () => {
            try {
                const res = await commentsApi.getComments();
                dispatch(postActions.setComments({comments: res.comments, postId}))
            } catch (e) {
                console.log(e)
            }
        }

        (async () => {
            await fetchComments();
        })()

    }, [postId]);

    return (
        <View>
            {filteredComments?.length > 0 && (
                <FlatList
                    keyboardShouldPersistTaps={'handled'}
                    data={filteredComments}
                    keyExtractor={(item) => 'key' + item.id}
                    renderItem={({item}) => <CommentItem item={item} key={item.id}/>}
                />
            )}
            <View style={styles.fieldWrapper}>
                    <TextInput
                        style={styles.messageField}
                        multiline
                        value={newCommentText}
                        onChangeText={setNewCommentText}
                    />
                <View style={styles.sendBtn}>
                    <Button onPress={onPresSendNewComment} title={'Send'} disabled={!newCommentText}/>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    fieldWrapper: {
        gap: 10,
        paddingTop: 10,
        paddingHorizontal: 10,
        alignItems: 'center',
    },
    messageField: {
        width: '100%',
        borderWidth: 1,
        borderColor: Colors.ACCENT
    },
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
    sendBtn: {
        marginLeft: 'auto',
    },
    view: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
})