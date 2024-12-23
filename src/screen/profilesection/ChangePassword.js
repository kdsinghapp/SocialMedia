
import { View, Text, Image, TextInput, TouchableOpacity, Alert, ScrollView, Platform, StyleSheet, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {
    NavigationHelpersContext,
    useNavigation,
} from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Change_password, CreateNewPassword } from '../../redux/feature/authSlice';
import TextInputField from '../../utils/TextInputField';
import LinearGradient from 'react-native-linear-gradient';
import { styles } from '../../utils/Styles';
import ScreenNameEnum from '../../routes/screenName.enum';
import MyStatusBar from '../../utils/MyStatusBar';
import HeaderTwo from '../../utils/Header';
import MyText from '../../utils/MyText';
import Loading from '../../utils/Loader';




export default function ChangePassword({ route }) {

    const user = useSelector((state) => state.auth.userData);
    const [ConfirmPassword, setConfirmPassword] = useState('');
    const [password, setPassword] = useState('');
    const [oldpassword, setOldPassword] = useState('');
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


    const _change_password = () => {

        if (password === ConfirmPassword) {
            if (password.length < 8)
                return Alert.alert(
                    'Password',
                    'The password field must be at least 8 characters.',
                );

            setError('')
            const params = {


                email: user?.email,
                old_password: oldpassword,
                password: password,
                confirm_password: ConfirmPassword,
                navigation: navigation,

            };
            dispatch(Change_password(params))



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
            {isLoading?<Loading />:null}
            <View style={{
                flex: 1,
                backgroundColor: '#fff',
            }}>
                <MyStatusBar backgroundColor={"transparent"} barStyle={"dark-content"} />
                <HeaderTwo back={true} navigation={navigation} title={"Change Password"} />


                <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, backgroundColor: "#fff", padding: 20 }}>
                    <View style={{
                        paddingHorizontal: 12, paddingVertical: 5,
                        height: 65,
                        borderWidth: 1, borderColor: '#FF4D9A', borderRadius: 15
                    }}>
                        <MyText h6 bold style={{ color: "#FF4D9A" }}>
                            {"Current Password"}
                        </MyText >
                        <TextInput secureTextEntry={true} value={oldpassword} keyboardType="default" onChangeText={(e) => setOldPassword(e)} style={{ width: "100%", borderRadius: 10 }} placeholder='*****' placeholderTextColor={"#000"} />
                    </View>
                    <View style={{
                        paddingHorizontal: 12, paddingVertical: 5, marginTop: 20,
                        height: 65,
                        borderWidth: 1, borderColor: "#FF4D9A", borderRadius: 15
                    }}>
                        <MyText h6 bold style={{ color: "#FF4D9A" }}>
                            {"New Password"}
                        </MyText >
                        <TextInput secureTextEntry={true} value={password} keyboardType="default" onChangeText={(e) => setPassword(e)} style={{ width: "100%", borderRadius: 10 }} placeholder='*****' placeholderTextColor={"#000"} />
                    </View>

                    <View style={{
                        paddingHorizontal: 12, paddingVertical: 5, marginTop: 20,
                        height: 65,
                        borderWidth: 1, borderColor: "#FF4D9A", borderRadius: 15
                    }}>
                        <MyText h6 bold style={{ color: "#FF4D9A" }}>
                            {"Confirm New Password"}
                        </MyText >
                        <TextInput secureTextEntry={true} value={ConfirmPassword} keyboardType="default" onChangeText={(e) => setConfirmPassword(e)} style={{ width: "100%", borderRadius: 10 }} placeholder='*****' placeholderTextColor={"#000"} />
                    </View>
                </ScrollView >

                <TouchableOpacity onPress={() => {

                    _change_password()
                }} style={{ paddingHorizontal: 15 }}>
                    <LinearGradient

                        colors={['#FF4D9A', '#5C0B9E',]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }} // Horizontal gradient

                        style={[styles1.btn, {}]}>



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