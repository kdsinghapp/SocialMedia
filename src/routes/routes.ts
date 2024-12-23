

// import IniializeData from '../screens/WelcomeScreen/IniializeData';

import TabNavigator from "../navigators/TabNavigator";

import Login from "../screen/auth/Login";
import OtpScreen from "../screen/auth/OtpScreen";

import SignUp from "../screen/auth/SignUp";
import WELCOME_SCREEN from "../screen/auth/WELCOME_SCREEN";
import CreatePassword from "../screen/auth/createPassword";

import ScreenNameEnum from "./screenName.enum";
import ForgotPassword from "../screen/auth/ForgotPassword";
import Home from "../screen/bottomtab/Home";
import Setting from "../screen/bottomtab/Setting";
import BattingHistory from "../screen/bottomtab/BattingHistory";
import EditProfile from "../screen/profilesection/EditProfile";
import ChangePassword from "../screen/profilesection/ChangePassword";
import Notification from "../screen/profilesection/Notification";
import FAQ from "../screen/profilesection/Faq";
import About from "../screen/profilesection/AboutUs";
import Privacy from "../screen/profilesection/PrivacyPolicy";
import Wallet from "../screen/features/Wallet";
import Splash from "../screen/auth/Splash";
import AddProfilePicture from "../screen/auth/AddProfilePicture";

const _routes = {
  REGISTRATION_ROUTE: [
    {
      name: ScreenNameEnum.SPLASH_SCREEN,
      Component:WELCOME_SCREEN,
    },
    {
      name: ScreenNameEnum.Splash,
      Component:Splash,
    },
    {
      name: ScreenNameEnum.LOGIN_SCREEN,
      Component:Login,
    },
    {
      name: ScreenNameEnum.SIGNUP_SCREEN,
      Component:SignUp,
    },
    {
      name: ScreenNameEnum.ForgotPassword,
      Component:ForgotPassword,
    },
    {
      name: ScreenNameEnum.OTP_SCREEN,
      Component:OtpScreen,
    },
    {
      name: ScreenNameEnum.CREATE_PASSWORD,
      Component:CreatePassword,
    },
    {
      name: ScreenNameEnum.AddProfilePicture,
      Component:AddProfilePicture,
    },
    
    
    
  ],
  CART_ROUTE: [
    
    
   
    
  ],


  BOTTOMTAB_ROUTE:[
    // {
    //   name: ScreenNameEnum.HOME_SCREEN,
    //   Component:Home,
    //   logo:require('../assets/Cropping/Home2x.png'),
    //   label:'Home'

    // },
    // {
    //   name: ScreenNameEnum.BATTING_HISTORY,
    //   Component:BattingHistory,
    //   logo:require('../assets/Cropping/clock2x.png'),
    //   label:'Betting History'
    // },
    // {
    //   name: ScreenNameEnum.SETTING_SCREEN,
    //   Component:Setting,
    //   logo:require('../assets/Cropping/setting2x.png'),
    //   label:'Setting'
    // },
    
  ]

};

export default _routes;
