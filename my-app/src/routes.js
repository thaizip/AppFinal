import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StatusBar, TouchableWithoutFeedback } from 'react-native';

import Login from './screens/login';
import Cadastro from './screens/cadastro';
import Perfil from './screens/perfil'
import { verificarEstadoLogin } from './service/reqFirebase';


const Tab = createMaterialTopTabNavigator();

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const icons = {
    Login: 'log-in',
    Cadastro: 'person-add',
  };

  return (
    <View style={{ flexDirection: 'row', backgroundColor: '#F0F2EB', marginTop: StatusBar.currentHeight || 0, height: 60, marginTop: 40 }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const iconName = icons[label] || 'ios-person'; // Usará 'ios-person' se não houver ícone correspondente

        return (
          <TouchableWithoutFeedback
            key={index}
            onPress={onPress}
            onLongPress={onLongPress}
          >
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Ionicons name={iconName} size={24} color={isFocused ? '#8CBEAA' : 'gray'} />
              <Text style={{ color: isFocused ? '#8CBEAA' : 'gray' }}>{label}</Text>
            </View>
          </TouchableWithoutFeedback>
        );
      })}
    </View>
  );
};

const Rotas = () => {
  const [usuarioLogado, setUsuarioLogado] = useState(null);

  useEffect(() => {
    verificarEstadoLogin((usuario) => {
      setUsuarioLogado(usuario);
    });
  }, []);

  return (
    <NavigationContainer>
      {usuarioLogado ? (
        <Tab.Navigator
          tabBar={props => <CustomTabBar {...props} />}
          screenOptions={{
            showIcon: true,
            indicatorStyle: { backgroundColor: 'green' },
          }}
        >
          <Tab.Screen name="Perfil" component={Perfil} />
        </Tab.Navigator>
      ) : (
        <Tab.Navigator
          tabBar={props => <CustomTabBar {...props} />}
          screenOptions={{
            showIcon: true,
            indicatorStyle: { backgroundColor: 'green' },
          }}
        >
          <Tab.Screen name="Login" component={Login} />
          <Tab.Screen name="Cadastro" component={Cadastro} />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Rotas;
