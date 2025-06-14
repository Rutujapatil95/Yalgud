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
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const BASE_WIDTH = 375;
const scale = size => (SCREEN_WIDTH / BASE_WIDTH) * size;

const breadVariants = [
  {
    id: '1',
    name: 'Regular Bread',
    price: 25,
    mrp: 35,
    image: require('../Images/bredlogo.jpg'),
  },
  {
    id: '2',
    name: 'Butter  Bread',
    price: 30,
    mrp: 40,
    image: require('../Images/bredlogo.jpg'),
  },
  {
    id: '3',
    name: 'Mini  Bread',
    price: 20,
    mrp: 28,
    image: require('../Images/bredlogo.jpg'),
  },
];

const BreadScreen = () => {
  const navigation = useNavigation();

  const [quantities, setQuantities] = useState(
    breadVariants.reduce((acc, item) => {
      acc[item.id] = 1;
      return acc;
    }, {})
  );

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [popupQuantity, setPopupQuantity] = useState(0);

  const increment = id => {
    setQuantities(prev => ({ ...prev, [id]: prev[id] + 1 }));
  };

  const decrement = id => {
    setQuantities(prev => ({
      ...prev,
      [id]: prev[id] > 1 ? prev[id] - 1 : 1,
    }));
  };

  const openPopup = variant => {
    setSelectedVariant(variant);
    setPopupQuantity(quantities[variant.id]); // Set current quantity
    setModalVisible(true);
  };

  const closePopup = () => {
    setModalVisible(false);
    setSelectedVariant(null);
  };

  const confirmPopupQuantity = () => {
    if (selectedVariant) {
      setQuantities(prev => ({
        ...prev,
        [selectedVariant.id]: popupQuantity,
      }));
    }
    closePopup();
  };

  const handleCartPress = () => {
    const selectedItems = breadVariants.map(variant => {
      const qty = quantities[variant.id];
      return {
        ...variant,
        quantity: qty,
        total: qty * variant.price,
      };
    });

    const totalAmount = selectedItems.reduce(
      (acc, item) => acc + item.total,
      0
    );

    navigation.navigate('PaymentScreen', {
      cartItems: selectedItems,
      totalAmount,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: scale(100) }}>
        <Text style={styles.name}> Bread / ब्रेड</Text>
        <Text style={styles.sectionTitle}>Select Type</Text>

        {breadVariants.map(variant => {
          const qty = quantities[variant.id];
          const totalPrice = variant.price * qty;
          const totalMRP = variant.mrp * qty;
          const totalProfit = totalMRP - totalPrice;

          return (
            <TouchableOpacity
              key={variant.id}
              style={styles.variantCard}
              onPress={() => openPopup(variant)}
            >
              <Image source={variant.image} style={styles.variantImage} />
              <View style={styles.textContainer}>
                <View style={styles.row}>
                  <Text style={styles.variantName} numberOfLines={1} ellipsizeMode="tail">
                    {variant.name}
                  </Text>

                  <View style={styles.profitTag}>
                    <Text style={styles.profitText}>₹{totalProfit}</Text>
                  </View>

                  <Text style={styles.price}>₹{totalPrice}</Text>
                  <Text style={styles.mrp}>₹{totalMRP}</Text>
                </View>

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
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Modal for Item Details */}
      <Modal transparent={true} visible={modalVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedVariant && (
              <>
                <Image source={selectedVariant.image} style={styles.modalImage} />
                <Text style={styles.modalName}>{selectedVariant.name}</Text>
                <Text style={styles.modalPrice}>Price: ₹{selectedVariant.price}</Text>
                <Text style={styles.modalMrp}>MRP: ₹{selectedVariant.mrp}</Text>

                <View style={styles.counterWrapper}>
                  <TouchableOpacity
                    onPress={() => setPopupQuantity(qty => (qty > 0 ? qty - 1 : 0))}
                    style={styles.counterButton}
                  >
                    <Text style={styles.counterText}>−</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantity}>{popupQuantity}</Text>
                  <TouchableOpacity
                    onPress={() => setPopupQuantity(qty => qty + 1)}
                    style={styles.counterButton}
                  >
                    <Text style={styles.counterText}>+</Text>
                  </TouchableOpacity>
                </View>

                <Text style={styles.modalTotal}>Total: ₹{selectedVariant.price * popupQuantity}</Text>

                <TouchableOpacity style={styles.addButton} onPress={confirmPopupQuantity}>
                  <Text style={styles.addButtonText}>Add to List</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.closeButton} onPress={closePopup}>
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>

      <View style={styles.bottomCartContainer}>
        <TouchableOpacity style={styles.cartButton} onPress={handleCartPress}>
          <Text style={styles.cartButtonText}>Add All to Cart</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8CC3E2',
    paddingTop: scale(60),
  },
  name: {
    fontSize: scale(26),
    fontWeight: 'bold',
    color: '#1F2937',
    paddingHorizontal: scale(20),
  },
  sectionTitle: {
    fontSize: scale(20),
    fontWeight: '700',
    color: '#111827',
    marginTop: scale(16),
    paddingHorizontal: scale(20),
  },
  variantCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: scale(20),
    marginTop: scale(14),
    borderRadius: scale(12),
    padding: scale(20),
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
    flexWrap: 'wrap',
  },
  variantName: {
    fontSize: scale(15),
    fontWeight: 'bold',
    color: '#1F2937',
    maxWidth: scale(100),
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
    marginTop: scale(10),
  },
  counterWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: scale(8),
    paddingHorizontal: scale(6),
    paddingVertical: scale(2),
    marginLeft: scale(146),
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
  bottomCartContainer: {
    position: 'absolute',
    bottom: scale(10),
    left: scale(20),
    right: scale(20),
    backgroundColor: '#2563EB',
    borderRadius: scale(12),
  },
  cartButton: {
    paddingVertical: scale(14),
    alignItems: 'center',
  },
  cartButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: scale(16),
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: scale(280),
    backgroundColor: '#fff',
    padding: scale(20),
    borderRadius: scale(12),
    alignItems: 'center',
  },
  modalImage: {
    width: scale(100),
    height: scale(100),
    marginBottom: scale(10),
    borderRadius: scale(8),
  },
  modalName: {
    fontSize: scale(18),
    fontWeight: 'bold',
    marginBottom: scale(8),
  },
  modalPrice: {
    fontSize: scale(14),
    color: '#221180',
    fontWeight: '700',
  },
  modalMrp: {
    fontSize: scale(14),
    textDecorationLine: 'line-through',
    color: '#221180 ',
    marginBottom: scale(10),
  },
  modalTotal: {
    fontSize: scale(16),
    fontWeight: '600',
    marginVertical: scale(10),
  },
  addButton: {
    marginTop: scale(6),
    backgroundColor: '#10B981',
    paddingHorizontal: scale(20),
    paddingVertical: scale(10),
    borderRadius: scale(8),
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: scale(14),
  },
  closeButton: {
    marginTop: scale(10),
    backgroundColor: '#EF4444',
    paddingHorizontal: scale(20),
    paddingVertical: scale(8),
    borderRadius: scale(8),
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default BreadScreen;
