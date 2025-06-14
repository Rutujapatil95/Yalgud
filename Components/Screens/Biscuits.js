import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');
const BASE_WIDTH = 375; // base width for scaling (iPhone 11 Pro width)
const scale = size => (SCREEN_WIDTH / BASE_WIDTH) * size;

const biscuits = [
  {
    id: '1',
    name: 'Nankatai',
    displayName: 'Nankatai/नानकटाई',
    availability: '250gm | 500gm | 1kg',
    image: require('../Images/nakatai.png'),
  },
  {
    id: '2',
    name: 'Jam Biscuit',
    displayName: 'Jam Biscuit/जॅम बिस्किट',
    availability: '250gm | 500gm | 1kg',
    image: require('../Images/jam99.jpg'),
  },
  {
    id: '3',
    name: 'Farali Biscuit',
    displayName: 'Farali Biscuit/फराळी बिस्किट',
    availability: '250gm | 500gm | 1kg',
    image: require('../Images/farali.jpg'),
  },
  {
    id: '4',
    name: 'Chocolate Biscuit',
    displayName: 'Chocolate Biscuit/चॉकलेट बिस्किट',
    availability: '250gm | 500gm | 1kg',
    image: require('../Images/chocolatebis.jpg'),
  },
  {
    id: '5',
    name: 'Cream Biscuit',
    displayName: 'Cream Biscuit/क्रीम बिस्किट',
    availability: '250gm | 500gm | 1kg',
    image: require('../Images/creambis.jpg'),
  },
];

const BiscuitsScreen = () => {
  const navigation = useNavigation();
  const [liked, setLiked] = useState([]);

  const toggleLike = id => {
    setLiked(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id],
    );
  };

  const navigateToScreen = (name, item) => {
    switch (name) {
      case 'Nankatai':
        navigation.navigate('NankataiScreen', {product: item});
        break;
      case 'Jam Biscuit':
        navigation.navigate('JamBiscuitScreen', {product: item});
        break;
      case 'Farali Biscuit':
        navigation.navigate('FaraliBiscuitScreen', {product: item});
        break;
      case 'Chocolate Biscuit':
        navigation.navigate('ChocolateBiscuitScreen', {product: item});
        break;
      case 'Cream Biscuit':
        navigation.navigate('CreamBiscuitScreen', {product: item});
        break;
      default:
        navigation.navigate('BiscuitDetailScreen', {product: item});
    }
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => navigateToScreen(item.name, item)}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.displayName}</Text>
        <Text style={styles.availabilityLabel}>Available in:</Text>
        <Text style={styles.availabilityValue}>{item.availability}</Text>
      </View>
      <TouchableOpacity
        onPress={e => {
          e.stopPropagation();
          toggleLike(item.id);
        }}
        style={styles.heartButton}>
        <Image
          source={
            liked.includes(item.id)
              ? require('../Images/fillheart.png')
              : require('../Images/outheart.png')
          }
          style={styles.heartIcon}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#8CC3E2" barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>
          Biscuits <Text style={styles.subtitle}>/ बिस्किट्स</Text>
        </Text>
      </View>

      <FlatList
        data={biscuits}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#8CC3E2',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(20),
    paddingTop: Platform.OS === 'ios' ? scale(50) : scale(20),
    paddingBottom: scale(20),
     paddingTop: scale(40),
    backgroundColor: '#8CC3E2',
  },
  backArrow: {
    fontSize: scale(24),
    fontWeight: 'bold',
    marginRight: scale(12),
    color: '#000',
  },
  title: {
    fontSize: scale(24),
    fontWeight: 'bold',
    color: '#000',
    marginTop: scale(8),
  },
  subtitle: {
    fontSize: scale(18),
    color: '#333',
  },
  list: {
    paddingHorizontal: scale(15),
    paddingBottom: scale(20),
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: scale(12),
    padding: scale(15),
    marginBottom: scale(16),
    alignItems: 'center',
    position: 'relative',
    elevation: 3,
  },
  image: {
    width: scale(80),
    height: scale(80),
    borderRadius: scale(12),
  },
  info: {
    flex: 1,
    marginLeft: scale(15),
  },
  name: {
    fontSize: scale(14),
    fontWeight: '700',
    color: '#000',
  },
  availabilityLabel: {
    fontSize: scale(12),
    color: '#000',
    marginTop: scale(6),
  },
  availabilityValue: {
    fontSize: scale(13),
    color: '#444',
    fontWeight: '600',
  },
  heartButton: {
    position: 'absolute',
    right: scale(20),
    bottom: scale(20),
  },
  heartIcon: {
    width: scale(22),
    height: scale(22),
  },
});

export default BiscuitsScreen;
