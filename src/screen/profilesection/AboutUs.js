
/* eslint-disable semi */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react'
import {
    FlatList,
    Image, Text, Pressable, ScrollView, TextInput, View,
} from 'react-native'

import { WebView } from 'react-native-webview';

import { useSelector } from 'react-redux'
import { useFocusEffect, useIsFocused } from '@react-navigation/native'
import MyStatusBar from '../../utils/MyStatusBar'
import HeaderTwo from '../../utils/Header'
import { hp } from '../../utils/Constant'
import Loading from '../../utils/Loader';
const About = ({ navigation }) => {
    const [isLoading, setLoading] = useState(false)


    const [faqData, setFaqData] = useState([])
    const isFocuss = useIsFocused();
    useEffect(() => {
        get_about()
    }, [isFocuss]);



    const get_about = () => {
        setLoading(true)
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        fetch("https://server-php-8-3.technorizen.com/oneTen/api/common/content/about-us", requestOptions)
            .then((response) => response.text())
            .then((result) => {

                setLoading(false)

                console.log(result);
                const res = JSON.parse(result)
                setFaqData(res?.data)
            })
            .catch((error) => {
                setLoading(false)
                console.error(error)
            });
    }




    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <MyStatusBar barStyle={"dark-content"} />
            <HeaderTwo back={true} navigation={navigation} title={"About Us"} />


            <View style={{ height: hp(25), alignItems: 'center', marginTop: 10 }}>
                <Image source={require('../../assets/Cropping/AboutsUs3x.png')}
                    resizeMode='contain'
                    style={{ height: '80%', width: '80%' }} />
            </View>
            <View style={{ flex: 1, padding: 10 }}>
                {isLoading ? <Loading /> : null}
                {faqData &&
                    <WebView
                        source={{ html: faqData?.content_description }}
                    />
                }
            </View>

        </View>
    )
}

export default About