import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Get screen dimensions
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Base width used for scaling (based on iPhone 11/12/13 width ~375)
const BASE_WIDTH = 375;

// Scale function for horizontal scaling
const scale = size => (SCREEN_WIDTH / BASE_WIDTH) * size;

// Optional: vertical scale (can be used for vertical paddings/margins)
const verticalScale = size => (SCREEN_HEIGHT / 812) * size; // 812 = base height (iPhone 11)

// Moderate scale for less aggressive scaling
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;

const CartScreen = () => {
  const navigation = useNavigation();

  const [cartItems, setCartItems] = useState([
    {
      id: '1',
      name: 'Classic Chivda',
      price: 25,
      mrp: 30,
      quantity: 1,
      image: require('../Images/chivda.jpg'),
    },
    {
      id: '2',
      name: 'Paneer',
      price: 30,
      mrp: 35,
      quantity: 1,
      image: require('../Images/paneer2.png'),
    },
    {
      id: '3',
      name: 'Pastry',
      price: 28,
      mrp: 34,
      quantity: 1,
      image: require('../Images/pastry.png'),
    },
  ]);

  const increment = id => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decrement = id => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item,
      ),
    );
  };

  const getTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handlePay = () => {
    const totalAmount = getTotal();
    navigation.navigate('PaymentScreen', {
      items: cartItems,
      total: totalAmount,
    });
  };

  const handleSave = () => {
    alert('Save button pressed');
  };

  const handleBookAndSave = () => {
    alert('Book & Save button pressed');
  };

  const renderItem = ({ item }) => {
    const { name, price, mrp, quantity, image } = item;
    const totalPrice = price * quantity;
    const totalMrp = mrp * quantity;
    const profit = (mrp - price) * quantity;

    return (
      <View style={styles.variantRow}>
        <Image source={image} style={styles.variantImage} />

        <View style={styles.variantInfoWrapper}>
          <View style={styles.variantNamePriceRow}>
            <Text style={styles.variantName}>{name}</Text>
            <View style={styles.priceWrapper}>
              <Text style={styles.price}>₹{totalPrice}</Text>
              <Text style={styles.mrp}>₹{totalMrp}</Text>
            </View>
          </View>

          <View style={styles.quantityControls}>
            <TouchableOpacity
              onPress={() => decrement(item.id)}
              style={styles.quantityButton}>
              <Text style={styles.quantityButtonText}>−</Text>
            </TouchableOpacity>

            <Text style={styles.quantityText}>{quantity}</Text>

            <TouchableOpacity
              onPress={() => increment(item.id)}
              style={styles.quantityButton}>
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>

            <View style={styles.profitCircle}>
              <Text style={styles.profitText}>+₹{profit}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FCD34D" barStyle="dark-content" />

      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}>
        <Text style={styles.backArrow}>←</Text>
      </TouchableOpacity>

      <Text style={styles.name}>My Cart</Text>

      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: verticalScale(160) }}
        showsVerticalScrollIndicator={false}
      />

      {/* Total Section */}
      <View style={styles.totalContainer}>
        <View>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalValue}>₹{getTotal()}</Text>
        </View>
      </View>

      {/* Bottom buttons row */}
      <View style={styles.bottomButtonsContainer}>
        <TouchableOpacity
          style={[styles.bottomButton, styles.payButton]}
          onPress={handlePay}>
          <Text style={styles.buttonText}>Pay</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.bottomButton, styles.saveButton]}
          onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.bottomButton, styles.bookSaveButton]}
          onPress={handleBookAndSave}>
          <Text style={styles.buttonText}>Book & Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8CC3E2',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : verticalScale(20),
  },
  backButton: {
    paddingHorizontal: scale(20),
    marginBottom: verticalScale(10),
  },
  backArrow: {
    fontSize: moderateScale(24),
    color: '#000',
    fontWeight: 'bold',
  },
  name: {
    fontSize: moderateScale(26),
    fontWeight: 'bold',
    color: '#1F2937',
    paddingHorizontal: scale(20),
    marginBottom: verticalScale(10),
  },
  variantRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: scale(14),
    marginTop: verticalScale(14),
    marginHorizontal: scale(20),
    borderRadius: scale(12),
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(6),
    alignItems: 'center',
  },
  variantImage: {
    width: scale(70),
    height: scale(70),
    resizeMode: 'contain',
    borderRadius: scale(10),
    marginRight: scale(16),
  },
  variantInfoWrapper: {
    flex: 1,
  },
  variantNamePriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  variantName: {
    fontSize: moderateScale(15),
    fontWeight: '600',
    color: '#374151',
  },
  priceWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: moderateScale(17),
    fontWeight: '700',
    color: '#DC2626',
    marginRight: scale(10),
  },
  mrp: {
    fontSize: moderateScale(14),
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(14),
    flexWrap: 'wrap',
  },
  quantityButton: {
    backgroundColor: '#E5E7EB',
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(7),
    borderRadius: scale(8),
  },
  quantityButtonText: {
    fontSize: moderateScale(22),
    color: '#374151',
    fontWeight: '600',
  },
  quantityText: {
    marginHorizontal: scale(16),
    fontSize: moderateScale(18),
    minWidth: scale(25),
    textAlign: 'center',
  },
  profitCircle: {
    backgroundColor: '#10B981',
    borderRadius: scale(20),
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(3),
    position: 'absolute',
    right: scale(10),
    top: verticalScale(8),
    // Adjusted position for responsive layout
  },
  profitText: {
    color: '#fff',
    fontSize: moderateScale(13),
    fontWeight: '600',
  },
  totalContainer: {
    backgroundColor: '#8CC3E2',
    padding: scale(16),
    borderTopWidth: 1,
    borderColor: '#E5E7EB',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'absolute',
    bottom: verticalScale(70),
    left: 0,
    right: 0,
    elevation: 8,
  },
  totalLabel: {
    fontSize: moderateScale(20),
    fontWeight: '700',
    color: '#111827',
  },
  totalValue: {
    fontSize: moderateScale(20),
    fontWeight: '700',
    color: '#238000',
    marginLeft: scale(10),
  },
  bottomButtonsContainer: {
    position: 'absolute',
    bottom: verticalScale(10),
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#8CC3E2',
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(10),
    borderTopWidth: 1,
    borderColor: '#E5E7EB',
    elevation: 10,
  },
  bottomButton: {
    flex: 1,
    marginHorizontal: scale(5),
    paddingVertical: verticalScale(10),
    borderRadius: scale(10),
    alignItems: 'center',
  },
  payButton: {
    backgroundColor: '#2563EB',
  },
  saveButton: {
    backgroundColor: '#2563EB',
  },
  bookSaveButton: {
    backgroundColor: '#2563EB',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: moderateScale(16),
  },
});

export default CartScreen;
