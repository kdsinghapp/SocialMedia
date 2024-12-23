import React, { memo, useEffect } from 'react';
import { Platform, StatusBar, View } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const statusBarHeight = getStatusBarHeight();

const MyStatusBar = ({ backgroundColor, barStyle, opacity }) => {
  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setBarStyle(barStyle || 'light-content', true); // Light content to match white icons
      StatusBar.setBackgroundColor(backgroundColor || 'transparent'); // Transparent on Android
    } else if (Platform.OS === 'ios') {
      StatusBar.setBarStyle(barStyle || 'light-content'); // Light content for iOS
    }
  }, []);

  return (
    <View
      style={{
        height: Platform.OS === 'ios' ? statusBarHeight : 0, // Adjust height based on platform
        backgroundColor: backgroundColor || 'transparent', // Transparent background
        opacity: opacity || 1, // Optional opacity, default is fully opaque
      }}
    >
      <StatusBar
        translucent={true} // Make it translucent to let the background color show
        animated={true}
        backgroundColor={backgroundColor || 'transparent'}
        barStyle={barStyle || 'light-content'} // Light content for icons
      />
    </View>
  );
};

export default memo(MyStatusBar);
