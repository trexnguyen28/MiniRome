/**
 * @format
 */

import {AppRegistry, UIManager} from 'react-native';
import {name as appName} from './app.json';
//
import {App} from './src/App';

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

AppRegistry.registerComponent(appName, () => App);
