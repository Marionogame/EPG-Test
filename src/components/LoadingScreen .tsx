import React from 'react';

import { ActivityIndicator, View, StyleSheet } from 'react-native';

const LoadingScreen = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color="#ffffff" />
  </View>
);

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111111', // o Theme.darkGray6
  },
});
export default LoadingScreen;
