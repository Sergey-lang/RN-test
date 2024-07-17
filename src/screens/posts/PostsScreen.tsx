import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppRoutes, PostsStackParamList } from '../../types/navigation.ts';
import PostsListScreen from './PostsListScreen.tsx';
import SinglePostScreen from './SinglePostScreen.tsx';
import { stackOptionsProperty } from '../../constant/navigation.ts';

const Stack = createNativeStackNavigator<PostsStackParamList>();

const PostsScreen = () => {
    return (
        <Stack.Navigator screenOptions={({route}) => ({
            ...stackOptionsProperty.MAIN
        })}>
            <Stack.Screen name={AppRoutes.POSTS_LIST} component={PostsListScreen} />
            <Stack.Screen name={AppRoutes.SINGLE_POST} component={SinglePostScreen} />
        </Stack.Navigator>
    );
};

export default PostsScreen;