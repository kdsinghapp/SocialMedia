
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function requestUserPermission() {

try {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === true ||
    authStatus === true;

  if (enabled) {
    console.log('Notification permission granted');
    return true;
  } else {
    console.log('Notification permission denied');
    return false;
  }
} catch (error) {
  console.error('Error requesting notification permission:', error);
  return false;
}
}




const showLocalNotification = (value) => {
 

};
