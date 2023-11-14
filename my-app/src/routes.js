import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/login';
import Cadastro from  './screens/cadastro'; 

const Menu = createNativeStackNavigator();

export default function Rotas() {
  return (
    <NavigationContainer>
      <Menu.Navigator>
        <Menu.Screen name="Login" component={Login} options={{ headerShown: false }}/>
        <Menu.Screen name="Cadastro" component={Cadastro}  />
      </Menu.Navigator>
    </NavigationContainer>
  );
}