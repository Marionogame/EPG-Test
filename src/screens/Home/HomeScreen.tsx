import React, { useEffect, useState } from 'react';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { View, Text, StyleSheet } from 'react-native';

// Constants
import Theme from '../../constants/Theme';
import FontScale from '../../constants/FontScale';
import { HEIGHT, WIDTH, isTV } from '../../constants/Layout';

// Interface
import { IEpg } from '../../Interface/epg';

// Library
import { MaterialIcons } from '@react-native-vector-icons/material-icons';

// Module
import EpgScreen from '../Epg/EpgScreen';
import LoadingScreen from '../../components/LoadingScreen ';

const Home = () => {
  const [epgItems, setEpgItems] = useState<IEpg[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://10.0.2.2:1337/epg');
        const data: IEpg[] = await res.json();

        setEpgItems(data);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const insets = useSafeAreaInsets();
  const isArrayEmpty = (arr?: unknown[]): boolean => {
    return !Array.isArray(arr) || arr.length === 0;
  };

  return (
    <SafeAreaProvider>
      {loading || isArrayEmpty(epgItems) ? (
        <LoadingScreen />
      ) : (
        <View
          style={[
            styles.container,
            {
              paddingTop: insets.top,
              paddingBottom: insets.bottom,
            },
          ]}
        >
          <View style={styles.searchBar}>
            <MaterialIcons name="person" color="#fff" size={FontScale.xLarge} />
            <Text style={styles.titleSearch}>Cinemix</Text>
            <MaterialIcons name="search" color="#fff" size={FontScale.xLarge} />
          </View>
          <View style={styles.content}>
            <EpgScreen epgItems={epgItems} />
          </View>
        </View>
      )}
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.lightGray5,
  },

  searchBar: {
    height: isTV ? HEIGHT * 0.1 : HEIGHT * 0.06,
    flexDirection: 'row',
    paddingHorizontal: WIDTH * 0.05,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: WIDTH,
    backgroundColor: Theme.darkGray6,
  },
  titleSearch: {
    fontSize: FontScale.large,

    fontWeight: '600',
    color: Theme.white,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: HEIGHT * 0.037,
    width: WIDTH,
    backgroundColor: Theme.darkGray5,
  },
});
export default Home;
