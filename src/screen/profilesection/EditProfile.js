
/* eslint-disable semi */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react'
import { TextInput, View, Pressable, ScrollView, Image, Platform, Text, TouchableOpacity, StyleSheet, PermissionsAndroid } from 'react-native'

import { useNavigation } from '@react-navigation/core'
import ImagePicker from 'react-native-image-crop-picker';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { useDispatch, useSelector } from 'react-redux'
import { useFocusEffect, useIsFocused } from '@react-navigation/native'
import HeaderTwo from '../../utils/Header'
import MyStatusBar from '../../utils/MyStatusBar';
import UploadImageModal from '../../utils/UpdateProfileModal';
import LinearGradient from 'react-native-linear-gradient';
import { update_profile } from '../../redux/feature/authSlice';
import Loading from '../../utils/Loader';
import { hp } from '../../utils/Constant';

const EditProfile = ({ route }) => {
    const userDetails = []
    const user = useSelector(state => state.auth.userData);
    const navigation = useNavigation()
    const [name, setName] = useState(userDetails?.user_name)
    const [number, setNumber] = useState(userDetails?.mobile)
    const [image, setImage] = useState("")
    const [dob, setDob] = useState(userDetails?.dob)
    const [email, setEmail] = useState(userDetails?.email)
    const [loading, setLoading] = useState(false)
    const [uplaodImageModal, setUploadImageModal] = useState(false);
    const [gender, setGender] = useState(userDetails?.gender)

    const isLoading = useSelector(state => state.auth.isLoading);
    const [User, setUser] = useState([])

    const dispatch = useDispatch()
    const isFocuss = useIsFocused();
    useEffect(() => {
        get_profile()
    }, [isFocuss]);
    useEffect(() => {
        setName(User?.user_name)
        setGender(User?.gender)
        setDob(User?.dob)
        setNumber(User?.mobile)
        setEmail(User?.email)
        setImage({ path: User?.image })


    }, [User]);




    const get_profile = () => {

        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${user?.token}`);

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };




        fetch("https://server-php-8-3.technorizen.com/oneTen/api/user/profile/get-profile", requestOptions)
            .then((response) => response.text())
            .then((result) => {


                const res = JSON.parse(result)

                setUser(res?.data)
            })
            .catch((error) => {


                console.error(error)
            }
            );
    }



    const requestStoragePermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                {
                    title: 'Storage Permission',
                    message: 'This app needs access to your storage to select images.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );

            return granted
        } catch (err) {
            console.warn(err);
            return false;
        }
    };
    const _launchGallery = async () => {
        const hasPermission = await requestStoragePermission();
        if (!hasPermission) {
            Alert.alert('Permission Denied', 'You need to enable storage permissions to select images.');
            return; // Exit if permission not granted
        }

        ImagePicker.openPicker({
            width: 500,
            height: 500,
            cropping: true,
            includeExif: true,
        })
            .then(image => {
               
                   
                    setImage({ path: image?.path})
                setUploadImageModal(false);
            })
            .catch(e => {
                console.log('Image Picker Error: ', e);
                Alert.alert('Error', 'Failed to open gallery. Please try again.');
            });
    };


    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'Camera Permission',
                    message: 'This app needs access to your camera to take pictures.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );

            return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
            console.warn(err);
            return false;
        }
    }
    const _launchCamera = async () => {

        const hasPermission = await requestCameraPermission();
        if (!hasPermission) {
            console.log('Camera permission denied');
            return; // Exit if permission not granted
        }

        ImagePicker.openCamera({
            width: 500,
            height: 500,
            cropping: true,
            includeExif: true,
            useFrontCamera: true
        })
            .then(image => {

                console.log('camera=>>>>>', image);
             
                setImage({ path: image?.path})
               
                setUploadImageModal(false);
            })
            .catch(e => {
                console.log('Camera error: ', e);
            });
    };


    const _update_profile = () => {





        const params = {

            user_name: name,
            email: email,
            mobile: number,
            gender: gender,
            dob: dob,
            token: user?.token,
            image: {
                uri: image?.path,
                name: `${new Date()}.png`,
                type: 'image/jpeg'

            }

        };
        dispatch(update_profile(params))





    }




    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            {isLoading ? <Loading /> : null}
            <MyStatusBar backgroundColor={"transparent"} barStyle={"dark-content"} />
            <HeaderTwo back={true} navigation={navigation} title={"Edit Profile"} />
            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, backgroundColor: "#fff", padding: 20 }}>
                <View style={{ backgroundColor: "#fff", flex: 1 }}>
                    {image?.path &&

                        <Pressable onPress={() => setUploadImageModal(true)} style={{ borderWidth: 2, width: 100, height: 100, borderRadius: 100 / 2, borderColor: "#415893", alignSelf: "center", overflow: "hidden", marginVertical: 20 }}>
                            <Image source={{ uri: image.path }} style={{ width: "100%", height: "100%" }} />
                        </Pressable>
                    }
                    <View style={{ padding: 10, borderWidth: 1, borderColor: "#F4F5FD", borderRadius: 15, height: 65 }}>
                        <Text style={{ fontSize: 14, color: '#000', fontWeight: '600', marginLeft: 4 }}>
                            {"Full Name"}
                        </Text >
                        <TextInput value={name} keyboardType="default"

                            onChangeText={(e) => setName(e)} style={{ width: "100%", borderRadius: 10, color: '#000' }}
                            placeholder='Enter Name' placeholderTextColor={"#000"} />
                    </View>
                    <View style={{ padding: 10, marginTop: 15, borderWidth: 1, borderColor: "#F4F5FD", borderRadius: 15, height: 65 }}>
                        <Text style={{ fontSize: 14, color: '#000', fontWeight: '600', marginLeft: 4 }}>
                            {"Gender"}
                        </Text >
                        <TextInput value={gender} keyboardType="default"

                            onChangeText={(e) => setGender(e)} style={{ width: "100%", borderRadius: 10, color: '#000' }}
                            placeholder='Enter gender' placeholderTextColor={"#000"} />
                    </View>
                    <View style={{ padding: 10, marginTop: 15, borderWidth: 1, borderColor: "#F4F5FD", borderRadius: 15, height: 65 }}>
                        <Text style={{ fontSize: 14, color: '#000', fontWeight: '600', marginLeft: 4 }}>
                            {"Birthdate"}
                        </Text >
                        <TextInput value={dob} keyboardType="default"

                            onChangeText={(e) => setDob(e)} style={{ width: "100%", borderRadius: 10, color: '#000' }}
                            placeholder='Enter Birthdate' placeholderTextColor={"#000"} />
                    </View>
                    <View style={{ padding: 10, marginTop: 15, borderWidth: 1, borderColor: "#F4F5FD", borderRadius: 15, height: 65 }}>
                        <Text style={{ fontSize: 14, color: '#000', fontWeight: '600', marginLeft: 4 }}>
                            {"Email"}
                        </Text >
                        <TextInput value={email} keyboardType="default"

                            onChangeText={(e) => setEmail(e)} style={{ width: "100%", borderRadius: 10, color: '#000' }}
                            placeholder='Enter email' placeholderTextColor={"#000"} />
                    </View>
                    <View style={{ padding: 10, marginTop: 15, borderWidth: 1, borderColor: "#F4F5FD", borderRadius: 15, height: 65 }}>
                        <Text style={{ fontSize: 14, color: '#000', fontWeight: '600', marginLeft: 4 }}>
                            {"Phone Number"}
                        </Text >
                        <TextInput value={number} keyboardType="default"

                            onChangeText={(e) => setNumber(e)} style={{ width: "100%", borderRadius: 10, color: '#000' }}
                            placeholder='Enter Phone Number' placeholderTextColor={"#000"} />
                    </View>

                    {/* <View style={{ padding: 12, borderWidth: 1, borderColor: "#F4F5FD", borderRadius: 15, marginTop: 15 }}>
                        <Text style={{fontSize:16,color:'#000',fontWeight:'600'}}>
                            {"Phone Number"}
                        </Text >
                        <TextInput value={number} keyboardType="default" onChangeText={(e) => setNumber(e)} style={{ width: "100%", borderRadius: 10 }} placeholder='Enter Dob' placeholderTextColor={"#000"} />
                    </View> */}
                </View>
                <View style={{ height: 60 }} />


                <TouchableOpacity onPress={() => {

                    _update_profile()
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
                {/* <MyButton loading={loading} onPress={updateProfile} textStyle={{ fontSize: 18, fontWeight: "700", fontFamily: Theme.FONT_FAMILY_SEMIBOLD, lineHeight: 30 }} style={{ borderRadius: 16, width: "95%", alignSelf: "center", margin: 10 }} title={"Save"} /> */}
                <UploadImageModal
                    shown={uplaodImageModal}
                    onPressCamera={_launchCamera}
                    onPressGallery={_launchGallery}
                    onBackdropPress={() => setUploadImageModal(false)}
                />

                <View style={{height:hp(10)}}  />
            </ScrollView >
        </View>)
}

export default EditProfile

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

        bottom: 20
    },
})