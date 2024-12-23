import {View, Text, Image} from 'react-native';
import React, {useEffect} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import ScreenNameEnum from '../../routes/screenName.enum';

export default function WELCOME_SCREEN() {
  const navigation = useNavigation();

  const isLogOut = useSelector(state => state.auth.isLogOut);
  const isLogin = useSelector(state => state.auth.isLogin);

  const isFocus = useIsFocused();
  console.log('================splash screen====================');
  const checkLogout = () => {
    if ((!isLogOut && !isLogin) || (isLogOut && !isLogin)) {
      console.log('================Login====================');
      navigation.navigate(ScreenNameEnum.LOGIN_SCREEN);
    }
    if (!isLogOut && isLogin) {
      console.log('================HomeTab====================');

      navigation.navigate(ScreenNameEnum.BOTTOM_TAB);
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate(ScreenNameEnum.Splash);
     // checkLogout()
    }, 3000); // 3000ms = 3 seconds

    // Cleanup the timer when the component is unmounted or `isFocus` changes
    return () => clearTimeout(timer);
  }, [isFocus, navigation]);


  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Image
        source={require('../../assets/Cropping/LOGO.png')}
        style={{height: 200, width: 200}}
        resizeMode="contain"
      />
      <View style={{position:'absolute',bottom:20}}>
        <Text style={{fontSize:14,color:'#000',fontWeight:'500'}}>AI-powered social media</Text>
      </View>
    </View>
  );
}
