import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const StoragePage = () => {
  const navigation = useNavigation();

  const handleDone = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'HomeScreen' }],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../Images/logoto.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <View style={styles.infoContainer}>
        <Text style={styles.code}>XYZ123</Text>
        <Text style={styles.name}>Rahul Patil</Text>
        <Text style={styles.store}>Jay Bhavani Store,</Text>
        <Text style={styles.address}>Kotoli Phata, Kerle</Text>
        <Text style={styles.address}>Tal-Karveer, Dist-Kolhapur</Text>
      </View>

      <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
        <Text style={styles.doneText}>Done</Text>
      </TouchableOpacity>

      <Image
        source={require('../Images/background2.jpg')}
        style={styles.bottomImage}
        resizeMode="cover"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8CC3E2',
    alignItems: 'center',
    paddingTop: height * 0.12,
  },
  logo: {
    width: width * 0.5,
    height: height * 0.25,
    marginBottom: height * 0.06,
  },
  infoContainer: {
    width: '85%',
    alignItems: 'flex-start',
    marginBottom: height * 0.05,
    marginLeft: width * 0.19,
  },
  code: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: height * 0.015,
  },
  name: {
    fontSize: width * 0.055,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: height * 0.01,
  },
  store: {
    fontSize: width * 0.05,
    color: '#fff',
    marginBottom: height * 0.005,
  },
  address: {
    fontSize: width * 0.045,
    color: '#fff',
    fontWeight: 'bold',
  },
  doneButton: {
    backgroundColor: '#6A5ACD',
    borderRadius: width * 0.02,
    paddingHorizontal: width * 0.25,
    paddingVertical: height * 0.015,
    marginBottom: height * 0.09,
    zIndex: 2,
  },
  doneText: {
    color: '#fff',
    fontSize: width * 0.055,
    fontWeight: 'bold',
  },
  bottomImage: {
    position: 'absolute',
    bottom: 0,
    width: width,
    height: height * 0.22,
  },
});

export default StoragePage;
