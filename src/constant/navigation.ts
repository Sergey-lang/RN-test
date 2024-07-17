import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { Colors } from 'react-native/Libraries/NewAppScreen';

type StacksKeyNameType = 'MAIN';
export const stackOptionsProperty: Record<StacksKeyNameType, NativeStackNavigationOptions> = {
    MAIN: {
        animation: 'none',
        headerShadowVisible: false,
        headerTintColor: Colors.GRAY_200,
        headerStyle: {
            backgroundColor: Colors.GRAY_200,
        },
    },
};