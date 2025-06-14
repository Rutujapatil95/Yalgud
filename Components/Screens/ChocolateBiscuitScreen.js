import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const chocolateVariants = [
  {
    id: '1',
    name: 'Choco Chip Delight',
    price: 25,
    mrp: 30,
    image: require('../Images/chocolatebis.jpg'),
  },
  {
    id: '2',
    name: 'Dark Chocolate Crust',
    price: 28,
    mrp: 34,
    image: require('../Images/chocolatebis.jpg'),
  },
  {
    id: '3',
    name: 'Milk Chocolate Magic',
    price: 24,
    mrp: 29,
    image: require('../Images/chocolatebis.jpg'),
  },
];

const ChocolateBiscuitScreen = () => {
  const navigation = useNavigation();

  const [quantities, setQuantities] = useState(
    chocolateVariants.reduce((acc, item) => {
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
      <StatusBar backgroundColor="#FCD34D" barStyle="dark-content" />
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}>
        <Text style={styles.backArrow}>←</Text>
      </TouchableOpacity>

      <Text style={styles.name}>Chocolate Biscuits</Text>
      <Text style={styles.sectionTitle}>Select Type</Text>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
        {chocolateVariants.map(variant => {
          const qty = quantities[variant.id];
          const totalPrice = variant.price * qty;
          const totalMrp = variant.mrp * qty;
          const totalProfit = (variant.mrp - variant.price) * qty;

          return (
            <View key={variant.id} style={styles.variantRow}>
              <Image source={variant.image} style={styles.variantImage} />

              <View style={styles.variantInfoWrapper}>
                <View style={styles.variantNamePriceRow}>
                  <Text style={styles.variantName}>{variant.name}</Text>
                  <View style={styles.priceWrapper}>
                    <Text style={styles.price}>₹{totalPrice}</Text>
                    <Text style={styles.mrp}>₹{totalMrp}</Text>
                  </View>
                </View>

                <View style={styles.quantityControls}>
                  <TouchableOpacity
                    onPress={() => decrement(variant.id)}
                    style={styles.quantityButton}>
                    <Text style={styles.quantityButtonText}>−</Text>
                  </TouchableOpacity>

                  <Text style={styles.quantityText}>{qty}</Text>

                  <TouchableOpacity
                    onPress={() => increment(variant.id)}
                    style={styles.quantityButton}>
                    <Text style={styles.quantityButtonText}>+</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.addToCartButton}
                    onPress={() => handleAddToCart(variant)}>
                    <Text style={styles.addToCartText}>Add to Cart</Text>
                  </TouchableOpacity>

                  <View style={styles.profitCircle}>
                    <Text style={styles.profitText}>+₹{totalProfit}</Text>
                  </View>
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
  container: { flex: 1, backgroundColor: '#8CC3E2', paddingTop: 30 },
  backButton: { paddingHorizontal: 20, marginBottom: 10 },
  backArrow: { fontSize: 24, color: '#000', fontWeight: 'bold' },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1F2937',
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginTop: 16,
    paddingHorizontal: 20,
  },
  variantRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 14,
    marginTop: 14,
    marginHorizontal: 20,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    alignItems: 'center',
  },
  variantImage: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
    borderRadius: 10,
    marginRight: 16,
  },
  variantInfoWrapper: { flex: 1 },
  variantNamePriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  variantName: { fontSize: 17, fontWeight: '600', color: '#374151' },
  priceWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 17,
    fontWeight: '700',
    color: '#DC2626',
    marginRight: 10,
  },
  mrp: {
    fontSize: 14,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
    flexWrap: 'wrap',
  },
  quantityButton: {
    backgroundColor: '#E5E7EB',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  quantityButtonText: { fontSize: 22, color: '#374151', fontWeight: '600' },
  quantityText: {
    marginHorizontal: 16,
    fontSize: 18,
    minWidth: 25,
    textAlign: 'center',
  },
  addToCartButton: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginLeft: 20,
  },
  addToCartText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
  profitCircle: {
    backgroundColor: '#10B981',
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginLeft: 180,
    marginTop: -92,
    position: 'absolute',
  },
  profitText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
});

export default ChocolateBiscuitScreen;
