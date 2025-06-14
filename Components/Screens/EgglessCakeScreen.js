import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const BASE_WIDTH = 375;
const scale = size => (SCREEN_WIDTH / BASE_WIDTH) * size;

const egglessVariants = [
  {
    id: '1',
    name: 'Eggless Chocolate Cake',
    price: 250,
    mrp: 300,
    image: require('../Images/egg.jpg'),
  },
  {
    id: '2',
    name: 'Eggless Vanilla Cake',
    price: 220,
    mrp: 270,
    image: require('../Images/egg.jpg'),
  },
  {
    id: '3',
    name: 'Eggless Pineapple Cake',
    price: 240,
    mrp: 290,
    image: require('../Images/egg.jpg'),
  },
  {
    id: '4',
    name: 'Eggless Strawberry Cake',
    price: 260,
    mrp: 310,
    image: require('../Images/egg.jpg'),
  },
];

const EgglessCakeScreen = () => {
  const navigation = useNavigation();

  const [quantities, setQuantities] = useState(
    egglessVariants.reduce((acc, item) => {
      acc[item.id] = 1;
      return acc;
    }, {})
  );

  const increment = id => {
    setQuantities(prev => ({ ...prev, [id]: prev[id] + 1 }));
  };

  const decrement = id => {
    setQuantities(prev => ({
      ...prev,
      [id]: prev[id] > 1 ? prev[id] - 1 : 1,
    }));
  };

  const handleAddToCart = variant => {
    const qty = quantities[variant.id];
    navigation.navigate('PaymentScreen', {
      item: variant,
      quantity: qty,
      total: variant.price * qty,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#8CC3E2" barStyle="dark-content" />
      <ScrollView contentContainerStyle={{ paddingBottom: scale(30) }}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Eggless Cake / एगलेस केक</Text>
        </View>

        {/* Variants List */}
        {egglessVariants.map(variant => {
          const qty = quantities[variant.id];
          const totalPrice = variant.price * qty;
          const totalMrp = variant.mrp * qty;
          const totalProfit = totalMrp - totalPrice;

          return (
            <View key={variant.id} style={styles.variantCard}>
              <Image source={variant.image} style={styles.variantImage} />

              <View style={styles.textContainer}>
                {/* Top Row: Name + Profit + Price + MRP */}
                <View style={styles.topRow}>
                  <Text
                    style={styles.variantName}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {variant.name}
                  </Text>

                  <View style={styles.profitTag}>
                    <Text style={styles.profitText}>+₹{totalProfit}</Text>
                  </View>

                  <Text style={styles.price}>₹{totalPrice}</Text>
                  <Text style={styles.mrp}>₹{totalMrp}</Text>
                </View>

                {/* Bottom Row: Quantity Counter + Add to Cart */}
                <View style={styles.bottomRow}>
                  <View style={styles.counterWrapper}>
                    <TouchableOpacity onPress={() => decrement(variant.id)} style={styles.counterButton}>
                      <Text style={styles.counterText}>−</Text>
                    </TouchableOpacity>

                    <Text style={styles.quantity}>{qty}</Text>

                    <TouchableOpacity onPress={() => increment(variant.id)} style={styles.counterButton}>
                      <Text style={styles.counterText}>+</Text>
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity style={styles.cartButton} onPress={() => handleAddToCart(variant)}>
                    <Text style={styles.cartButtonText}>Add to Cart</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8CC3E2',
    paddingTop: scale(40),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(20),
    marginBottom: scale(10),
  },
  backButton: {
    paddingRight: scale(10),
  },
  backArrow: {
    fontSize: scale(24),
    fontWeight: 'bold',
    color: '#1F2937',
  },
  title: {
    fontSize: scale(26),
    fontWeight: 'bold',
    color: '#1F2937',
  },
  variantCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: scale(20),
    marginTop: scale(14),
    borderRadius: scale(12),
    padding: scale(10),
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  variantImage: {
    width: scale(60),
    height: scale(60),
    resizeMode: 'contain',
    borderRadius: scale(8),
  },
  textContainer: {
    flex: 1,
    marginLeft: scale(12),
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'nowrap',
  },
  variantName: {
    fontSize: scale(15),
    fontWeight: 'bold',
    color: '#1F2937',
    maxWidth: scale(110),
  },
  profitTag: {
    backgroundColor: '#10B981',
    paddingHorizontal: scale(8),
    paddingVertical: scale(2),
    borderRadius: scale(20),
    marginLeft: scale(8),
  },
  profitText: {
    color: '#fff',
    fontSize: scale(12),
    fontWeight: '600',
  },
  price: {
    fontSize: scale(16),
    color: '#DC2626',
    fontWeight: 'bold',
    marginLeft: scale(12),
  },
  mrp: {
    fontSize: scale(13),
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
    marginLeft: scale(6),
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: scale(10),
  },
  counterWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: scale(8),
    paddingHorizontal: scale(6),
    paddingVertical: scale(2),
  },
  counterButton: {
    paddingHorizontal: scale(8),
  },
  counterText: {
    fontSize: scale(18),
    fontWeight: '600',
    color: '#111827',
  },
  quantity: {
    fontSize: scale(15),
    marginHorizontal: scale(4),
  },
  cartButton: {
    backgroundColor: '#2563EB',
    borderRadius: scale(8),
    paddingHorizontal: scale(14),
    paddingVertical: scale(8),
    marginLeft: scale(60),
  },
  cartButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: scale(13),
  },
});

export default EgglessCakeScreen;
