import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StatusBar,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const BASE_WIDTH = 375;
const scale = size => (SCREEN_WIDTH / BASE_WIDTH) * size;

const productVariants = [
  { id: '1', name: '100 gm Cup', price: 30, mrp: 40, image: require('../Images/khand100.jpg') },
  { id: '2', name: '250 gm Cup', price: 60, mrp: 80, image: require('../Images/khand100.jpg') },
  { id: '3', name: '500 gm Cup', price: 100, mrp: 120, image: require('../Images/khand100.jpg') },
  { id: '4', name: '250 gm Pack', price: 90, mrp: 110, image: require('../Images/khandpack250.png') },
  { id: '5', name: '500 gm Pack', price: 150, mrp: 180, image: require('../Images/khandpack250.png') },
  { id: '6', name: '5 Kg Pack', price: 600, mrp: 700, image: require('../Images/khandpack250.png') },
  { id: '7', name: '10 Kg Pack', price: 1100, mrp: 1300, image: require('../Images/khandpack250.png') },
];

const ProductDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { product } = route.params || {};

  const [quantities, setQuantities] = useState(
    productVariants.reduce((acc, item) => {
      acc[item.id] = 1;
      return acc;
    }, {})
  );

  const increment = (id) => {
    setQuantities(prev => ({ ...prev, [id]: prev[id] + 1 }));
  };

  const decrement = (id) => {
    setQuantities(prev => ({
      ...prev,
      [id]: prev[id] > 1 ? prev[id] - 1 : 1,
    }));
  };

  const handleAddToCart = (variant) => {
    if (!variant) {
      Alert.alert('Error', 'Variant data is missing.');
      return;
    }
    const qty = quantities[variant.id] || 1;
    navigation.navigate('PaymentScreen', {
      variant,
      quantity: qty,
      product,
    });
  };

  if (!product) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text style={{ fontSize: scale(18) }}>Product details not available.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#8CC3E2" barStyle="dark-content" />

      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backArrow}>←</Text>
      </TouchableOpacity>

      <Text style={styles.name}>{product.name}</Text>
      {product.marathiName ? (
        <Text style={styles.marathiName}>{product.marathiName}</Text>
      ) : null}

      <Text style={styles.sectionTitle}>Select Package</Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: scale(30) }}
      >
        {productVariants.map((variant) => {
          const qty = quantities[variant.id] || 1;
          const totalPrice = variant.price * qty;
          const totalMrp = variant.mrp * qty;
          const totalProfit = totalMrp - totalPrice;

          return (
            <View key={variant.id} style={styles.variantCard}>
              <Image source={variant.image} style={styles.variantImage} />

              <View style={styles.textContainer}>
                <View style={styles.row}>
                  <Text style={styles.variantName} numberOfLines={1} ellipsizeMode="tail">
                    {variant.name}
                  </Text>

                  <View style={styles.profitTag}>
                    <Text style={styles.profitText}>+₹{totalProfit}</Text>
                  </View>

                  <Text style={styles.price}>₹{totalPrice}</Text>
                  <Text style={styles.mrp}>₹{totalMrp}</Text>
                </View>

                <View style={styles.bottomRow}>
                  <View style={styles.counterWrapper}>
                    <TouchableOpacity
                      onPress={() => decrement(variant.id)}
                      style={styles.counterButton}
                    >
                      <Text style={styles.counterText}>−</Text>
                    </TouchableOpacity>

                    <Text style={styles.quantity}>{qty}</Text>

                    <TouchableOpacity
                      onPress={() => increment(variant.id)}
                      style={styles.counterButton}
                    >
                      <Text style={styles.counterText}>+</Text>
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity
                    style={styles.cartButton}
                    onPress={() => handleAddToCart(variant)}
                  >
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
    paddingTop: scale(20),
  },
  backButton: {
    paddingHorizontal: scale(20),
    marginBottom: scale(10),
    width: scale(40),
  },
  backArrow: {
    fontSize: scale(24),
    color: '#000',
    fontWeight: 'bold',
  },
  name: {
    fontSize: scale(26),
    fontWeight: 'bold',
    color: '#1F2937',
    paddingHorizontal: scale(20),
    marginBottom: scale(6),
  },
  marathiName: {
    fontSize: scale(16),
    fontStyle: 'italic',
    color: '#444',
    paddingHorizontal: scale(20),
    marginBottom: scale(10),
  },
  sectionTitle: {
    fontSize: scale(20),
    fontWeight: '700',
    color: '#111827',
    marginTop: scale(6),
    paddingHorizontal: scale(20),
  },
  variantCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: scale(20),
    marginTop: scale(14),
    borderRadius: scale(12),
    padding: scale(10),
    alignItems: 'center',
    elevation: 2,
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
    marginLeft: scale(10),
  },
  row: {
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
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProductDetailsScreen;
