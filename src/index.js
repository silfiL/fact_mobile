import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import IntroSlider from './screens/IntroSlider';
import Base from './screens/Base';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import ForgetPassword from './screens/ForgetPassword';
import ResetPassword from './screens/ResetPassword';
import FillProfileFirst from './screens/FillProfileFirst';
import FillProfileSecond from './screens/FillProfileSecond';
import FillProfileAnalysis from './screens/FillProfileAnalysis';
import FirstTimeSTrain from './screens/FirstTimeSTrain';
import AddFood from './screens/AddFood';
import RecentFood from './screens/RecentFood';
import CategoryList from './screens/CategoryList';
import ViewCategory from './screens/ViewCategory';
import EditProfile from './screens/EditProfile';
import ChangePassword from './screens/ChangePassword';

const rootStack = createStackNavigator({
  IntroSlider: IntroSlider,
  Base: Base,
  Login: Login,
  SignUp: SignUp,
  ForgetPassword: ForgetPassword,
  ResetPassword: ResetPassword,
  FillProfileFirst: FillProfileFirst,
  FillProfileSecond: FillProfileSecond,
  FillProfileAnalysis: FillProfileAnalysis,
  FirstTimeSTrain: FirstTimeSTrain,
  AddFood: AddFood,
  RecentFood: RecentFood,
  CategoryList: CategoryList,
  ViewCategory: ViewCategory,
  EditProfile: EditProfile,
  ChangePassword: ChangePassword
},{
  initialRouteName: 'RecentFood',
  headerMode: 'none'
});

const AppContainer = createAppContainer(rootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}