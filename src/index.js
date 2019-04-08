import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import IntroSlider from './screens/IntroSlider';
import Base from './screens/Base';
import Login from './screens/Login';
import SignUp from './screens/SignUp';

const rootStack = createStackNavigator({
  IntroSlider: IntroSlider,
  Base: Base,
  Login: Login,
  SignUp: SignUp
},{
  initialRouteName: 'Base',
  headerMode: 'none'
});

const AppContainer = createAppContainer(rootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}