
    import {View, Text, Image, ImageBackground, TouchableOpacity} from 'react-native';
    import React, {useEffect} from 'react';
    import {useIsFocused, useNavigation} from '@react-navigation/native';
    import {useSelector} from 'react-redux';
    import ScreenNameEnum from '../../routes/screenName.enum';
import { hp } from '../../utils/Constant';
    
    export default function Splash() {
      const navigation = useNavigation();
    
      const isLogOut = useSelector(state => state.auth.isLogOut);
      const isLogin = useSelector(state => state.auth.isLogin);
    
      const isFocus = useIsFocused();
      console.log('================splash screen====================');


    

      return (
        <ImageBackground source={require('../../assets/Cropping/Welcome.png')}
            style={{flex:1}}
          >
          
       <TouchableOpacity 
       onPress={()=>{
        navigation.navigate(ScreenNameEnum.LOGIN_SCREEN)
       }}
       style={{position:'absolute',bottom:-30,height:hp(15),width:'100%'}}>
        <Image   source={require('../../assets/Cropping/button.png')} style={{height:'100%',width:'100%'}} resizeMode='contain'/>
       </TouchableOpacity>
        </ImageBackground>
      );
    }
    