

import { View, Text, Image, TouchableOpacity, SafeAreaView, StyleSheet, ScrollView, TextInput } from 'react-native'
import React, { useState } from 'react'

import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native'
import ScreenNameEnum from '../../routes/screenName.enum'
import { useDispatch, useSelector } from 'react-redux'

import Loading from '../../utils/Loader'
import { hp, wp } from '../../utils/Constant'


export default function ForgotPassword() {
    const navigation = useNavigation()
    const isLoading = useSelector(state => state.auth.isLoading);
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [selcted, setSlected] = useState('');

    function validateEmail(email) {
        // Regular expression for validating email format
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        // Test the email against the regular expression
        return emailRegex.test(email);
    }
    const dispatch = useDispatch()

    const Send_Otp = async () => {

        console.log('Send_Otp',selcted ,mobile);
        

        if (selcted === 'EMAIL' && email == '') return errorToast('Email field is Require');
        if (selcted === 'SMS' && mobile == '') return errorToast('SMS field is Require');

        if (!validateEmail(email)) errorToast("Invalid email address")

        const params = {

            identity:selcted === 'EMAIL'? email:mobile,
            navigation: navigation


        }

       

    }

    return (
        <SafeAreaView style={styles.container}>
            {isLoading ? <Loading /> : null}

            <ScrollView>
                      <TouchableOpacity
            style={{ marginTop: 15, width: '15%', padding:5 }}
            onPress={() => {
              navigation.goBack();
            }}>
            <Image
              source={require('../../assets/Cropping/Back2x.png')}
              style={{ height: 32, width: 32 }}
            />
          </TouchableOpacity>
                <View style={styles.innerContainer}>


                    <View style={styles.loginHeader}>
                        <Text style={styles.loginTitle}>Password Reset</Text>
                        <Text style={styles.loginSubtitle}>Please put your email or mobile number to reset your password</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 5 }}>
                        <TouchableOpacity
                        onPress={()=>{
                            setSlected('SMS')
                        }}
                        style={[styles.inputContainer, selcted !== 'SMS' &&{borderColor:'grey'}]}>
                            <Image         source={require('../../assets/Cropping/Group13.png')}
                                style={{ height: 80, width: 80 }} />
                            <Text style={styles.inputLabel}>SMS</Text>

                            <TextInput
                                style={[styles.inputLabel, {
                                    fontSize: 10, color: '#9E9E9E', backgroundColor: '#f0f0f0',
                                    width: '100%', borderRadius: 5
                                }]}
                                placeholder='enter here'
                                placeholderTextColor={'#ccc'}

                                value={mobile}
                                onChangeText={(txt) => setMobile(txt)}
                            />

                        </TouchableOpacity>
                        <TouchableOpacity 
                         onPress={()=>{
                            setSlected('EMAIL')
                        }}
                        style={[styles.inputContainer, selcted !== 'EMAIL' &&{borderColor:'grey'}]}>
                            <Image       source={require('../../assets/Cropping/Group1.png')}
                                style={{ height: 80, width: 80 }} />
                            <Text style={styles.inputLabel}>Email</Text>
                            <TextInput
                                style={[styles.inputLabel, {
                                     backgroundColor: '#f0f0f0',
                                    width: '100%', borderRadius: 5
                                }]}
                                placeholder='enter here'
                                placeholderTextColor={'#ccc'}

                                value={email}
                                onChangeText={(txt) => setEmail(txt)}
                            />

                        </TouchableOpacity>
                    </View>


                </View>
            </ScrollView>
            <TouchableOpacity onPress={() => {
             navigation.navigate(ScreenNameEnum.OTP_SCREEN)
          //  Submit()
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
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
padding:10
    },
    innerContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    logoContainer: {
        height: hp(25),
        width: wp(100),
        marginTop: hp(8),
    },
    logo: {
        height: '100%',
        width: '100%',
    },
    loginHeader: {
        marginTop: 30,
        padding: 20,
    },
    loginTitle: {
        fontSize: 24,
        fontWeight: '800',
    },
    loginSubtitle: {
        fontSize: 14,
        fontWeight: '500',
        color: '#9DB2BF',
    },
    inputContainer: {
        marginTop: 10,
        paddingHorizontal: 10,
        width: wp(42),
        borderWidth:3,
        alignItems: 'center',
        justifyContent: 'center',
        height: hp(23),
        borderRadius: 15,
        borderColor: '#009838'
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: '800',
        marginTop: 10,
        color: '#000',
        textAlign: 'center'
    },
    forgotPasswordButton: {
        alignSelf: 'center',
        marginTop: 10,
    },
    forgotPasswordText: {
        color: '#000',
        fontSize: 14,
    },
    loginButton: {
        backgroundColor: '#009838',
        marginTop: 30,
        marginHorizontal: 30,
        borderRadius: 30,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 20,
        width: wp(90)

    },
    loginButtonText: {
        fontWeight: '600',
        color: '#fff',
        fontSize: 18,
    },
    orContainer: {
        alignSelf: 'center',
        marginVertical: 20,
    },
    orText: {
        color: '#000',
        fontWeight: '600',
        fontSize: 16,
    },
    googleButton: {
        borderColor: '#EBEBEB',
        borderWidth: 2,
        flexDirection: 'row',
        marginTop: 10,
        marginHorizontal: 20,
        borderRadius: 20,
        height: 55,
        alignItems: 'center',
        justifyContent: 'center',
    },
    googleIcon: {
        height: 20,
        width: 20,
    },
    googleButtonText: {
        fontWeight: '600',
        color: '#000',
        fontSize: 16,
        marginLeft: 20,
    },
    signupContainer: {
        alignSelf: 'center',
        marginVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    signupText: {
        color: '#000',
        fontSize: 16,
        fontWeight: '600',
    },
    signupLink: {
        fontWeight: '800',
        color: '#FF4D4C',
        fontSize: 14,
        marginLeft: 5,
    },


  tab: {
    marginHorizontal: 10,

    marginTop: 10,
    height: hp(15),
    padding: 5,
    borderRadius: 10,
    shadowColor: '#000',
    backgroundColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 1,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
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
})