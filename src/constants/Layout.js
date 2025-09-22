import { Dimensions, PixelRatio, Platform } from 'react-native';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const Ratio = HEIGHT / WIDTH;
const PxRatio = PixelRatio.get();
const PxWidth = 1080 / PxRatio;
const PxHeight = 1920 / PxRatio;
const isTV = Platform.isTV;

export { WIDTH, HEIGHT, Ratio, PxRatio, PxWidth, PxHeight, isTV };
