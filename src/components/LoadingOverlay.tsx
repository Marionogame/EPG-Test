import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const LoadingOverlay = ({
  color = '#FF6F61',
  background = 'rgba(0, 0, 0, 0.5)',
  size = 40,
  zIndex = 999,
}) => (
  <View style={[styles.overlay, { backgroundColor: background, zIndex }]}>
    <ActivityIndicator size={size} color={color} />
  </View>
);

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default LoadingOverlay;
