import React, { useRef, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  StatusBar,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const offers = [
  require('../Images/offer2.png'),
  require('../Images/khand100.jpg'),
  require('../Images/khand100.jpg'),
  require('../Images/khand100.jpg'),
  require('../Images/khand100.jpg'),
];

const HomeScreen = () => {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef();

  const handleScroll = event => {
    const index = Math.round(event.nativeEvent.contentOffset.x / SCREEN_WIDTH);
    setCurrentIndex(index);
  };

  const renderOfferItem = ({ item }) => (
    <View style={styles.offerContainer}>
      <Image
        source={item}
        style={styles.offerImage}
        resizeMode="contain"
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />

      {/* Logo & Welcome */}
      <View style={styles.header}>
        <Image
          source={require('../Images/logoto.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>“Yalgud Dairy”</Text>
      </View>

      <FlatList
        ref={flatListRef}
        data={offers}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderOfferItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        style={{ flexGrow: 0 }}
      />

      {/* Dot Indicators */}
      <View style={styles.pagination}>
        {offers.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              { backgroundColor: currentIndex === index ? '#8000ff' : '#ccc' },
            ]}
          />
        ))}
      </View>

      {/* Skip Button */}
      <TouchableOpacity
        style={styles.skipButton}
        onPress={() => navigation.navigate('OfferScreen')}
        activeOpacity={0.8}
      >
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const MAX_CONTENT_WIDTH = 600; // max width on big screens for better readability

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8CC3E2',
    // center content horizontally on big screens (web, tablets)
    alignItems: 'center',
    paddingTop: SCREEN_HEIGHT * 0.03,
  },
  header: {
    alignItems: 'center',
    marginBottom: SCREEN_HEIGHT * 0.04,
    marginTop: SCREEN_HEIGHT * 0.06,
    width: '90%',
    maxWidth: MAX_CONTENT_WIDTH,
  },
  logo: {
    width: SCREEN_WIDTH * 0.2, // smaller on bigger screens
    maxWidth: 150,
    height: SCREEN_WIDTH * 0.2,
    maxHeight: 150,
    marginBottom: SCREEN_HEIGHT * 0.02,
  },
  title: {
    fontSize: SCREEN_WIDTH * 0.07,
    maxWidth: MAX_CONTENT_WIDTH,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
  },
  offerContainer: {
    width: SCREEN_WIDTH,
    maxWidth: MAX_CONTENT_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    height: SCREEN_HEIGHT * 0.45,
  },
  offerImage: {
    width: SCREEN_WIDTH * 0.7,
    maxWidth: 400,
    height: SCREEN_HEIGHT * 0.4,
    maxHeight: 400,
    borderRadius: 12,
  },
  pagination: {
    flexDirection: 'row',
    marginVertical: SCREEN_HEIGHT * 0.025,
    justifyContent: 'center',
    width: '100%',
    maxWidth: MAX_CONTENT_WIDTH,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  skipButton: {
    borderWidth: 1.5,
    borderColor: '#000',
    paddingVertical: SCREEN_HEIGHT * 0.015,
    paddingHorizontal: SCREEN_WIDTH * 0.25,
    maxWidth: MAX_CONTENT_WIDTH,
    borderRadius: 10,
    marginTop: SCREEN_HEIGHT * 0.01,
    backgroundColor: '#2563EB',
    alignSelf: 'center',
  },
  skipText: {
    color: '#fff',
    fontSize: SCREEN_WIDTH * 0.045,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default HomeScreen;
