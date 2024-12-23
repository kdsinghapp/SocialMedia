import React, { memo, useEffect, useState } from "react";
import { Pressable, View, Text } from "react-native";
import NotiOn from "../../assets/svg/Toggle.svg";
import NotiOff from "../../assets/svg/Toggle_back.svg";
import { useDispatch, useSelector } from "react-redux";
import MyStatusBar from "../../utils/MyStatusBar";
import HeaderTwo from "../../utils/Header";
import { useIsFocused } from "@react-navigation/native";

const Notification = ({ navigation }) => {
    const user = useSelector((state) => state.auth.userData);
    const [User, setUser] = useState({});
    const isFocused = useIsFocused();

    useEffect(() => {
        get_profile();
    }, [isFocused]);

    const get_profile = () => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${user?.token}`);

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        fetch("https://server-php-8-3.technorizen.com/oneTen/api/user/profile/get-profile", requestOptions)
            .then((response) => response.json())
            .then((result) => {

                console.log('result?.data', result?.data);
                setUser(result?.data || {})


            }
            )
            .catch((error) => console.error(error));
    };

    const update_notification = (type, payload) => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${user?.token}`);

        const formData = new FormData();
        formData.append(type, payload);


        console.log('formData', formData);
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formData,
            redirect: "follow"
        };

        fetch("https://server-php-8-3.technorizen.com/oneTen/api/user/profile/update-profile", requestOptions)
            .then((response) => response.json())
            .then((res) => {
                console.log('res=>>>>', res?.data);

                get_profile()
            }

            )
            .catch((error) => console.error(error));
    };

    const Row = memo(({ label, value, onChange }) => (
        <View style={{ padding: 12, flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <Text style={{ color: "#1D3A70", fontSize: 18, fontWeight: '600' }}>{label}</Text>
            <Pressable onPress={() => onChange(!value)}>
                {value ? <NotiOn width={44} height={24} /> : <NotiOff width={44} height={24} />}
            </Pressable>
        </View>
    ));

    const handleChange = (type, value) => {
        console.log('handleChange', type, value);
        update_notification(type, value ? 'TRUE' : 'FALSE');
    };



    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <MyStatusBar barStyle={"dark-content"} />
            <HeaderTwo back={true} navigation={navigation} title={"Notification"} />
            <View style={{ flex: 1, padding: 20 }}>
                <Row label="General Notification" value={User?.general_notification == 'TRUE' ? true : false} onChange={(value) => handleChange('general_notification', value)} />
                <Row label="Sound" value={User?.sound == 'TRUE' ? true : false} onChange={(value) => handleChange('sound', value)} />
                <Row label="Vibrate" value={User?.vibrate == 'TRUE' ? true : false} onChange={(value) => handleChange('vibrate', value)} />
                <Row label="App Updates" value={User?.app_updates == 'TRUE' ? true : false} onChange={(value) => handleChange('app_updates', value)} />
                <Row label="Tips Available" value={User?.new_tips_available == 'TRUE' ? true : false} onChange={(value) => handleChange('new_tips_available', value)} />
            </View>
        </View>
    );
};

export default Notification;
