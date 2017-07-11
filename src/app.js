import { AppRegistry } from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';

import GoalScreen from './views/goal/goal';
import GoalListScreen from './views/list/list';
import SettingScreen from './views/setting/setting';

const GoalNavigator = StackNavigator({
  Goal: { screen: GoalScreen },
});

const SettingNavigator = StackNavigator({
  Setting: { screen: SettingScreen }
});

const GoalListNavigator = StackNavigator({
  GoalList: { screen: GoalListScreen }
});

const MyDrawerNavigator = DrawerNavigator({
  GoalStack: {
    screen: GoalNavigator,
  },
  GoalListStack: {
    screen: GoalListNavigator,
  },
  SettingStack: {
    screen: SettingNavigator
  },
});

export const Goalish = StackNavigator({
  Drawer: { screen: MyDrawerNavigator },
}, {
    headerMode: 'none',
});

AppRegistry.registerComponent('Goalish', () => Goalish);

