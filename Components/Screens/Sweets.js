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
const BASE_WIDTH = 375; // base width for scaling (iPhone 11 width approx)

const scale = size => (SCREEN_WIDTH / BASE_WIDTH) * size;

// Optionally clamp scale for font sizes (to keep readable on big/small screens)
const scaleFont = size => {
  const newSize = scale(size);
  if (newSize < size * 0.85) return size * 0.85; // min scale 85%
  if (newSize > size * 1.15) return size * 1.15; // max scale 115%
  return newSize;
};

const cakeItems = [
  {
    id: '1',
    name: 'Pastry',
    displayName: 'Pastry/पेस्ट्री',
    availability: 'Chocolate | Strawberry | Butterscotch',
    image: require('../Images/pastry.png'), 
  },
  {
    id: '2',
    name: 'Cupcake',
    displayName: 'Cup Cake/कप केक',
    availability: 'Vanilla | Red Velvet | Blueberry',
    image: require('../Images/cupcake.jpg'),
  },
  {
    id: '3',
    name: 'ChocolateCake',
    displayName: 'Chocolate Cake/चॉकलेट केक',
    availability: '500gm | 1kg | 2kg',
    image: require('../Images/chococake.png'),
  },
  {
    id: '4',
    name: 'MawaCake',
    displayName: 'Mawa Cake/मावा केक',
    availability: 'Slice | Full',
    image: require('../Images/mawacake.jpg'),
  },
  {
    id: '5',
    name: 'EgglessCake',
    displayName: 'Eggless Cake/एगलेस केक',
    availability: 'Chocolate | Pineapple | Red Velvet',
    image: require('../Images/egg.jpg'),
  },
];

const SweetsScreen = () => {
  const navigation = useNavigation();
  const [liked, setLiked] = useState([]);

  const toggleLike = (id) => {
    setLiked((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const navigateToScreen = (name, item) => {
    switch (name) {
      case 'Pastry':
        navigation.navigate('PastryScreen', {product: item});
        break;
      case 'Cupcake':
        navigation.navigate('CupcakeScreen', {product: item});
        break;
      case 'ChocolateCake':
        navigation.navigate('ChocolateCakeScreen', {product: item});
        break;
      case 'MawaCake':
        navigation.navigate('MawaCakeScreen', {product: item});
        break;
      case 'EgglessCake':
        navigation.navigate('EgglessCakeScreen', {product: item});
        break;
      default:
        navigation.navigate('SweetDetailScreen', {product: item});
    }
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => navigateToScreen(item.name, item)}>
      <Image source={item.image} style={styles.image} resizeMode="cover" />
      <View style={styles.info}>
        <Text style={styles.name}>{item.displayName}</Text>
        <Text style={styles.availabilityLabel}>Available in:</Text>
        <Text style={styles.availabilityValue}>{item.availability}</Text>
      </View>
      <TouchableOpacity
        onPress={(e) => {
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
          resizeMode="contain"
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#2c843e" barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>
          Sweet Cakes <Text style={styles.subtitle}>/ केक व पेस्ट्री</Text>
        </Text>
      </View>

      <FlatList
        data={cakeItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
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
    paddingTop: Platform.OS === 'ios' ? scale(50) : scale(30),
    paddingBottom: scale(30),
    backgroundColor: '#8CC3E2',
  },
  backArrow: {
    fontSize: scaleFont(24),
    fontWeight: 'bold',
    marginRight: scale(12),
    color: '#fff',
  },
  title: {
    fontSize: scaleFont(24),
    fontWeight: 'bold',
    color: '#fff',
    marginTop: scale(8),
  },
  subtitle: {
    fontSize: scaleFont(18),
    color: '#e0e0e0',
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
    // Add shadow for iOS
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  image: {
    width: scale(100),
    height: scale(100),
    borderRadius: scale(12),
  },
  info: {
    flex: 1,
    marginLeft: scale(15),
  },
  name: {
    fontSize: scaleFont(18),
    fontWeight: '700',
    color: '#000',
  },
  availabilityLabel: {
    fontSize: scaleFont(16),
    color: '#000',
    marginTop: scale(6),
  },
  availabilityValue: {
    fontSize: scaleFont(14),
    color: '#444',
    fontWeight: '600',
  },
  heartButton: {
    position: 'absolute',
    right: scale(20),
    bottom: scale(8),
  },
  heartIcon: {
    width: scale(22),
    height: scale(22),
  },
});

export default SweetsScreen;
