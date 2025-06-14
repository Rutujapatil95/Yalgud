import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// Get device dimensions
const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

// Base guideline sizes for scaling (iPhone X sizes)
const BASE_WIDTH = 375;
const BASE_HEIGHT = 812;

// Scale helpers
const scale = size => (SCREEN_WIDTH / BASE_WIDTH) * size;
const verticalScale = size => (SCREEN_HEIGHT / BASE_HEIGHT) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

// Define breakpoint for tablets and desktops
const isLargeScreen = SCREEN_WIDTH >= 768; // tablet or desktop

const initialItems = [
  {id: '1', name: 'Milk 1L', price: 60, image: require('../Images/milk.jpg')},
  {id: '2', name: 'Bread', price: 30, image: require('../Images/bread1.jpg')},
  {
    id: '3',
    name: 'Kaju Katli',
    price: 200,
    image: require('../Images/kaju.jpg'),
  },
  {
    id: '4',
    name: 'Paneer 200g',
    price: 90,
    image: require('../Images/paneer2.png'),
  },
  {
    id: '5',
    name: 'Butter 100g',
    price: 55,
    image: require('../Images/butter.png'),
  },
  {
    id: '6',
    name: 'Chocolate Cupcake',
    price: 90,
    image: require('../Images/cupcake.jpg'),
  },
];

const previousBillsInitial = [
  {
    id: 'bill1',
    items: [
      {
        id: '1',
        name: 'Milk 1L',
        price: 70,
        qty: 89,
        image: require('../Images/milk.jpg'),
      },
      {
        id: '2',
        name: 'Bread',
        price: 50,
        qty: 77,
        image: require('../Images/bread1.jpg'),
      },
      {
        id: '3',
        name: 'Kaju Katli',
        price: 389,
        qty: 85,
        image: require('../Images/kaju.jpg'),
      },
      {
        id: '4',
        name: 'Paneer 200g',
        price: 90,
        qty: 55,
        image: require('../Images/paneer2.png'),
      },
      {
        id: '5',
        name: 'Butter 100g',
        price: 55,
        qty: 77,
        image: require('../Images/butter.png'),
      },
      {
        id: '6',
        name: 'Chocolate Cupcake',
        price: 72,
        qty: 93,
        image: require('../Images/cupcake.jpg'),
      },
    ],
  },
  {
    id: 'bill2',
    items: [
      {
        id: '1',
        name: 'Mawa Cake',
        price: 260,
        qty: 64,
        image: require('../Images/mawacake.jpg'),
      },
      {
        id: '2',
        name: 'Shev',
        price: 130,
        qty: 78,
        image: require('../Images/shev.jpg'),
      },
      {
        id: '3',
        name: 'Lassi',
        price: 200,
        qty: 88,
        image: require('../Images/lassi3.jpg'),
      },
      {
        id: '4',
        name: 'Khavyache Modak',
        price: 490,
        qty: 52,
        image: require('../Images/modak.jpg'),
      },
      {
        id: '5',
        name: 'Amrakhand',
        price: 255,
        qty: 67,
        image: require('../Images/khand250gm.png'),
      },
      {
        id: '6',
        name: 'Pastry',
        price: 89,
        qty: 92,
        image: require('../Images/pastry.png'),
      },
    ],
  },
];

