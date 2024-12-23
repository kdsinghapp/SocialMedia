/* eslint-disable semi */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react'
import {
    Pressable, Image, View, TouchableOpacity, TextInput, ScrollView, ImageBackground, FlatList, Text
} from 'react-native'
import { useNavigation } from '@react-navigation/core'

import { useSelector } from 'react-redux'
import HeaderTwo from '../../utils/Header'
import MyStatusBar from '../../utils/MyStatusBar'
import AccirdianItem from '../../utils/AccordianItem'
import { hp } from '../../utils/Constant'

import { useFocusEffect, useIsFocused } from '@react-navigation/native'
import Loading from '../../utils/Loader'

const FAQ = ({ route }) => {
    const navigation = useNavigation()
    const [faqData, setFaqData] = useState([])
    const [isLoading, setLoading] = useState(false)



    const isFocuss = useIsFocused();
    useEffect(() => {
        Get_Faq()
    }, [isFocuss]);




    const Get_Faq = () => {
        setLoading(true)
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        fetch("https://server-php-8-3.technorizen.com/oneTen/api/common/content/get-frequently-question", requestOptions)
            .then((response) => response.text())
            .then((result) => {
                setLoading(false)
                const res = JSON.parse(result)

                setFaqData(res?.data)
            })
            .catch((error) => {

                setLoading(false)
                console.error(error)
            }
            );
    }



    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>

            {isLoading?<Loading />:null}
            <MyStatusBar backgroundColor={"transparent"} barStyle={"dark-content"} />
            <HeaderTwo back={true} title={"FAQ"} navigation={navigation} />
            <View style={{ flex: 1, padding: 20 }}>
                <ScrollView>
                    <View style={{ height: hp(20), alignItems: 'center', marginTop: 10 }}>
                        <Image source={require('../../assets/Cropping/FAQ3x.png')}
                            resizeMode='contain'
                            style={{ height: '100%', width: '100%' }} />


                    </View>
                    <View style={{ height: hp(10), alignItems: 'center', }}>

                        <Text style={{ fontSize: 40, color: '#000', fontWeight: '700' }}>FAQ</Text>
                        <Text style={{ fontSize: 14, color: '#ccc', fontWeight: '500' }}>Most common question about our services</Text>
                    </View>
                    {faqData?.length > 0 ? <FlatList
                        showsVerticalScrollIndicator={false}
                        data={faqData}
                        keyExtractor={(item, index) => index?.toString()}
                        style={{ flex: 1, paddingVertical: 10, backgroundColor: "transparent", marginBottom: 30 }}
                        renderItem={({ item }) => (
                            <AccirdianItem title={item?.question} des={item?.answer} />
                        )
                        }
                    /> :
                        <View>

                            <Text style={{ fontSize: 24, color: '#000', fontWeight: '600' }}>No FAQ Founded</Text>
                        </View>
                    }
                </ScrollView>
            </View >
        </View>

    )
}

export default FAQ
