import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../routes/screenName.enum';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { wp } from './Constant';

const LogoutModal = ({ isVisible, setisVisible }) => {
  const toggleModal = () => {
    setisVisible(false);
  };

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Modal
        isVisible={isVisible}
        onBackdropPress={toggleModal}
        backdropOpacity={0.7}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Log Out?</Text>
          <Text style={styles.modalSubText}>Are you sure you want to log out?</Text>
          <View style={styles.actionButtons}>
            <LinearGradient
              colors={['#FF4D9A', '#5C0B9E']}
              style={styles.gradientButton}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={async () => {
                  await AsyncStorage.clear();
                  navigation.navigate(ScreenNameEnum.LOGIN_SCREEN);
                  toggleModal()
                }}
              >
                <Text style={styles.confirmButtonText}>Log Out</Text>
              </TouchableOpacity>
            </LinearGradient>
            <TouchableOpacity style={styles.cancelButton} onPress={toggleModal}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
    marginHorizontal:20
   
  },
  modalSubText: {
    fontSize: 14,
    color: '#7d7d7d',
    marginBottom: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  gradientButton: {

    borderRadius: 10,
    marginRight: 10,
    alignContent:'center',
    justifyContent:'center',
    width:wp(45)
    
  },
  confirmButton: {
  width:'100%',

    borderRadius: 10,
    alignItems: 'center',
   
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  cancelButton: {


    borderRadius: 10,
    backgroundColor: '#f0f0f0',

    alignContent:'center',
    justifyContent:'center',
    width:wp(45),
    height:50
  },
  cancelButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf:'center'
  },
});

export default LogoutModal;
