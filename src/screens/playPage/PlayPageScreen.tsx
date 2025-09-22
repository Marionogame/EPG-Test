import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from 'react-native';

// Constants
import { HEIGHT, WIDTH, isTV } from '../../constants/Layout';
import FontScale from '../../constants/FontScale';
import Theme from '../../constants/Theme';
import fontScale from '../../constants/FontScale';

// Assets
import noriginanime from '../../../assets/noriginanime.png';
import naruto from '../../../assets/naruto.jpg';
import onepiece from '../../../assets/onepiece.jpg';
import dragonballz from '../../../assets/dragonballz.jpg';
import bleach from '../../../assets/bleach.jpg';

// Library
import { MaterialIcons } from '@react-native-vector-icons/material-icons';

function PlayPageScreen() {
  const [favorite, setFavorite] = useState(false);

  const handleRenderCard = () => {
    const dataCard = [
      {
        title: 'My archenemy? Sasuke and Sakura',
        subTitle: 'S3 E62 - Today',
        image: naruto,
      },
      {
        title: 'OnePiece - Departure! The sea cook befriends Luffy',
        subTitle: 'S5 E42 - Today',
        image: onepiece,
      },
      {
        title:
          'Dragon Ball Z - ¡Recome is Nightmare! Come Out and Play, Vegeta!',
        subTitle: 'S3 E22 - Today',
        image: dragonballz,
      },
      {
        title: 'Bleach - ¡Enfrentamiento con Renji',
        subTitle: 'S1 E42 - Today',
        image: bleach,
      },
    ];

    const cardList = dataCard.map((item, index) => {
      return (
        <View key={`item-${index}`} style={styles.card}>
          <Image
            source={item.image}
            style={styles.cardImage}
            resizeMode="cover"
          />
          <View>
            <Text
              style={styles.textImageSubTitle2}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.title}
            </Text>
            <Text style={styles.textImageSubTitle3}>{item.subTitle}</Text>
          </View>
        </View>
      );
    });
    return cardList;
  };
  return (
    <SafeAreaProvider>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.containerTop}>
            <ImageBackground
              source={noriginanime}
              style={styles.halfImage}
              resizeMode="cover"
            >
              <View style={styles.containerTitle}>
                <View style={styles.deepWrapper}>
                  <Text style={styles.textTitle}>
                    Norigin Media: Make Your Stream Come True
                  </Text>
                  <Text style={styles.textGender}>
                    action, dark fantasy, drama, horror
                  </Text>
                </View>
              </View>
            </ImageBackground>
          </View>
          <View style={styles.containerBottom}>
            <View style={styles.containerButtons}>
              <TouchableOpacity style={styles.playButton}>
                <Text style={styles.textButton}>Play</Text>
                <MaterialIcons
                  name="play-circle-outline"
                  color="#fff"
                  style={styles.iconButton}
                  size={FontScale.xLarge}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setFavorite(!favorite)}
                style={
                  favorite ? styles.favoriteButtonSelect : styles.favoriteButton
                }
              >
                <MaterialIcons
                  name="favorite-border"
                  color="#fff"
                  style={styles.iconButton}
                  size={FontScale.large}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.uploadButton}>
                <MaterialIcons
                  name="file-upload"
                  color="#fff"
                  style={styles.iconButton}
                  size={FontScale.large}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.textsubTitle2}>Today`s Selection</Text>
            <ScrollView horizontal style={styles.cardContainer}>
              {handleRenderCard()}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
}

export default PlayPageScreen;

const styles = StyleSheet.create({
  containerTop: {
    width: WIDTH * 1,
    height: isTV ? HEIGHT * 0.7 : HEIGHT * 0.5,
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerBottom: {
    paddingLeft: WIDTH * 0.06,
    paddingVertical: HEIGHT * 0.02,

    backgroundColor: Theme.blackSoft,
  },
  cardImage: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    borderRadius: 32,
    width: isTV ? WIDTH * 0.25 : WIDTH * 0.33,
    height: isTV ? HEIGHT * 0.31 : HEIGHT * 0.21,
  },
  cardContainer: {
    marginTop: isTV ? HEIGHT * 0.05 : HEIGHT * 0.01,
  },
  card: {
    justifyContent: 'center',
    alignContent: 'center',
    marginRight: isTV ? WIDTH * 0.04 : WIDTH * 0.07,
  },
  containerTitle: {
    height: '100%',
    justifyContent: 'flex-end',
  },
  containerButtons: {
    flexDirection: 'row',
  },
  deepWrapper: {
    backgroundColor: 'rgba(24, 24, 24, 0.6)',
    borderRadius: 2,
    padding: 5,
    shadowColor: '#999',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    paddingHorizontal: WIDTH * 0.06,

    elevation: 10,
  },

  textTitle: {
    fontSize: FontScale.large,
    color: '#ffffffff',
  },
  textImageSubTitle2: {
    marginTop: HEIGHT * 0.007,
    fontSize: isTV ? FontScale.medium_large : FontScale.small,
    color: '#ffffffff',
    width: WIDTH * 0.29,
  },
  textImageSubTitle3: {
    fontSize: isTV ? FontScale.medium_small : FontScale.small,
    color: Theme.lightGray2,
  },
  textButton: {
    color: '#fff',
    fontSize: FontScale.large,
    fontWeight: '600',
    letterSpacing: 0.4,
    marginRight: WIDTH * 0.02,
  },
  iconButton: {
    marginTop: HEIGHT * 0.005,
  },
  textGender: {
    fontSize: FontScale.small,
    color: Theme.lightGray4,
  },

  halfImage: {
    width: WIDTH * 1,
  },
  subtext: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: '#333',
  },

  textsubTitle2: {
    marginTop: HEIGHT * 0.032,
    color: 'white',
    fontSize: fontScale.large,
  },
  playButton: {
    backgroundColor: Theme.redSoft,
    width: 120,
    height: isTV ? HEIGHT * 0.09 : HEIGHT * 0.05,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,

    flexDirection: 'row',
  },
  favoriteButton: {
    backgroundColor: Theme.darkGray4,
    width: isTV ? WIDTH * 0.07 : WIDTH * 0.12,
    height: isTV ? HEIGHT * 0.09 : HEIGHT * 0.05,
    marginLeft: isTV ? WIDTH * 0.015 : WIDTH * 0.03,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  favoriteButtonSelect: {
    backgroundColor: Theme.redSoft,
    width: isTV ? WIDTH * 0.07 : WIDTH * 0.12,
    height: isTV ? HEIGHT * 0.09 : HEIGHT * 0.05,
    marginLeft: isTV ? WIDTH * 0.015 : WIDTH * 0.03,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  uploadButton: {
    backgroundColor: Theme.darkGray4,
    width: isTV ? WIDTH * 0.07 : WIDTH * 0.12,
    height: isTV ? HEIGHT * 0.09 : HEIGHT * 0.05,
    marginLeft: isTV ? WIDTH * 0.015 : WIDTH * 0.03,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
});
