import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createIconSetFromIcoMoon } from '@expo/vector-icons';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

import Home from './src/pages/Home';
import Squads from './src/pages/Squads';
import AdicionaSquads from './src/pages/AdicionaSquads';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const iconsConfig = {
  Home: {
    name: 'pokedex',
    fontFile: require('./assets/fonts/pokedex/pokedex.ttf'),
    jsonFile: require('./assets/fonts/pokedex/selection.json'),
  },
  Squads: {
    name: 'pokeball',
    fontFile: require('./assets/fonts/pokeball/pokeball.ttf'),
    jsonFile: require('./assets/fonts/pokeball/selection.json'),
  },
};

function loadFonts() {
  const fontPromises = Object.values(iconsConfig).map(async (icon) => {
    await Font.loadAsync({
      [icon.name]: icon.fontFile,
    });
  });

  return Promise.all(fontPromises);
}

function CustomIcon({ name, color, size }) {
  const config = iconsConfig[name];
  const CustomIconSet = createIconSetFromIcoMoon(config.jsonFile, config.name, 'custom-icons.ttf');

  return <CustomIconSet name={config.name} color={color} size={size} />;
}

function Tabs() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadAsyncData = async () => {
      await loadFonts();
      setFontsLoaded(true);
    };

    loadAsyncData();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ED1D24" />
      </View>
    );
  }

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          return <CustomIcon name={route.name} color={color} size={size} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#ED1D24',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Squads" component={Squads} />      
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Tabs} options={{ headerShown: false }} />
        <Stack.Screen name="AdicionaSquads" component={AdicionaSquads} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});