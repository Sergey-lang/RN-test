import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppStacks, RootStackParamList } from '../types/navigation.ts';
import MainStack from '../stacks/MainStack.tsx';

const RootStack = createNativeStackNavigator<RootStackParamList>();
const Navigation = () => {
    return (
        <NavigationContainer>
            <RootStack.Navigator screenOptions={{ headerShown: false }}>
                <RootStack.Screen name={AppStacks.MAIN} component={MainStack} />
            </RootStack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation;