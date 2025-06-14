import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const OfferScreen = () => {
  const navigation = useNavigation();
  const handleNavigate = screen => navigation.navigate(screen);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#2c843e" barStyle="light-content" />

      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity>
          <Image
            source={require('../Images/drawer2.png')}
            style={styles.drawerIcon}
          />
        </TouchableOpacity>
        <View style={styles.storeInfoContainer}>
          <Text style={styles.storeName}>Jay Bhavani Stores</Text>
          <Text style={styles.location}>Kolhapur</Text>
        </View>
        <Image
          source={require('../Images/download.jpeg')}
          style={styles.profile}
        />
      </View>

      {/* Navigation Tabs */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={[styles.navButton, styles.activeButton]}>
          <Text style={styles.activeText}>Explore</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => handleNavigate('QuickPurchase')}>
          <Text style={styles.navText}>Quick </Text>
          <Text style={styles.navText}> Purchase</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => handleNavigate('CartScreen')}>
          <Text style={{flex:1, marginTop:"20%", fontWeight: 'bold', fontSize: width * 0.040,color:'#0e034f',}}>Cart</Text>
        </TouchableOpacity>
      </View>

      {/* Product Groups and Cards */}
      <ScrollView contentContainerStyle={{padding: width * 0.04}}>
        {groupedData.map(group => (
          <View key={group.title}>
            <Text style={styles.groupTitle}>{group.title}</Text>
            {group.data.map(item => (
              <TouchableOpacity
                key={item.nameEnglish}
                style={styles.card}
                onPress={() => handleNavigate(item.page)}>
                <Image source={item.image} style={styles.cardImage} />
                <View style={{flex: 1, paddingLeft: width * 0.03}}>
                  <Text style={styles.cardTitle}>{item.nameEnglish}</Text>
                  <Text style={styles.cardTitle}>{item.nameMarathi}</Text>
                  <Text style={styles.cardDesc}>{item.descriptionEnglish}</Text>
                  <Text style={styles.cardDesc}>{item.descriptionMarathi}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

// Grouped Data
const groupedData = [
  {
    title: 'Sahakar Products',
    data: [
      {
        nameEnglish: 'Bakery Products /',
        nameMarathi: 'बेकरी प्रॉडक्ट्स',
        image: require('../Images/baekry.png'),
        descriptionEnglish:
          'Milk Bread, Banpav, Donet, Rusk, Milk Toast, Khari...',
        descriptionMarathi: 'मिल्क ब्रेड, बनपाव, डोनेट, रस्क, टोस्ट .......',
        page: 'BakeryProducts',
      },
    ],
  },
  {
    title: 'Yalgud Products',
    data: [
      {
        nameEnglish: 'Dairy Products /',
        nameMarathi: 'डेअरी प्रॉडक्ट्स',
        image: require('../Images/dairyproducts.png'),
        descriptionEnglish:
          'Shrikhand, Amrakhand, Fruitkhand, Basundi, Paneer...',
        descriptionMarathi: 'श्रीखंड, आम्रखांड, फ्रुटखंड, बासुंदी, पनीर ...',
        page: 'DairyProducts',
      },
    ],
  },
  {
    title: 'Sumangal Products',
    data: [
      {
        nameEnglish: 'Namkeen /',
        nameMarathi: 'नमकीन',
        image: require('../Images/namkin.png'),
        descriptionEnglish:
          'Chakali, Bhakarwadi, Farsana, Chivada, Ladu, Shev, Jam...',
        descriptionMarathi: 'चकली, भाकरवडी, फरसाणा, चिवडा, लाडू, शेव ...',
        page: 'Namkeen',
      },
    ],
  },
  {
    title: 'Hanuman Products',
    data: [
      {
        nameEnglish: 'Biscuits /',
        nameMarathi: 'बिस्किट्स',
        image: require('../Images/biscuit.png'),
        descriptionEnglish:
          'Farali, Jam, Coconut, Chocolate, Mango, Nankatai...',
        descriptionMarathi: 'फराळी, जॅम, कोकोनट, चॉकलेट, मँगो, नानकटाई ...',
        page: 'Biscuits',
      },
      {
        nameEnglish: 'Cakes /',
        nameMarathi: 'केक्स',
        image: require('../Images/cakes.png'),
        descriptionEnglish:
          'Pastry, Cup Cake, Chocolate, Mava, Orange, Mix, Mango, Veg & Non-Veg...',
        descriptionMarathi:
          'पेस्ट्री, कप केक, चॉकलेट, मावा, ऑरेंज, मिक्स, मँगो, वेज, नॉनव्हेज ...',
        page: 'Sweets',
      },
    ],
  },
];

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#8CC3E2',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: height * 0.06,
    paddingHorizontal: width * 0.05,
  },
  drawerIcon: {
    width: width * 0.07,
    height: width * 0.07,
  },
  storeInfoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  storeName: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#fff',
  },
  location: {
    fontSize: width * 0.035,
    color: '#fff',
  },
  profile: {
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: width * 0.05,
    borderWidth: 2,
    borderColor: '#000',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: height * 0.01,
    paddingHorizontal: width * 0.04,
  },
  navButton: {
    paddingVertical: height * 0.008,
    paddingHorizontal: width * 0.04,
    borderRadius: 20,
    backgroundColor: '#ccc',
    marginTop: -height * 0.015,
   backgroundColor:'#eaeded',
  },
  activeButton: {
    backgroundColor: '#2c843e',
  },
  navText: {
    flex:1,
    color: '#0e034f',
    fontSize: width * 0.040,
    // paddingVertical: height * 0.000001,
    // paddingHorizontal: width * 0.01,
    justifyContent:"center",
    alignItems:"center",
   fontWeight: 'bold',
   
  },
  activeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: width * 0.05,
    paddingVertical: height * 0.005,
    paddingHorizontal: width * 0.04,
  },
  groupTitle: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    color: '#000',
    marginVertical: height * 0.008,
    textAlign: 'center',
    padding: width * 0.01,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: height * 0.01,
    padding: width * 0.01,
    alignItems: 'center',
    elevation: 3,
  },
  cardImage: {
    width: width * 0.4,
    height: height * 0.2,
    borderRadius: 10,
  },
  cardTitle: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    color: '#000',
  },
  cardDesc: {
    fontSize: width * 0.04,
    color: '#444',
  },
});

export default OfferScreen;
