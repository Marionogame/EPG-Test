import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Constants
import { HEIGHT, WIDTH, isTV } from '../../../constants/Layout';
import fontScale from '../../../constants/FontScale';
import Theme from '../../../constants/Theme';

const generateHourBlocks = () => {
  const blocks = [];

  for (let i = 0; i <= 23; i++) {
    blocks.push(
      <View key={`item-${i}`} style={styles.hourBlock}>
        <Text style={styles.hourText}>{i === 0 ? `5:00` : `00`}</Text>
        <Text style={styles.hourText}>
          {i === 23 ? `5:00` : `${(i + 6) % 24}:`}
        </Text>
      </View>,
    );
  }

  return <View style={styles.itemsHour}>{blocks}</View>;
};

const BarHour = () => {
  return <View style={styles.constHour}>{generateHourBlocks()}</View>;
};

const styles = StyleSheet.create({
  hourBlock: {
    width: WIDTH,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#444',
    paddingVertical: isTV ? HEIGHT * 0.017 : HEIGHT * 0.009,
    borderColor: Theme.gray,
    borderBottomLeftRadius: HEIGHT * 0.008,
    borderBottomRightRadius: HEIGHT * 0.008,
  },
  hourText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: isTV ? fontScale.medium : fontScale.medium_small,
  },
  constHour: {
    width: WIDTH * 24,
    backgroundColor: Theme.redSoft,

    height: isTV ? HEIGHT * 0.07 : HEIGHT * 0.04,
  },
  itemsHour: {
    flexDirection: 'row',
  },
});

export default BarHour;
