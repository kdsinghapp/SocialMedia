import { View, Text, Image, TextInput, TouchableOpacity, Alert, ScrollView, Platform, StyleSheet, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {
  NavigationHelpersContext,
  useNavigation,
} from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { CreateNewPassword } from '../../redux/feature/authSlice';
import TextInputField from '../../utils/TextInputField';
import LinearGradient from 'react-native-linear-gradient';
import { styles } from '../../utils/Styles';
import ScreenNameEnum from '../../routes/screenName.enum';
import Loading from '../../utils/Loader';




export default function CreatePassword({ route }) {

  const forgotData = useSelector(state => state.auth.forgotData)
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigation = useNavigation();
  const isLoading = useSelector(state => state.auth.isLoading);
  const dispatch = useDispatch()
  const handlePassText = value => {
    setPassword(value);
  };
  const handleCPassText = value => {
    setConfirmPassword(value);
  };


  const createNewPassword = () => {

    if (password === ConfirmPassword) {
      if (password.length < 8) 
      return Alert.alert(
        'Password',
        'The password field must be at least 8 characters.',
      );

      setError('')
      const params = {

        email: forgotData?.email,
        password: password,
        confirm_password: password,
        navigation: navigation,


      };
      dispatch(CreateNewPassword(params))



    }
    else {
      setError('')
      Alert.alert(
        'Password',
        'Password and confirm password does not match.',

      );
    }
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: '#fff', paddingHorizontal: 10 }}>

        {isLoading ? <Loading /> : null}
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flex: 1 }}>


          <TouchableOpacity
            style={{ marginTop: 15, width: '15%', padding: 10 }}
            onPress={() => {
              navigation.goBack();
            }}>
            <Image
               source={require('../../assets/Cropping/Back2x.png')}
              style={{ height: 32, width: 32 }}
            />
          </TouchableOpacity>
          <View style={{ marginTop: 15,marginLeft:10 }}>
            <View style={{ height: hp(9),  }}>
              <View>
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: '700',
                    color: '#000000',
                    lineHeight: 36,
                  }}>Create New Password
                </Text>
              </View>
              <View style={{ width: '85%',  }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '400',
                    color: '#9DB2BF',
                    lineHeight: 24,
                
                  }}>
                  Your new password must be different from previous used passwords.
                </Text>
              </View>
            </View>

            <View style={{ marginTop: hp(6), padding:10,marginLeft:-15 }}>
              <TextInputField
                onChangeText={handlePassText}
                hide={true}
                firstLogo={true} name={'New Password'} placeholder={'Password'}
                img={require('../../assets/Cropping/Lock2x.png')} showEye={true} />
              <TextInputField
                hide={true}
                onChangeText={handleCPassText}
                firstLogo={true} name={'New Confirm Password'} placeholder={'Confirm Password'}
                img={require('../../assets/Cropping/Lock2x.png')} showEye={true} />
            </View>
          </View>
          <View style={{ height: hp(5), paddingHorizontal: 5 }}>
            {error != '' && <Text style={{ fontSize: 12, color: 'red', fontWeight: '400' }}>{error}</Text>}
          </View>



        </ScrollView>

        <TouchableOpacity onPress={() => {
          navigation.navigate(ScreenNameEnum.LOGIN_SCREEN)
         // createNewPassword()
        }}>
          <LinearGradient

colors={['#3A4DFB', '#FF2E7B',]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }} // Horizontal gradient

            style={styles1.btn}>



            <Text
              style={{
                color: '#FFF',
                fontSize: 17,
                fontWeight: '700',
                lineHeight: 21,
              }}>
              Save
            </Text>

          </LinearGradient>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}


const styles1 = StyleSheet.create({
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
    position: 'absolute',
    bottom: 20
  },
})