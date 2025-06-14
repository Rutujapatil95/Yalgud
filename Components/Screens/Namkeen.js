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

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const BASE_WIDTH = 375; // base width to scale from (iPhone 11 Pro)
const scale = size => (SCREEN_WIDTH / BASE_WIDTH) * size;

const namkeenItems = [
  {
    id: '1',
    name: 'Sev',
    displayName: 'Sev/सेव',
    availability: '100gm | 250gm | 500gm',
    image: require('../Images/shev.jpg'),
  },
  {
    id: '2',
    name: 'Chivda',
    displayName: 'Chivda/चिवडा',
    availability: '100gm | 250gm | 500gm',
    image: require('../Images/chivda.jpg'),
  },
  {
    id: '3',
    name: 'Bhujia',
    displayName: 'Chakli/चकली',
    availability: '100gm | 250gm | 500gm',
    image: require('../Images/chakli.jpg'),
  },
  {
    id: '4',
    name: 'Farsan',
    displayName: 'Farsan/फरसाण',
    availability: '100gm | 250gm | 500gm',
    image: require('../Images/farsana1.jpg'),
  },
  {
    id: '5',
    name: 'Mixture',
    displayName: 'Bhakarwadi/भाकरवडी',
    availability: '100gm | 250gm | 500gm',
    image: require('../Images/wadi.jpg'),
  },
];

const NamkeenScreen = () => {
  const navigation = useNavigation();
  const [liked, setLiked] = useState([]);

  const toggleLike = id => {
    setLiked(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id],
    );
  };

  const navigateToScreen = (name, item) => {
    switch (name) {
      case 'Sev':
        navigation.navigate('SevScreen', {product: item});
        break;
      case 'Chivda':
        navigation.navigate('ChivdaScreen', {product: item});
        break;
      case 'Bhujia':
        navigation.navigate('BhujiaScreen', {product: item});
        break;
      case 'Farsan':
        navigation.navigate('FarsanScreen', {product: item});
        break;
      case 'Mixture':
        navigation.navigate('MixtureScreen', {product: item});
        break;
      default:
        navigation.navigate('NamkeenDetailScreen', {product: item});
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
      <StatusBar backgroundColor="#2c843e" barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>
          Namkeen <Text style={styles.subtitle}>/ नमकीन</Text>
        </Text>
      </View>

      <FlatList
        data={namkeenItems}
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
    backgroundColor: '#8CC3E2',
    marginTop: scale(26),
  },
  backArrow: {
    fontSize: scale(24),
    fontWeight: 'bold',
    marginRight: scale(12),
    color: '#fff',
  },
  title: {
    fontSize: scale(24),
    fontWeight: 'bold',
    color: '#fff',
    marginTop: scale(8),
  },
  subtitle: {
    fontSize: scale(18),
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
    fontSize: scale(15),
    fontWeight: '700',
    color: '#000',
  },
  availabilityLabel: {
    fontSize: scale(15),
    color: '#000',
    marginTop: scale(6),
  },
  availabilityValue: {
    fontSize: scale(15),
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

export default NamkeenScreen;
