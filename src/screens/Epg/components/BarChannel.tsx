import React from 'react';
import { View, StyleSheet, Image, FlatList } from 'react-native';

// Constants
import { WIDTH, HEIGHT, isTV } from '../../../constants/Layout';
import Theme from '../../../constants/Theme';

// Interface
import { IEpg } from '../../../Interface/epg';

interface BarChannelProps {
  filterData: IEpg[];
}
const BarChannel: React.FC<BarChannelProps> = ({ filterData }) => {
  return (
    <View style={styles.contLogo}>
      <FlatList
        data={filterData}
        keyExtractor={item => item.id}
        scrollEnabled={false}
        contentContainerStyle={styles.listChannel}
        renderItem={({ item, index }) => {
          return (
            <View style={styles.ImageContainer}>
              <Image
                style={styles.tinyLogo}
                source={{
                  uri: `https://picsum.photos/${index}00`,
                }}
              />
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  contLogo: {
    marginTop: isTV ? HEIGHT * 0.16 : HEIGHT * 0.106,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: isTV ? WIDTH * 0.13 : WIDTH * 0.2,
    zIndex: 10,
  },
  listChannel: {
    marginTop: 0,
  },
  ImageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 2,
    borderColor: Theme.softPink,
    borderRightColor: Theme.softPink,
    borderStyle: 'solid',
    backgroundColor: '#222',
    borderBottomWidth: 2,

    height: isTV ? HEIGHT * 0.12 : HEIGHT * 0.087,
    width: isTV ? WIDTH * 0.1 : WIDTH * 0.2,
  },
  tinyLogo: {
    width: isTV ? WIDTH * 0.07 : WIDTH * 0.14,
    height: isTV ? HEIGHT * 0.07 : HEIGHT * 0.045,
  },
});

export default BarChannel;
