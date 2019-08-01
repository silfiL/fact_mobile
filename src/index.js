import React from "react";
import { StatusBar } from "react-native";
import { createStackNavigator, createAppContainer, createSwitchNavigator } from "react-navigation";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
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
import ViewArticle from './screens/ViewArticle';
import TrackActivity from './screens/TrackActivity';
import EditProfile from './screens/EditProfile';
import ChangePassword from './screens/ChangePassword';
import MyActivity from './screens/MyActivity';
import AddNewActivity from "./screens/AddNewActivity";
import SelfTrain from "./screens/SelfTrain";
import SelfTrainSessions from './screens/SelfTrainSessions';
import EvaluationForm from './screens/EvaluationForm';
import EvaluationAnalysis from './screens/EvaluationAnalysis';
import Splash from './screens/Splash';

import Color from './config/Color';
import SearchFoodMeal from "./screens/SearchFoodMeal";

Date.prototype.datetimeformat = function(option = "") {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Des"];
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  let year = this.getFullYear()
  let month = months[this.getMonth()]
  let day = days[this.getDay()]
  let date = (this.getDate() < 10) ? '0' + this.getDate() : this.getDate()
  let hour = (this.getHours() < 10) ? '0' + this.getHours() : this.getHours()
  let minute = (this.getMinutes() < 10) ? '0' + this.getMinutes() : this.getMinutes()
  // let second = (this.getSeconds() < 10) ? '0' + this.getSeconds() : this.getSeconds()
  let ampm = 'AM'

  if (hour >= 12) {
    hour = hour - 12
    ampm = 'PM'
  }

  if (hour === 0)
    hour = 12

  if (option === "date") return `${day}, ${date} ${month} ${year}`
  if (option === "time") return `${hour}.${minute} ${ampm}`
  return `${date} ${month} ${year} ${hour}:${minute}`
}

const HomepageTab = createMaterialBottomTabNavigator({
  Diary: { screen: Diary,
      navigationOptions: {
        tabBarLabel:"Diary",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="book" size={25} color={tintColor} />
        ),
        activeColor: Color.APP_WHITE,
        inactiveColor: Color.GREEN,
        barStyle: { backgroundColor: Color.LIGHT_GREEN },
        tabBarOnPress: ({defaultHandler}) => {
          defaultHandler()
          StatusBar.setBarStyle('light-content');
          StatusBar.setBackgroundColor(Color.GREEN, true);
          StatusBar.setTranslucent(false);
        }
      }
    },
  History: { screen: History,
      navigationOptions: {
        tabBarLabel:"History",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="history" size={25} color={tintColor} />
        ),
        activeColor: Color.APP_WHITE,
        inactiveColor: Color.BLUE,
        barStyle: { backgroundColor: Color.LIGHT_BLUE },
        tabBarOnPress: ({defaultHandler}) => {
          defaultHandler()
          StatusBar.setBarStyle('light-content');
          StatusBar.setBackgroundColor(Color.BLUE, true);
          StatusBar.setTranslucent(false);
        }
      }
    },
  Newsfeed: { screen: Newsfeed,
      navigationOptions: {
        tabBarLabel:"Newsfeed",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="commenting" size={25} color={tintColor} />
        ),
        activeColor: Color.APP_WHITE,
        inactiveColor: Color.YELLOW,
        barStyle: { backgroundColor: Color.LIGHT_YELLOW },
        tabBarOnPress: ({defaultHandler}) => {
          defaultHandler()
          StatusBar.setBarStyle('light-content');
          StatusBar.setBackgroundColor(Color.YELLOW, true);
          StatusBar.setTranslucent(false);
        }
      }
  },
  Profile: { screen: Profile,
      navigationOptions: {
        tabBarLabel:"Profile",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="user" size={25} color={tintColor} />
        ),
        tabBarOnPress: ({defaultHandler}) => {
          defaultHandler()
          StatusBar.setBarStyle('light-content');
          StatusBar.setBackgroundColor(Color.RED, true);
          StatusBar.setTranslucent(false);
        }
      }
    },
}, {
  initialRouteName: 'Diary',
  activeColor: Color.APP_WHITE,
  inactiveColor: Color.RED,
  barStyle: { backgroundColor: Color.LIGHT_RED },
});

const guessStack = createStackNavigator({
  Base: Base,
  Login: Login,
  SignUp: SignUp,
  ForgetPassword: ForgetPassword,
  ResetPassword: ResetPassword,
  FillProfileFirst: FillProfileFirst,
  FillProfileSecond: FillProfileSecond,
  FillProfileAnalysis: FillProfileAnalysis,
  FirstTimeSTrain: FirstTimeSTrain,
}, {
  initialRouteName: 'Base',
  headerMode: 'none'
})

const rootStack = createStackNavigator({
  AddFood: AddFood,
  SearchFood: SearchFood,
  RecentFood: RecentFood,
  CategoryList: CategoryList,
  ViewCategory: ViewCategory,
  Meal: Meal,
  CreateMeal: CreateMeal,
  ViewMeal: ViewMeal,
  SearchFoodMeal: SearchFoodMeal,
  AddInMeal: AddInMeal,
  ViewArticle: ViewArticle,
  TrackActivity: TrackActivity,
  EditProfile: EditProfile,
  ChangePassword: ChangePassword,
  MyActivity: MyActivity,
  AddNewActivity: AddNewActivity,
  SelfTrain: SelfTrain,
  SelfTrainSessions: SelfTrainSessions,
  EvaluationForm: EvaluationForm,
  EvaluationAnalysis: EvaluationAnalysis,
  Homepage: HomepageTab,
  FirstTimeSTrain: FirstTimeSTrain,
}, {
  initialRouteName: 'EvaluationAnalysis',
  headerMode: 'none'
});

const initApp = createSwitchNavigator({
  App1: Splash,
  App2: IntroSlider,
  App3: guessStack,
  App4: rootStack
}, {
  initialRouteName: 'App1',
  headerMode: 'none'
})

const AppContainer = createAppContainer(initApp);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
