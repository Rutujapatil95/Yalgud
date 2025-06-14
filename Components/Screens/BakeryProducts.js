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
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const scale = size => (width / 375) * size; // Base iPhone 11 width
const verticalScale = size => (height / 812) * size;

const bakeryItems = [
  {
    id: '1',
    name: 'Bread/ब्रेड',
    types: ['Milk Bread', 'Whole Wheat', 'Multigrain', 'White Bread'],
    image: require('../Images/bredlogo.jpg'),
    screen: 'BreadScreen',
  },
  {
    id: '2',
    name: 'Banpav/बनपाव',
    types: ['Soft Pav', 'Butter Pav', 'Whole Wheat Pav'],
    image: require('../Images/banpav1.jpg'),
    screen: 'BanpavScreen',
  },
  {
    id: '3',
    name: 'Donut/डोनट',
    types: ['Glazed', 'Chocolate', 'Sprinkles', 'Filled'],
    image: require('../Images/donute1.jpg'),
    screen: 'DonutScreen',
  },
  {
    id: '4',
    name: 'Rusk/रस्क',
    types: ['Plain Rusk', 'Sugar Coated', 'Garlic Rusk'],
    image: require('../Images/rusklogo.jpg'),
    screen: 'RuskScreen',
  },
  {
    id: '5',
    name: 'Toast/टोस्ट',
    types: ['Brown Toast', 'White Toast', 'Multigrain Toast'],
    image: require('../Images/toast99.jpg'),
    screen: 'ToastScreen',
  },
  {
    id: '6',
    name: 'Khari/खारी',
    types: ['Butter Khari', 'Plain Khari', 'Masala Khari'],
    image: require('../Images/khari.jpg'),
    screen: 'KhariScreen',
  },
  {
    id: '7',
    name: 'Cream Roll/क्रीमरोल',
    types: ['Vanilla Cream', 'Chocolate Cream', 'Strawberry Cream'],
    image: require('../Images/cream.jpg'),
    screen: 'CreamRollScreen',
  },
];

const BakeryProductsScreen = () => {
  const navigation = useNavigation();
  const [liked, setLiked] = useState([]);

  const toggleLike = id => {
    setLiked(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id],
    );
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => navigation.navigate(item.screen)}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.types}>
          Available Types: {item.types.join(', ')}
        </Text>
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
          Bakery Products{' '}
          <Text style={styles.subtitle}>/ बेकरी प्रॉडक्ट्स</Text>
        </Text>
      </View>

      <FlatList
        data={bakeryItems}
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
    paddingTop: verticalScale(50),
    paddingBottom: verticalScale(20),
    backgroundColor: '#8CC3E2',
  },
  backArrow: {
    fontSize: scale(26),
    fontWeight: 'bold',
    marginRight: scale(12),
    color: '#000',
  },
  title: {
    fontSize: scale(22),
    fontWeight: 'bold',
    color: '#000',
  },
  subtitle: {
    fontSize: scale(16),
    color: '#333',
    paddingBottom: verticalScale(90),
  },
  list: {
    paddingHorizontal: scale(16),
    paddingBottom: verticalScale(20),
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: scale(14),
    padding: scale(14),
    marginBottom: verticalScale(16),
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    position: 'relative',
  },
  image: {
    width: scale(80),
    height: scale(80),
    borderRadius: scale(12),
  },
  info: {
    flex: 1,
    marginLeft: scale(14),
  },
  name: {
    fontSize: scale(18),
    fontWeight: '700',
    color: '#000',
  },
  types: {
    fontSize: scale(13),
    color: '#444',
    marginTop: verticalScale(8),
    fontWeight: '600',
  },
  heartButton: {
    position: 'absolute',
    right: scale(18),

    top: scale(80),
  },
  heartIcon: {
    width: scale(24),
    height: scale(24),
  },
});

export default BakeryProductsScreen;
