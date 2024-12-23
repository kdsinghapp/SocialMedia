import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { hp } from '../../utils/Constant';
const AddProfilePicture = () => {
  const handleAddPicture = () => {
    // Handle "Add picture" logic here
  };

  const handleSkip = () => {
    // Handle "Skip" logic here
  };
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton}>
      <Image
              source={require('../../assets/Cropping/Back2x.png')}
              style={{ height: 32, width: 32 }}
            />
      </TouchableOpacity>
<View style={{}}>
      <Text style={styles.title}>Add a profile picture</Text>
      <Text style={styles.subtitle}>
        Add a profile picture so your friends know it’s you. Everyone will be able to see your picture.
      </Text>
      </View>
      <View style={styles.imageContainer}>
        <Image
          style={styles.profileImage}
          source={require('../../assets/Cropping/proifle.png')}
        />
      </View>
<View  style={{height:hp(25)}}/>
 
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
             Add picture
            </Text>

          </LinearGradient>
      <TouchableOpacity onPress={handleSkip}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>
    </View>
  );
};

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
    
      },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  backButtonText: {
    fontSize: 20,
    color: '#000',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',

    color: '#000',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#6e6e6e',
    marginHorizontal:0,
    marginBottom: 20,
  },
  imageContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: 'hidden',
    marginVertical: 40,

  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  addButton: {
    backgroundColor: 'linear-gradient(90deg, #FF758C 0%, #FF7EB3 100%)',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  skipText: {
    fontSize: 14,
    color: '#FF7EB3',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
});

export default AddProfilePicture;
