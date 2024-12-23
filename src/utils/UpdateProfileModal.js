import React from 'react';
import { StyleSheet, TouchableOpacity, View,Text } from 'react-native';

import Modal from 'react-native-modal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Theme from './theme';
import { hp, wp } from './Constant';
import LinearGradient from 'react-native-linear-gradient';

const UploadImageModal = ({
    shown = false,
    onBackdropPress = () => { },
    onPressCamera = () => { },
    onPressGallery = () => { },
}) => {
    const insets = useSafeAreaInsets();

    const Button = ({
        buttonTitle = 'Button',
        titleColor = '#FFF',
        style,
        onPress = () => { },
        iconCompoennet,
        disabled = false,
    }) => {
        return (
            <LinearGradient
            colors={['#FF4D9A', '#5C0B9E']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.buttonStyle, style, disabled && styles.disableStyle]}
          >
            <TouchableOpacity
                disabled={disabled}
                activeOpacity={0.5}
                onPress={onPress}
                style={[styles.buttonStyle, style, disabled && styles.disableStyle]}>
                       
                {iconCompoennet && iconCompoennet}
                <Text style={{fontSize:16,fontWeight:'600',color:'#fff'}}>
                    {buttonTitle}
                </Text>
          
            </TouchableOpacity>
            </LinearGradient>
        );
    };

    return (
        <Modal
            animationInTiming={500}
            animationOutTiming={400}
            useNativeDriver
            useNativeDriverForBackdrop
            animationOut={'slideOutDown'}
            animationIn={'slideInUp'}
            isVisible={shown}
            onBackdropPress={onBackdropPress}
            backdropOpacity={0.2}
            style={{ padding: 0, margin: 0, zIndex: 2 }}>
            <View
                pointerEvents="box-none"
                style={{ flex: 1, justifyContent: 'flex-end' }}>
                <View
                    style={[
                        styles.modalChildContainer,
                        {
                            paddingBottom: insets.bottom,
                        },
                    ]}> 
                    <LinearGradient
                    colors={['#FF4D9A', '#5C0B9E']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.modalHeader} // Add gradient to the full header
                  >
                    <View style={styles.modalHeader}>
                        <Text  style={{fontSize:16,fontWeight:'600',color:'#fff'}}>
                            {`Select Image`}
                        </Text>
                    </View>
                    </LinearGradient>
                    <View
                        style={{
                            paddingHorizontal: wp(4),
                            flex: 1,
                            justifyContent: 'center',
                        }}>

                        <Button
                            buttonTitle="Select photo from camera"
                            onPress={onPressCamera}
                            style={{fontSize:16,}}
                        />
                        <Button
                            buttonTitle={"Select photo from gallery"}
                            onPress={onPressGallery}
                            style={{fontSize:16,fontWeight:'600',color:'#fff'}}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default UploadImageModal;

const styles = StyleSheet.create({
    modalChildContainer: {
        backgroundColor: '#FFF',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        height: hp(40),
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: wp(7),
        justifyContent: 'space-between',
       
        height: hp(7),
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
    },
    listContainer: {
        paddingBottom: hp(3),
    },
    buttonStyle: {
        borderRadius: 10,
        height: hp(6),
       //  backgroundColor: Theme.BUTTON_PRIMARY_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: wp(4),
        marginBottom: hp(1.5),
        flexDirection: 'row',
        width: '90%',
        alignSelf: 'center',
        marginVertical: hp(1),
    },
    disableStyle: {
        backgroundColor: 'lightgray',
    },
});