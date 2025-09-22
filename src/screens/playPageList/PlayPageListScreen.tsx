import React, { useState } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Constants
import { HEIGHT, WIDTH, isTV } from '../../constants/Layout';
import FontScale from '../../constants/FontScale';
import Theme from '../../constants/Theme';
import fontScale from '../../constants/FontScale';

// Assets
import noriginanime from '../../../assets/noriginanime.png';
import norigin2 from '../../../assets/norigin2.png';
import norigin3 from '../../../assets/norigin3.png';
import norigin4 from '../../../assets/norigin4.png';
import norigin5 from '../../../assets/norigin5.png';

// Library
import { MaterialIcons } from '@react-native-vector-icons/material-icons';

function PlayPageListScreen() {
  const [expanded, setExpanded] = useState(false);

  const handleRenderCard = () => {
    const dataCard = [
      {
        title: 'My archenemy? Sasuke and Sakura',

        image: norigin5,
      },
      {
        title: 'OnePiece - Departure! The sea cook befriends Luffy',

        image: norigin4,
      },
      {
        title:
          'Dragon Ball Z - ¡Recome is Nightmare! Come Out and Play, Vegeta!',

        image: norigin3,
      },
      {
        title: 'Bleach - ¡Enfrentamiento con Renji',

        image: norigin2,
      },
    ];

    const cardList = dataCard.map((item, index) => {
      return (
        <TouchableOpacity key={`item-${index}`} style={styles.cardList}>
          <Image
            source={item.image}
            style={styles.cardImageList}
            resizeMode="cover"
          />
          <View style={styles.contTitle}>
            <Text style={styles.textImageSubTitle2}>{`Episode ${
              index + 1
            }`}</Text>
            <Text
              style={styles.textImageSubTitle3}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.title}
            </Text>
          </View>
        </TouchableOpacity>
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
              blurRadius={15}
            >
              <View style={styles.containerImage}>
                <Image
                  source={noriginanime}
                  style={styles.cardImage}
                  resizeMode="cover"
                />

                <TouchableOpacity style={styles.playButton}>
                  <Text style={styles.textButton}>Play</Text>
                  <MaterialIcons
                    name="play-circle-outline"
                    color="#fff"
                    style={styles.iconButton}
                    size={FontScale.xLarge}
                  />
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>
          <View style={styles.containerBottom}>
            <Text style={styles.textTitle}>
              Norigin Media: Make Your Stream Come True
            </Text>

            <Text
              numberOfLines={expanded ? undefined : 3}
              style={styles.textGender}
            >
              Headquartered in Oslo, Norway, this Scandinavian company
              specializes in the design, engineering, quality assurance, and
              certification of high-performance multiscreen TV applications, as
              well as providing specialized engineering consulting services. Our
              expertise spans UI/UX design, front-end development, quality
              assurance testing, and cross-platform certification, covering all
              major devices from mobile phones to smart TVs and operator set-top
              boxes. Our single-code, cross-platform TV application framework
              enables frontend developers to build modular and scalable
              applications while streamlining workflows and integrating video
              players, ad servers, and analytics into data-driven products. We
              also offer CTV Testing-as-a-Service to ensure consistent quality
              and smooth App Store certification in the fragmented CTV
              landscape. Founded in 2004, Norigin Media is a trusted partner for
              leading media brands, including Deutsche Telekom, Orange Group,
              Telenor, BBC, MTV, Eurosport, Vevo, and Hearst Television.
            </Text>
            <TouchableOpacity>
              <Text
                onPress={() => setExpanded(!expanded)}
                style={styles.textMore}
              >
                {expanded ? 'Read Less' : 'Read More'}
              </Text>
            </TouchableOpacity>
            <Text style={styles.textsubTitle2}>Season 1</Text>
            <ScrollView style={styles.cardContainer}>
              {handleRenderCard()}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
}

export default PlayPageListScreen;

const styles = StyleSheet.create({
  containerTop: {
    width: WIDTH * 1,
    height: isTV ? HEIGHT * 0.7 : HEIGHT * 0.45,
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerBottom: {
    paddingLeft: WIDTH * 0.06,
    paddingBottom: HEIGHT * 0.02,
    paddingTop: HEIGHT * 0.01,
    borderTopWidth: 3,
    borderColor: Theme.darkGray4,
    borderStyle: 'solid',
    backgroundColor: Theme.blackSoft,
  },
  cardImage: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    borderRadius: 32,
    width: isTV ? WIDTH * 0.45 : WIDTH * 0.33,
    height: isTV ? HEIGHT * 0.42 : HEIGHT * 0.21,
  },
  cardImageList: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    borderRadius: 10,
    width: isTV ? WIDTH * 0.25 : WIDTH * 0.3,
    height: isTV ? HEIGHT * 0.31 : HEIGHT * 0.1,
  },
  cardList: {
    flexDirection: 'row',

    marginBottom: isTV ? HEIGHT * 0.04 : HEIGHT * 0.032,
  },
  cardContainer: {
    marginTop: isTV ? HEIGHT * 0.05 : HEIGHT * 0.01,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    marginRight: isTV ? WIDTH * 0.04 : WIDTH * 0.07,
  },

  containerImage: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
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
    fontSize: isTV ? fontScale.superLarge : FontScale.large,
    color: '#ffffffff',
    marginBottom: HEIGHT * 0.02,
  },
  contTitle: { justifyContent: 'center' },

  textImageSubTitle2: {
    marginLeft: WIDTH * 0.06,
    fontSize: isTV ? FontScale.large : FontScale.small,
    color: '#ffffffff',
  },
  textImageSubTitle3: {
    marginLeft: WIDTH * 0.06,
    fontSize: isTV ? FontScale.medium_large : FontScale.small,
    color: Theme.lightGray2,
    width: WIDTH * 0.49,
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
    fontSize: isTV ? FontScale.medium_small : FontScale.small,
    color: Theme.lightGray4,
  },
  textMore: {
    fontSize: FontScale.small,
    color: Theme.redSoft,
    marginTop: HEIGHT * 0.005,
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
    marginBottom: HEIGHT * 0.016,
    color: 'white',
    fontSize: isTV ? fontScale.xLarge : fontScale.large,
  },
  playButton: {
    backgroundColor: Theme.redSoft,
    width: 120,
    marginTop: HEIGHT * 0.015,
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
