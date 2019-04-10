import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import IntroSlider from './screens/IntroSlider';
import Base from './screens/Base';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import FillProfileFirst from './screens/FillProfileFirst';
import FillProfileSecond from './screens/FillProfileSecond';
import FillProfileAnalysis from './screens/FillProfileAnalysis';

const rootStack = createStackNavigator({
  IntroSlider: IntroSlider,
  Base: Base,
  Login: Login,
  SignUp: SignUp,
  FillProfileFirst: FillProfileFirst,
  FillProfileSecond: FillProfileSecond,
  FillProfileAnalysis: FillProfileAnalysis
},{
  initialRouteName: 'FillProfileFirst',
  headerMode: 'none'
});

const AppContainer = createAppContainer(rootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}