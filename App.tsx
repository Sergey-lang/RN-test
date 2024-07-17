/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { StatusBar, } from 'react-native';
import { StoreProvider } from './Providers/StoreProvider';
import Navigation from './src/navigation/Navigation.tsx';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function App(): React.JSX.Element {

    return (
        <StoreProvider>
            <SafeAreaProvider>
                <StatusBar/>
                <Navigation/>
            </SafeAreaProvider>
        </StoreProvider>

    );
}

export default App;
