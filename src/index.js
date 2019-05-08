import React from "react";
import { createStackNavigator, createBottomTabNavigator ,createAppContainer } from "react-navigation";
import Icon from 'react-native-vector-icons/FontAwesome'
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
import Diary from './screens/Diary';
import History from './screens/History';
import Newsfeed from './screens/Newsfeed';
import Profile from './screens/Profile';
import AddFood from './screens/AddFood';
import SearchFood from './screens/SearchFood';
import RecentFood from './screens/RecentFood';
import CategoryList from './screens/CategoryList';
import ViewCategory from './screens/ViewCategory';
import Meal from './screens/Meal';
import CreateMeal from './screens/CreateMeal';
import ViewMeal from './screens/ViewMeal';
import AddInMeal from './screens/AddInMeal';
import TrackActivity from './screens/TrackActivity';
import EditProfile from './screens/EditProfile';
import ChangePassword from './screens/ChangePassword';
import MyActivity from './screens/MyActivity';
import AddNewActivity from "./screens/AddNewActivity";
import SelfTrain from "./screens/SelfTrain";
import SelfTrainSessions from './screens/SelfTrainSessions';
import EvaluationForm from './screens/EvaluationForm';
import EvaluationAnalysis from './screens/EvaluationAnalysis';

const HomepageTab = createBottomTabNavigator(
  {
    Diary: { screen: Diary,
      navigationOptions: {
        tabBarLabel:"Diary",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="book" size={30} color={tintColor} />
        ) }
    },
    History: { screen: History,
      navigationOptions: {
        tabBarLabel:"History",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="history" size={30} color={tintColor} />
        ) }
    },
    Newsfeed: { screen: Newsfeed,
      navigationOptions: {
        tabBarLabel:"Newsfeed",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="commenting" size={30} color={tintColor} />
        ) }
    },
    Profile: { screen: Profile,
      navigationOptions: {
        tabBarLabel:"Profile",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="user" size={30} color={tintColor} />
        ) }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: '#42f44b',
      inactiveTintColor: 'gray',
    },
  }
);

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
  SearchFood: SearchFood,
  RecentFood: RecentFood,
  CategoryList: CategoryList,
  ViewCategory: ViewCategory,
  Meal: Meal,
  CreateMeal: CreateMeal,
  ViewMeal: ViewMeal,
  AddInMeal: AddInMeal,
  TrackActivity: TrackActivity,
  EditProfile: EditProfile,
  ChangePassword: ChangePassword,
  MyActivity: MyActivity,
  AddNewActivity: AddNewActivity,
  SelfTrain: SelfTrain,
  SelfTrainSessions: SelfTrainSessions,
  EvaluationForm: EvaluationForm,
  EvaluationAnalysis: EvaluationAnalysis,
  Homepage: HomepageTab
},{
  initialRouteName: 'CreateMeal',
  headerMode: 'none'
});

const AppContainer = createAppContainer(rootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}