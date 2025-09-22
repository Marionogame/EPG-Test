import { RFPercentage } from 'react-native-responsive-fontsize';
import { WIDTH, isTV } from './Layout';

function WPercentage(percent) {
  const widthPercent = (percent * WIDTH) / 100;
  return Math.round(widthPercent);
}

// Escalado adicional para TV si se requiere mayor legibilidad
const scaleFactor = isTV ? 0.37 : 1;

const fontScale = {
  xSmall: WPercentage(3 * scaleFactor),
  small: WPercentage(3.5 * scaleFactor),
  medium_small: WPercentage(4 * scaleFactor),
  medium: WPercentage(4.5 * scaleFactor),
  medium_large: WPercentage(5 * scaleFactor),
  large: WPercentage(5.5 * scaleFactor),
  xLarge: WPercentage(7 * scaleFactor),
  superLarge: WPercentage(8.5 * scaleFactor),
  megaLarge: WPercentage(10 * scaleFactor),
  ultraLarge: WPercentage(12 * scaleFactor),
  huge: WPercentage(13.5 * scaleFactor),
  superHuge: WPercentage(15 * scaleFactor),
  megaHuge: WPercentage(17.5 * scaleFactor),
  ultraHuge: WPercentage(20 * scaleFactor),

  // Íconos adaptativos
  icon_15: RFPercentage(1.75 * scaleFactor),
  icon_20: RFPercentage(2.5 * scaleFactor),
  icon_25: RFPercentage(3.25 * scaleFactor),
  icon_30: RFPercentage(4 * scaleFactor),
  icon_35: RFPercentage(4.75 * scaleFactor),
  icon_40: RFPercentage(5.5 * scaleFactor),
  icon_45: RFPercentage(6.25 * scaleFactor),
  icon_48: RFPercentage(6.5 * scaleFactor),
  icon_50: RFPercentage(7 * scaleFactor),
  icon_64: RFPercentage(8.75 * scaleFactor),
  icon_80: RFPercentage(10.75 * scaleFactor),
  icon_96: RFPercentage(13 * scaleFactor),
  icon_128: RFPercentage(17 * scaleFactor),
  icon_160: RFPercentage(21.5 * scaleFactor),
  icon_192: RFPercentage(26 * scaleFactor),
  icon_224: RFPercentage(30.5 * scaleFactor),
  icon_256: RFPercentage(35 * scaleFactor),
  icon_288: RFPercentage(39 * scaleFactor),
  icon_320: RFPercentage(43.5 * scaleFactor),
  icon_384: RFPercentage(52 * scaleFactor),
};

export default fontScale;
