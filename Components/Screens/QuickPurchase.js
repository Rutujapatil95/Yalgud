import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const invoiceData = [
  {id: '4255', status: 'Pending'},
  {id: '4252', status: 'Paid'},
  {id: '4253', status: 'Pay'},
  {id: '4254', status: 'Loading'},
];

const QuickPurchase = () => {
  const navigation = useNavigation();

  const renderStatus = status => {
    switch (status) {
      case 'Pending':
        return <Text style={styles.pending}>Pending</Text>;

      case 'Paid':
        return (
          <View style={styles.statusRow}>
            <Image
              source={require('../Images/paid.png')}
              style={styles.paidImage}
            />
            <Text style={styles.paidText}>Paid</Text>
          </View>
        );

      case 'Pay':
        return <Text style={styles.payText}>Pay</Text>;

      case 'Loading':
        return (
          <View style={styles.statusRow}>
            <Text style={styles.pending}>Pending</Text>
            {/* Uncomment if you add a loader image */}
            {/* <Image
              source={require('../Images/loading.png')}
              style={styles.loader}
            /> */}
          </View>
        );

      default:
        return null;
    }
  };

  const renderItem = ({item}) => (
    <View style={styles.card}>
      <View style={styles.rowBetween}>
        <Text style={styles.invoiceText}>Invoice No. {item.id}</Text>
        {renderStatus(item.status)}
      </View>
      <TouchableOpacity
        style={styles.buttonPlaceholder}
        onPress={() =>
          navigation.navigate('InvoiceListScreen', {invoiceId: item.id})
        }>
        <Text style={styles.buttonPlaceholderText}>View Details</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quick Purchase Overview</Text>
      <FlatList
        data={invoiceData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const MAX_CONTENT_WIDTH = 700; // max width on large screens for readability

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8CC3E2',
    paddingHorizontal: SCREEN_WIDTH * 0.04,
    alignItems: 'center', // center on big screens
    paddingTop: SCREEN_HEIGHT * 0.06,
  },
  title: {
    fontSize: SCREEN_WIDTH * 0.06,
    fontWeight: 'bold',
    marginBottom: SCREEN_HEIGHT * 0.03,
    color: '#333',
    textAlign: 'center',
    width: '90%',
    maxWidth: MAX_CONTENT_WIDTH,
  },
  listContent: {
    paddingBottom: SCREEN_HEIGHT * 0.04,
    width: '100%',
    maxWidth: MAX_CONTENT_WIDTH,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: SCREEN_WIDTH * 0.04,
    padding: SCREEN_WIDTH * 0.04,
    marginBottom: SCREEN_HEIGHT * 0.025,

    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6,
    width: '100%',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  invoiceText: {
    fontSize: SCREEN_WIDTH * 0.045,
    fontWeight: '600',
    color: '#222',
  },
  buttonPlaceholder: {
    marginTop: SCREEN_HEIGHT * 0.02,
    paddingVertical: SCREEN_HEIGHT * 0.010,
     paddingHorizontal: SCREEN_WIDTH * 0.30,
    borderRadius: SCREEN_WIDTH * 0.03,
    backgroundColor: '#2563EB',
    alignItems: 'center',
  },
  buttonPlaceholderText: {
    fontSize: SCREEN_WIDTH * 0.04,
    color: '#fff',
    fontWeight: '600',
  },
  pending: {
    fontWeight: '600',
    color: '#000',
    fontSize: SCREEN_WIDTH * 0.04,
  },
  payText: {
    fontWeight: '600',
    color: '#000',
    fontSize: SCREEN_WIDTH * 0.045,
  },
  paidText: {
    fontWeight: '600',
    color: '#2E8B57',
    fontSize: SCREEN_WIDTH * 0.045,
  },
  paidImage: {
    width: SCREEN_WIDTH * 0.05,
    height: SCREEN_WIDTH * 0.05,
    resizeMode: 'contain',
    tintColor: '#2E8B57',
    marginRight: SCREEN_WIDTH * 0.015,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loader: {
    width: SCREEN_WIDTH * 0.04,
    height: SCREEN_WIDTH * 0.04,
    marginLeft: SCREEN_WIDTH * 0.015,
  },
});

export default QuickPurchase;
