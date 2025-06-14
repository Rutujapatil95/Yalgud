import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const scale = (size) => (SCREEN_WIDTH / 375) * size;

const products = [
  {
    id: '1',
    name: 'Aamrakhand/आम्रखंड',
    availability: 'Available in 200g, 500g, or 1kg',
    image: require('../Images/yalgud11.jpg'),
    route: 'ProductDetailsScreen',
  },
  {
    id: '2',
    name: 'Milk/दूध',
    availability: 'Available in 500ml, 1L, or 2L',
    image: require('../Images/milk.jpg'),
    route: 'MilkScreen',
  },
  {
    id: '3',
    name: 'Tup/तूप',
    availability: 'Available in 250g, 500g, or 1kg',
    image: require('../Images/tup.jpg'),
    route: 'TupScreen',
  },
  {
    id: '4',
    name: 'Mithai/मिठाई',
    availability: 'Available in 250g, 500g, or 1kg',
    image: require('../Images/mithai3.jpg'),
    route: 'MithaiScreen',
  },
  {
    id: '5',
    name: 'Lassi/लस्सी',
    availability: 'Available in 200ml, 500ml, or 1L',
    image: require('../Images/dairy2.jpg'),
    route: 'LassiScreen',
  },
  {
    id: '6',
    name: 'Paneer/पनीर',
    availability: 'Available in 200g, 500g, or 1kg',
    image: require('../Images/paneer.png'),
    route: 'PaneerScreen',
  },
  {
    id: '7',
    name: 'Shrikhand/श्रीखंड',
    availability: 'Available in 200g, 500g, or 1kg',
    image: require('../Images/khand2.jpg'),
    route: 'ShrikhandScreen',
  },
  {
    id: '8',
    name: 'Khavyache modak/खाव्याचे मोदक',
    availability: 'Available in 6 pcs, 12 pcs, or 24 pcs',
    image: require('../Images/modak.jpg'),
    route: 'KhavyacheModakScreen',
  },
];

const DairyProducts = () => {
  const navigation = useNavigation();
  const [liked, setLiked] = useState([]);

  const toggleLike = (id) => {
    setLiked((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const navigateToScreen = (route, item) => {
    navigation.navigate(route, { product: item });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigateToScreen(item.route, item)}
      style={styles.card}
      activeOpacity={0.8}
    >
      <Image source={item.image} style={styles.image} resizeMode="cover" />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.availability}>{item.availability}</Text>
      </View>
      <TouchableOpacity
        onPress={() => toggleLike(item.id)}
        style={styles.heartButton}
      >
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
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>
          Dairy Products <Text style={styles.subtitle}>/ डेअरी प्रॉडक्ट्स</Text>
        </Text>
      </View>

      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8CC3E2',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(16),
    paddingTop: Platform.OS === 'ios' ? scale(40) : scale(20),
    paddingBottom: scale(20),
    backgroundColor: '#8CC3E2',
  },
  backArrow: {
    fontSize: scale(24),
    fontWeight: 'bold',
    marginRight: scale(10),
    color: '#000',
  },
  title: {
    fontSize: scale(20),
    fontWeight: 'bold',
    color: '#000',
  },
  subtitle: {
    fontSize: scale(14),
    color: '#333',
  },
  list: {
    paddingHorizontal: scale(16),
    paddingBottom: scale(20),
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: scale(12),
    padding: scale(12),
    marginBottom: scale(16),
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  image: {
    width: scale(80),
    height: scale(80),
    borderRadius: scale(12),
  },
  textContainer: {
    flex: 1,
    marginLeft: scale(12),
    justifyContent: 'center',
  },
  name: {
    fontSize: scale(16),
    fontWeight: '700',
    color: '#000',
  },
  availability: {
    fontSize: scale(13),
    color: '#444',
    marginTop: scale(8),
    fontWeight: '600',
    fontStyle: 'italic',
  },
  heartButton: {
    position: 'absolute',
    right: scale(12),
    bottom: scale(12),
  },
  heartIcon: {
    width: scale(20),
    height: scale(20),
  },
});

export default DairyProducts;
