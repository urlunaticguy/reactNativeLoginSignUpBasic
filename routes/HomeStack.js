import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import Welcome from "../components/Welcome";

const screens = {
  Home: {
    screen: Login,
  },
  SignUp: {
    screen: SignUp,
  },
  Welcome: {
    screen: Welcome,
  },
};

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);
