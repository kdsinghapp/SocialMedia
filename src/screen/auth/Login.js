import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  BackHandler,
  Platform,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';


import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { guest_login, login } from '../../redux/feature/authSlice';
import { CountryPicker } from 'react-native-country-codes-picker';

import LinearGradient from 'react-native-linear-gradient';
import TextInputField from '../../utils/TextInputField';
import ScreenNameEnum from '../../routes/screenName.enum';
import { styles } from '../../utils/Styles';
import Loading from '../../utils/Loader';
import { wp } from '../../utils/Constant';

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState('');
  const [code, setCode] = useState('');

  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.auth.isLoading);

  const [Number, setNumber] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const numberRegex = /^[0-9]+$/;
  const stringRegex = /^[a-zA-Z\s]*$/;
  const navigation = useNavigation();





  const handleIdentityText = value => {
    setEmail(value);
    if (email == '') {
      setNumber(false);
    }



    if (numberRegex.test(email)) {

      setNumber(true);
    } else if (emailRegex.test(email)) {
      setNumber(false);
    } else if (stringRegex.test(email)) {
      setNumber(false);
    }
  };
  const handlePassText = value => {
    setPassword(value);
  };
  const setCountry = value => {
    setShow(true);
  };

  const Login =async () => {
    
    if (password.length < 8) {
      return Alert.alert(
        'Password',
        'The password field must be at least 8 characters.',
      );
    }
    else {
      if (email != '' && password != '') {


          console.log('Login with Email');
          const passwordWithoutSpaces = password.replace(/\s/g, '');

          const params = {
            email: email,
            password: passwordWithoutSpaces,
            device_token:token,
            device_type: Platform.OS,
            navigation: navigation,
          };


          dispatch(login(params)).then(res => {

          })
        

        // else if (numberRegex.test(email)) {
        //   console.log('Login with Mobile ');
        //   if (code == '') return Alert.alert(
        //     'Country Code Empty',
        //     'Please Select Country Code.',
        //   );
        //   const passwordWithoutSpaces = password.replace(/\s/g, '');

        //   const params = {
        //     email: email,
        //     password: passwordWithoutSpaces,
        //     device_token: '',
        //     device_type: '',
        //     navigation: navigation,
      
        //   };

        //   dispatch(login(params));
        // }

        // else {
        //   Alert.alert(
        //     'Invalid Input',
        //     'Please enter a valid email address or number.',
        //   );
        // }
      } else {
        Alert.alert('Require', 'email or number password field empty');
      }
    }
  };





  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {isLoading ? <Loading /> : null}
      <ScrollView showsVerticalScrollIndicator={false}>


        <View
          style={{
            backgroundColor: '#FFF',

            alignItems: 'center',
            padding: 15,
            flex: 1,
            paddingTop: 40

          }}>
          <Image
            source={require('../../assets/Cropping/LOGO.png')}
            style={{ height:hp(7), width:'100%',marginVertical:20 }} resizeMode='contain'
          />
          <View style={{ alignItems: 'center', justifyContent: 'center',marginTop:30 }}>
            <Text style={styles.txtHeading}>Login</Text>
            <Text style={styles.txtsubHeading}>
              Enter your email and password
            </Text>
          </View>

          <View style={{ marginTop: 10, paddingVertical: hp(2) }}>
            <TextInputField
              County={Number}
              countryCode={countryCode}
              PickCountry={setCountry}
              onChangeText={handleIdentityText}
              placeholder={'Email Address / Mobile number'}
              firstLogo={true}
              img={Number ? require('../../assets/Cropping/Emal2x.png') : require('../../assets/Cropping/Emal2x.png')}
            />

            <TextInputField
              onChangeText={handlePassText}
              placeholder={'Password'}
              firstLogo={true}
              showEye={true}
            img={require('../../assets/Cropping/Lock2x.png')}
            />

            <CountryPicker
              show={show}
              // when picker button press you will get the country object with dial code
              pickerButtonOnPress={item => {
                setCountryCode(item.dial_code);
                setCode(item.code)
                setShow(false);
              }}
              popularCountries={['en', 'in', 'pl']}
              style={{
                // Styles for whole modal [View]
                modal: {
                  height: 400,
                },
              }}
            />

            <TouchableOpacity
              onPress={() => {
                navigation.navigate(ScreenNameEnum.ForgotPassword);
              }}
              style={{
                alignSelf: 'center',
                marginTop: 20,
                borderBottomWidth: 0.5,
                borderColor: '#FF4D9A',
              }}>
              <Text
                style={{
                  color: '#FF4D9A',
                  fontSize: 12,
                  fontWeight: '500',
                  lineHeight: 18,
                }}>
                Forgot your password?
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => {
              navigation.navigate(ScreenNameEnum.AddProfilePicture);
          
          }}
            style={{ width: '100%' }}>
            <LinearGradient

              colors={['#3A4DFB', '#FF2E7B',]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }} // Horizontal gradient
              
              style={Styles.btn}>
              <Text
                style={{
                  color: '#FFF',
                  fontSize: 17,
                  fontWeight: '700',
                  lineHeight: 21,
                }}>
                Login
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <View
              style={{
                height: hp(5),
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
                alignSelf: 'center',
width:wp(100),
                justifyContent: 'center',
              }}>
              <Text style={{ fontSize: 14, lineHeight: 24, color: '#000',}}>
                Don’t have an account?{' '}
              </Text>
              <TouchableOpacity
                style={{}}
                onPress={() => {
                  navigation.navigate(ScreenNameEnum.SIGNUP_SCREEN);
                }}>

                <Text style={Styles.text}>Sign up</Text>

              </TouchableOpacity>
            </View>

          {/* <View
            style={{ marginVertical: 15 }}
            onPress={() => {
              navigation.navigate(ScreenNameEnum.SIGNUP_SCREEN);
            }}>

            <Text style={{ color: '#000', fontWeight: '500' }}>OR</Text>

          </View>
          <TouchableOpacity
            style={{ marginTop: 20, 
              width:wp(90),
              flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            onPress={() => {
              navigation.navigate(ScreenNameEnum.SIGNUP_SCREEN);
            }}>
            <Image source={require('../../assets/Cropping/GoogleLogo.png')} style={{ height: 25, width: 25 }} />

            <Text style={{ color: '#000', fontWeight: '600', fontSize: 16, marginLeft: 20 }}>Sign In with Google</Text>

          </TouchableOpacity> */}
        </View>
        <View  style={{height:60}}/>
      </ScrollView>
    </View>
  );
}

const Styles = StyleSheet.create({
  text: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '700',
    color: '#FF2E7B',
    // backgroundColor: 'transparent',  // Transparent to allow the gradient to show
  },
  btn: {
    alignSelf: 'center',
    backgroundColor: '#352C48',
    height: 55,
    width: '100%',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    borderBottomWidth: 0.5,
    borderColor: '#7756FC',
    width:wp(90),
  },
});
