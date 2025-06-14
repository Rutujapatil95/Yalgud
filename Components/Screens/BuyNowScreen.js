import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const BuyNowScreen = ({ route }) => {
  const { product } = route.params;
  const navigation = useNavigation();

  const [quantity, setQuantity] = useState(1);

  const increment = () => setQuantity(prev => prev + 1);
  const decrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const totalPrice = product.price * quantity;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Review & Buy</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Product Card */}
        <View style={styles.card}>
          <Image source={product.image} style={styles.productImage} />
          <View style={styles.info}>
            <Text style={styles.name}>{product.name}</Text>
            <Text style={styles.marathi}>{product.marathiName}</Text>
            <Text style={styles.price}>₹ {product.price.toFixed(2)}</Text>
            <Text style={styles.flavor}>Flavor: Mango</Text>

            {/* Quantity Selector */}
            <View style={styles.quantityRow}>
              <Text style={styles.qtyLabel}>Quantity:</Text>
              <View style={styles.qtyControl}>
                <TouchableOpacity onPress={decrement} style={styles.qtyButton}>
                  <Text style={styles.qtyButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.qtyText}>{quantity}</Text>
                <TouchableOpacity onPress={increment} style={styles.qtyButton}>
                  <Text style={styles.qtyButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Total Section */}
        <View style={styles.totalCard}>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.totalAmount}>₹ {totalPrice.toFixed(2)}</Text>
        </View>

        {/* Checkout Button */}
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() =>
            navigation.navigate('PaymentScreen', {
              product,
              quantity,
            })
          }>
          <Text style={styles.checkoutText}>Proceed to Payment</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#ffffff',
    elevation: 3,
    marginTop: 50,
  },
  back: { fontSize: 24, color: '#374151' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#1F2937' },
  scroll: { padding: 16 },

  card: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 20,
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    borderRadius: 10,
    marginRight: 14,
  },
  info: { flex: 1, justifyContent: 'space-between' },
  name: { fontSize: 16, fontWeight: 'bold', color: '#111827' },
  marathi: { fontSize: 14, color: '#6B7280', fontStyle: 'italic', marginVertical: 4 },
  price: { fontSize: 16, fontWeight: '600', color: '#DC2626' },
  flavor: { fontSize: 14, color: '#4B5563', marginTop: 4 },

  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  qtyLabel: { fontSize: 14, marginRight: 10, color: '#374151' },
  qtyControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E5E7EB',
    borderRadius: 8,
    overflow: 'hidden',
  },
  qtyButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#D1D5DB',
  },
  qtyButtonText: { fontSize: 18, color: '#1F2937' },
  qtyText: { paddingHorizontal: 10, fontSize: 16 },

  totalCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  totalLabel: { fontSize: 16, fontWeight: '600', color: '#111827' },
  totalAmount: { fontSize: 18, fontWeight: 'bold', color: '#10B981' },

  checkoutButton: {
    backgroundColor: '#10B981',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 30,
  },
  checkoutText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BuyNowScreen;
