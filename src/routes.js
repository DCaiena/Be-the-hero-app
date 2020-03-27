import React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack'
// import { Container } from './styles';
import { NavigationContainer } from '@react-navigation/native'

import Incidents from './pages/Incidents'
import Details from './pages/Detail'


const AppStack = createStackNavigator()

export default function Routes() {
  return (
    <NavigationContainer>
        <AppStack.Navigator screenOptions={{headerShown:false}}>
            <AppStack.Screen name={'incident'} component={Incidents} />
            <AppStack.Screen name={'detail'} component={Details} />

        </AppStack.Navigator>
    </NavigationContainer>
  );
}
