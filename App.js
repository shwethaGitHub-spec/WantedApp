import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import WelcomeScreen from './screens/WelcomeScreen';
import SignUpScreen from './screens/SignUpScreen';
import CriminalListScreen from './screens/CriminalListScreen';
import CriminalDetailsScreen from './screens/CriminalDetailsScreen';
import InformationScreen from './screens/InformationScreen';
import SettingScreen from './screens/SettingScreen';
import EditCriminalScreen from './screens/EditCriminalScreen';
import ReportCriminalScreen from './screens/ReportCriminalScreen';
import { Asset } from 'expo-asset';
import { AppLoading } from 'expo';
//import { AppTabNavigator } from './components/AppTabNavigator'
//import { AppDrawerNavigator } from './components/AppDrawerNavigator'

function cacheImages(images) {
  return images.map((image) => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isReady: false,
    };
  }

  async _loadAssetsAsync() {
    const imageAssets = cacheImages([require('./assets/draw.png')]);
    await Promise.all([...imageAssets]);
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }
    return <AppContainer />;
  }
}

const switchNavigator = createSwitchNavigator({
  WelcomeScreen: { screen: WelcomeScreen },
  SignUpScreen: { screen: SignUpScreen },
  CriminalListScreen: { screen: CriminalListScreen },
  InformationScreen: { screen: InformationScreen },
  SettingScreen: { screen: SettingScreen },
  CriminalDetailsScreen: { screen: CriminalDetailsScreen },
  ReportCriminalScreen: { screen: ReportCriminalScreen },
  EditCriminalScreen: { screen: EditCriminalScreen },
});

const AppContainer = createAppContainer(switchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
