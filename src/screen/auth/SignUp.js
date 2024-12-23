import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  BackHandler,
  TextInput,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { heightPercentageToDP, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CheckBox from 'react-native-check-box';
import ScreenNameEnum from '../../routes/screenName.enum';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { CountryPicker } from 'react-native-country-codes-picker';
import TextInputField from '../../utils/TextInputField';
import { styles } from '../../utils/Styles';
import LinearGradient from 'react-native-linear-gradient';
import { errorToast } from '../../utils/customToast';
import { register } from '../../redux/feature/authSlice';
import Loading from '../../utils/Loader';


export default function SignUp() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState('');
  const [code, setCode] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.auth.isLoading);

  const [Number, setNumber] = useState(false);
  const user = useSelector(state => state.auth.userData);
  const isFocus = useIsFocused();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const numberRegex = /^[0-9]+$/;
  const stringRegex = /^[a-zA-Z\s]*$/;
  const navigation = useNavigation();





  const handleNameText = value => {
    setName(value);
  };

  const handlePassText = value => {
    setPassword(value);
  };
  const handleCPassText = value => {
    setConfirmPassword(value);
  };
  const handleEmailText = value => {
    setEmail(value);
  };
  const handleNumText = value => {
    setNumber(value);
  };



  const setCountry = value => {
    setShow(true);
  };

  const SignUp = () => {
    if (name == '' || email == '' || password == '' || Number == '' || ConfirmPassword == '' || countryCode == '') return Alert.alert('Require', 'All field is Require');

    if (password.length < 8)
      return Alert.alert(
        'Password',
        'The password field must be at least 8 characters.',
      );


    if (password !== ConfirmPassword) return errorToast('Password or Confirm Passowrd does not match')
    const params = {
      user_name: name,
      mobile: countryCode?.dial_code + '' + Number,
      email: email,
      password: password,
      confirm_password: ConfirmPassword,
      navigation: navigation,
    };



    console.log(params);
    dispatch(register(params)).then(res => {

    })




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


          }}>
          <Image
            source={require('../../assets/Cropping/LOGO.png')}
            style={{ height: hp(7), width: '100%', marginVertical: 20 }} resizeMode='contain'
          />

          <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 30 }}>
            <Text style={styles.txtHeading}>Create Account</Text>
            <Text style={styles.txtsubHeading}>
              Fill your information below or register with your social account
            </Text>
          </View>

          <View style={{ marginTop: 10, paddingVertical: hp(2) }}>
            <TextInputField

              onChangeText={handleNameText}
              placeholder={'Name'}
              firstLogo={true}
              img={require('../../assets/Cropping/User2x.png')}

            />




            <TextInputField

              onChangeText={handleEmailText}
              placeholder={'Email Address'}
              firstLogo={true}
              type={'email-address'}
              img={require('../../assets/Cropping/Emal2x.png')}
            />

            <TextInputField
              onChangeText={handlePassText}
              placeholder={'Password'}
              firstLogo={true}
              showEye={true}
              img={require('../../assets/Cropping/Lock2x.png')}
            />
            <TextInputField
              onChangeText={handleCPassText}
              placeholder={'Confirm Password'}
              firstLogo={true}
              showEye={true}
              img={require('../../assets/Cropping/Lock2x.png')}
            />

            <CountryPicker
              show={show}
              // when picker button press you will get the country object with dial code
              pickerButtonOnPress={item => {
                setCountryCode(item);

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


          </View>


          <TouchableOpacity
            style={{ width: '100%' }}
            onPress={() => {
              SignUp();
            }}
          >

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
                Sign Up
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <View
            style={{
              height: hp(5),
              flexDirection: 'row',
              alignItems: 'center',

              alignSelf: 'center',
              marginTop: heightPercentageToDP(2),
              justifyContent: 'center',
            }}>
            <Text style={{ fontSize: 14, lineHeight: 18, color: '#909090', fontWeight: '600' }}>
              Already have an account?{' '}
            </Text>
            <TouchableOpacity
              style={{}}
              onPress={() => {
                navigation.navigate(ScreenNameEnum.LOGIN_SCREEN);
              }}>

              <Text style={Styles.text}>Login</Text>

            </TouchableOpacity>
          </View>


        </View>

      </ScrollView>


    </View>
  );
}

const Styles = StyleSheet.create({
  text: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '700',
    color: '#FF4D9A',
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
  },
});
