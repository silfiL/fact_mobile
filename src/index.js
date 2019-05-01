import React from "react";
import { createStackNavigator, createBottomTabNavigator ,createAppContainer } from "react-navigation";
import Icon from 'react-native-vector-icons/SimpleLineIcons'
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
import RecentFood from './screens/RecentFood';
import CategoryList from './screens/CategoryList';
import ViewCategory from './screens/ViewCategory';
import Meal from './screens/Meal';
import ViewMeal from './screens/ViewMeal';
import AddInMeal from './screens/AddInMeal';
import TrackActivity from './screens/TrackActivity';
import EditProfile from './screens/EditProfile';
import ChangePassword from './screens/ChangePassword';
import MyActivity from './screens/MyActivity';
import AddNewActivity from "./screens/AddNewActivity";
import SelfTrainSessions from './screens/SelfTrainSessions';
import EvaluationForm from './screens/EvaluationForm';

const HomepageTab = createBottomTabNavigator(
  {
    Diary: { screen: Diary,

      navigationOptions: {
        tabBarLabel:"Diary",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="book-open" size={30} color="#900" />
        ) }
    },
    History: History,
    Newsfeed: Newsfeed,
    Profile: Profile
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Icon;
        let iconName;
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
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
  RecentFood: RecentFood,
  CategoryList: CategoryList,
  ViewCategory: ViewCategory,
  Meal: Meal,
  ViewMeal: ViewMeal,
  AddInMeal: AddInMeal,
  TrackActivity: TrackActivity,
  EditProfile: EditProfile,
  ChangePassword: ChangePassword,
  MyActivity: MyActivity,
  AddNewActivity: AddNewActivity,
  SelfTrainSessions: SelfTrainSessions,
  EvaluationForm: EvaluationForm,
  Homepage: HomepageTab
},{
  initialRouteName: 'Homepage',
  headerMode: 'none'
});

const AppContainer = createAppContainer(rootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}