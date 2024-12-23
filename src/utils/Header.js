import React from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const HeaderTwo = ({ title, navigation, back, calander, Metting }) => {
  return (
    <LinearGradient
      colors={['#FF4D9A', '#5C0B9E']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.headerContainer} // Add gradient to the full header
    >
      <View style={styles.container}>
        {/* Back button */}
        <Pressable style={styles.backButton} onPress={() => {
       
            navigation.goBack();
          
        }}>
          {back ? (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <View style={styles.backIconContainer}>
                <Image

                  source={require('../assets/Cropping/BackNavsWhite2x.png')}
                  style={styles.backIcon}
                />
              </View>
            </TouchableOpacity>
          ) : null}
        </Pressable>
       {calander && <Pressable style={styles.calander} onPress={() => {
       
            navigation.goBack();
          
        }}>
          {back ? (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <View style={styles.backIconContainer}>
                <Image

                  source={require('../assets/Cropping/calendar.png')}
                  style={styles.backIcon}
                />
              </View>
            </TouchableOpacity>
          ) : null}
        </Pressable>}

        {/* Title */}
        <Text style={styles.title}>{title}</Text>

      </View>
    </LinearGradient>
  );
};

export default HeaderTwo;

const styles = StyleSheet.create({
  headerContainer: {
    borderBottomLeftRadius: 30, // Rounded corners
    borderBottomRightRadius: 30, // Rounded corners
    paddingBottom:30,
  },
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    paddingTop: 50, // Ensure padding for status bar
  },
  backButton: {
    position: 'absolute',
    left: 15,
    top: 50, // Adjust for iPhone notch area
  },
  calander: {
    position: 'absolute',
    right: 15,
    top: 50, // Adjust for iPhone notch area
  },
  backIconContainer: {
   
    
  },
  backIcon: {
    height:30, // Smaller back arrow to match image
    width:30,
   
  },
  title: {
    color: '#fff', // White title text
    fontWeight: '700',
    fontSize:18,
    textAlign: 'center',
    width:'55%',
  },
});
