import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppRoutes, PostsStackParamList } from '../../types/navigation.ts';
import Colors from '../../styles/colors.ts';

type Props = NativeStackScreenProps<PostsStackParamList, AppRoutes.SINGLE_POST>;
const SinglePostScreen = ({route}: Props) => {
    const {title, body} = route.params;
    return (
        <View>
            <View style={styles.card}>
                <View style={styles.content}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.body}>{body}</Text>
                </View>
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
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    content: {},
    title: {
        color: Colors.BLACK,
        fontSize: 24,
    },
    body: {
        fontSize: 16,
    },
    view: {
        marginLeft: 'auto',
    }
})

export default SinglePostScreen;