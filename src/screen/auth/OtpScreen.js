import { View, Text, Image, TouchableOpacity, Platform, StyleSheet, ScrollView, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import React, { useState } from 'react';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from
  'react-native-confirmation-code-field';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import ScreenNameEnum from '../../routes/screenName.enum';
import { validOtp } from '../../redux/feature/authSlice';
import Loading from '../../utils/Loader';

export default function OtpScreen({ route }) {

  const forgotData = useSelector(state => state.auth.forgotData)
  const navigation = useNavigation();
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: 4 });
  const isLoading = useSelector(state => state.auth.isLoading);
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const dispatch = useDispatch();

  console.log('forgotData', forgotData);
  const ValidOtp = () => {

    const params = {

      user_id: forgotData?.data,
      otp: value,


      navigation: navigation,
    };
    dispatch(validOtp(params))
  }



  return (
    <View style={{ flex: 1, paddingHorizontal: 10, backgroundColor: '#fff' }}>
      {isLoading ? <Loading /> : null}
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
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
          <View style={{ height: hp(15), marginTop: 5 }}>
            <View style={{ marginTop: 25, alignItems: 'center' }}>
              <Text
                style={{
                  fontWeight: '700',
                  fontSize: 24,
                  lineHeight: 28,
                  color: '#000000',
               
                }}>
                Check your mail or check your cell phone
              </Text>
            </View>
            <View style={{ marginTop: 5,marginLeft:10 }}>
              <Text
                style={{
                  fontWeight: '400',
                  fontSize: 14,
                  lineHeight: 24,
                  color: '#9DB2BF',
                }}>
                Please put the 4 digits sent to you
              </Text>
            </View>
          </View>
          <View
            style={{ height: hp(10), width: '50%', marginTop: 20, alignSelf: 'center' }} >
            <CodeField
              ref={ref}
              {...props}

              value={value}
              onChangeText={setValue}
              cellCount={4}
              rootStyle={{}}

              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={({ index, symbol, isFocused }) => (
                <View style={{ backgroundColor: '#E9E9E9', borderRadius: 15, }}>


                  <Text
                    key={index}
                    style={[styles.cell, isFocused && styles.focusCell]}
                    onLayout={getCellOnLayoutHandler(index)}>
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </Text>
                </View>
              )}
            />
          </View>
          <View style={{ alignItems: 'center', justifyContent: 'center', height: hp(31) }}>
            <Image   source={require('../../assets/Cropping/I23x.png')} 
resizeMode='contain'
style={{height:'100%',width:'90%'}}/>
          </View>
        </ScrollView>

        <TouchableOpacity onPress={() => {
           navigation.navigate(ScreenNameEnum.CREATE_PASSWORD)
        //  ValidOtp()
        }}>
             <LinearGradient

colors={['#3A4DFB', '#FF2E7B',]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }} // Horizontal gradient

            style={styles.btn}>



            <Text
              style={{
                color: '#FFF',
                fontSize: 17,
                fontWeight: '700',
                lineHeight: 21,
              }}>
              Submit
            </Text>

          </LinearGradient>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}


const styles = StyleSheet.create({

  btn: {
    alignSelf: 'center',
    backgroundColor: '#352C48',
    height: 55,
    width: '100%',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',

    borderBottomWidth: 0.5,
    borderColor: '#7756FC',
    marginTop: '50%'
  },
  codeFieldRoot: { marginTop: 20, },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: '#E9E9E9',
    textAlign: 'center',
    color: '#000',
    borderRadius: 10,
    // backgroundColor:'#E9E9E9',

  },
  focusCell: {
    borderColor: '#b359cf',

    borderRadius: 10,

  },
});