const InvoiceListScreen = () => {
  const [quantities, setQuantities] = useState({});
  const [selectedItems, setSelectedItems] = useState(null);
  const [previousBills, setPreviousBills] = useState(previousBillsInitial);

  const navigation = useNavigation();

  // Increase quantity (for modify or fresh selection)
  const increaseQty = id => {
    if (selectedItems) {
      const updated = selectedItems.map(item =>
        item.id === id ? {...item, qty: item.qty + 1} : item,
      );
      setSelectedItems(updated);
    } else {
      setQuantities(prev => ({...prev, [id]: (prev[id] || 0) + 1}));
    }
  };

  // Decrease quantity
  const decreaseQty = id => {
    if (selectedItems) {
      const updated = selectedItems
        .map(item =>
          item.id === id ? {...item, qty: Math.max(item.qty - 1, 0)} : item,
        )
        .filter(item => item.qty > 0);
      setSelectedItems(updated);
    } else {
      setQuantities(prev => ({
        ...prev,
        [id]: Math.max((prev[id] || 0) - 1, 0),
      }));
    }
  };

  // Delete previous bill confirmation
  const deletePreviousBill = billId => {
    Alert.alert(
      'Delete Previous Order',
      'Are you sure you want to delete this entire previous order?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setPreviousBills(prevBills =>
              prevBills.filter(bill => bill.id !== billId),
            );
          },
        },
      ],
    );
  };

  // Repeat entire bill - merge quantities if items already exist
  const repeatBill = itemsToRepeat => {
    if (!selectedItems) {
      setSelectedItems(itemsToRepeat.map(item => ({...item})));
    } else {
      let updatedItems = [...selectedItems];

      itemsToRepeat.forEach(itemToAdd => {
        const existingIndex = updatedItems.findIndex(
          item => item.id === itemToAdd.id,
        );
        if (existingIndex >= 0) {
          updatedItems[existingIndex].qty += itemToAdd.qty;
        } else {
          updatedItems.push({...itemToAdd});
        }
      });

      setSelectedItems(updatedItems);
    }
  };

  // Checkout handler
  const handleCheckout = () => {
    let finalItems;
    if (selectedItems && selectedItems.length > 0) {
      finalItems = selectedItems;
    } else {
      const filtered = initialItems.filter(item => quantities[item.id] > 0);
      finalItems = filtered.map(item => ({
        ...item,
        qty: quantities[item.id],
      }));
    }

    if (finalItems.length === 0) {
      Alert.alert(
        'No items selected',
        'Please select at least one item to proceed.',
      );
      return;
    }

    // Navigate to Payment screen with selected items
    navigation.navigate('PaymentScreen', {items: finalItems});
  };

  // Render each item card
  const renderItem = ({item}) => {
    const qty = selectedItems ? item.qty : quantities[item.id] || 0;
    const total = qty * item.price;

    return (
      <View style={styles.card}>
        <Image source={item.image} style={styles.image} resizeMode="cover" />
        <Text style={styles.itemName} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles.itemPrice}>
          ₹{item.price} × {qty} = ₹{total}
        </Text>

        <View style={styles.counter}>
          <TouchableOpacity
            onPress={() => decreaseQty(item.id)}
            style={styles.counterBtn}>
            <Text style={styles.counterText}>−</Text>
          </TouchableOpacity>
          <Text style={styles.qtyText}>{qty}</Text>
          <TouchableOpacity
            onPress={() => increaseQty(item.id)}
            style={styles.counterBtn}>
            <Text style={styles.counterText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // Render previous bill summary card
  const renderPreviousBill = ({item}) => {
    const total = item.items.reduce((sum, i) => sum + i.price * i.qty, 0);

    return (
      <View style={styles.prevCard}>
        <Text style={styles.prevTitle}>🧾 Previous Order</Text>
        {item.items.slice(0, 6).map(product => (
          <View key={product.id} style={styles.prevItem}>
            <Image
              source={product.image}
              style={styles.prevImage}
              resizeMode="cover"
            />
            <Text style={styles.prevText}>
              {product.name} (x{product.qty})
            </Text>
          </View>
        ))}
        {item.items.length > 6 && (
          <Text style={styles.moreText}>
            + {item.items.length - 6} more items
          </Text>
        )}
        <Text style={styles.prevTotal}>Total: ₹{total}</Text>

        <View style={styles.prevButtonsRow}>
          <TouchableOpacity
            style={styles.modifyBtn}
            onPress={() => repeatBill(item.items)}>
            <Text style={styles.modifyText}>🔁 Repeat</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.modifyBtn, styles.deleteBtn]}
            onPress={() => deletePreviousBill(item.id)}>
            <Text style={[styles.modifyText, {color: '#fff'}]}>🗑️ Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled">
        <Text style={styles.heading}>🛒 Quick Purchase</Text>

        <Text style={styles.sectionTitle}>🧾 Previous Bills</Text>
        {previousBills.length === 0 ? (
          <Text style={styles.noPreviousBillsText}>
            No previous bills available.
          </Text>
        ) : (
          <FlatList
            data={previousBills}
            renderItem={renderPreviousBill}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.verticalList}
            scrollEnabled={false}
          />
        )}

        <Text style={styles.sectionTitle}>
          {selectedItems ? '🛠️ Modify Items' : '🛍️ All Items'}
        </Text>

        {/* Responsive layout for items */}
        {isLargeScreen ? (
          <FlatList
            data={selectedItems || initialItems}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            numColumns={3} // 3 per row on large screens
            contentContainerStyle={styles.gridList}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            key={'grid'} // force re-render if layout changes
          />
        ) : (
          <FlatList
            data={selectedItems || initialItems}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            horizontal
            contentContainerStyle={styles.horizontalList}
            showsHorizontalScrollIndicator={false}
            key={'horizontal'}
          />
        )}

        <TouchableOpacity style={styles.checkoutBtn} onPress={handleCheckout}>
          <Text style={styles.checkoutText}>🧾 Buy Now</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8CC3E2',
  },

  scrollContent: {
    paddingBottom: verticalScale(40),
    paddingTop: verticalScale(50),
  },

  heading: {
    fontSize: moderateScale(26),
    fontWeight: 'bold',
    marginHorizontal: scale(20),
    color: '#1F2937',
    marginBottom: verticalScale(20),
  },

  sectionTitle: {
    fontSize: moderateScale(18),
    fontWeight: '600',
    marginHorizontal: scale(20),
    marginVertical: verticalScale(8),
    color: '#1F2937',
  },

  noPreviousBillsText: {
    marginHorizontal: scale(20),
    color: '#555',
    fontSize: moderateScale(14),
  },

  horizontalList: {
    paddingLeft: scale(16),
    paddingBottom: verticalScale(8),
  },

  gridList: {
    paddingHorizontal: scale(16),
    paddingBottom: verticalScale(8),
  },

  verticalList: {
    paddingHorizontal: scale(16),
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: scale(14),
    margin: scale(8),
    padding: scale(14),

    width: isLargeScreen ? (SCREEN_WIDTH - scale(72)) / 3 : SCREEN_WIDTH * 0.42,

    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.15,
    shadowRadius: 5,

    elevation: 4,
  },

  image: {
    width: scale(90),
    height: scale(90),
    borderRadius: scale(10),
    marginBottom: scale(8),
  },

  itemName: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    textAlign: 'center',
    color: '#1F2937',
  },

  itemPrice: {
    fontSize: moderateScale(13),
    marginTop: scale(6),
    color: '#EF4444',
    fontWeight: '600',
  },

  counter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scale(10),
    backgroundColor: '#E0E7FF',
    borderRadius: scale(10),
    paddingHorizontal: scale(10),
    paddingVertical: scale(4),
  },

  counterBtn: {
    backgroundColor: '#E0E7FF',
    borderRadius: scale(8),
    padding: scale(4),
    width: scale(28),
    height: scale(28),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#93C5FD',
  },

  counterText: {
    color: '#1E3A8A',
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    lineHeight: moderateScale(18),
  },

  qtyText: {
    marginHorizontal: scale(12),
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: '#1F2937',
  },

  prevCard: {
    backgroundColor: '#fff',
    borderRadius: scale(12),
    marginBottom: verticalScale(16),
    padding: scale(12),

    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,

    elevation: 3,
  },

  prevTitle: {
    fontSize: moderateScale(15),
    fontWeight: '700',
    marginBottom: scale(8),
    color: '#1F2937',
  },

  prevItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(6),
  },

  prevImage: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(8),
    marginRight: scale(10),
  },

  prevText: {
    fontSize: moderateScale(14),
    color: '#1F2937',
    flexShrink: 1,
  },

  moreText: {
    fontSize: moderateScale(13),
    fontStyle: 'italic',
    color: '#555',
    marginBottom: scale(4),
  },

  prevTotal: {
    fontSize: moderateScale(15),
    fontWeight: 'bold',
    color: '#EF4444',
    marginTop: scale(5),
  },

  prevButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: scale(10),
  },

  modifyBtn: {
    backgroundColor: '#2563EB',
    paddingVertical: verticalScale(8),
    borderRadius: scale(10),
    alignItems: 'center',
    flex: 1,
    marginHorizontal: scale(5),
  },

  deleteBtn: {
    backgroundColor: '#2563EB',
  },

  modifyText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: moderateScale(14),
  },

  checkoutBtn: {
    marginHorizontal: scale(20),
    marginTop: verticalScale(20),
    backgroundColor: '#1E40AF',
    paddingVertical: verticalScale(12),
    borderRadius: scale(12),
    alignItems: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 2},

    elevation: 5,
  },

  checkoutText: {
    color: '#fff',
    fontSize: moderateScale(18),
    fontWeight: 'bold',
  },
});

export default InvoiceListScreen;
