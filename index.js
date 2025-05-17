import 'react-native-url-polyfill/auto';
import { registerRootComponent } from 'expo';
import { AppRegistry } from 'react-native';
import App from './App';

// Expo ve React Native için bileşeni kaydet
if (registerRootComponent) {
  registerRootComponent(App);
} else {
  AppRegistry.registerComponent('main', () => App);
}