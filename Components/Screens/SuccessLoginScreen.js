import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Platform,
  StatusBar,
} from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const scale = size => (width / 375) * size;
const vScale = size => (height / 812) * size;

const SuccessLoginScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#87CEEB" barStyle="dark-content" />

      {/* 🎉 Confetti */}
      <ConfettiCannon count={150} origin={{ x: width / 2, y: 0 }} fadeOut />

      {/* 🧁 Logo */}
      <Image
        source={require('../Images/logoto.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* 👤 Profile Info */}
      <View style={styles.profileCard}>
        <Image
          source={require('../Images/download.jpeg')}
          style={styles.profileImage}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.shopName}>Jay Bhavani Store</Text>
          <Text style={styles.shopAddress}>
            Kotoli Phata, Kerle Tal-Karveer, Dist-Kolhapur
          </Text>
        </View>
      </View>

      {/* 💬 Welcome Message */}
      <View style={styles.middleTextBox}>
        <Text style={styles.middleText}>Welcome to</Text>
        <Text style={styles.yalgudText}>" Yalgud Family "</Text>
        <Text style={styles.subText}>You are now a Dealer</Text>
      </View>

      {/* ✅ Lottie Success Animation */}
      <LottieView
        source={require('../Images/success.png')}
        autoPlay
        loop={false}
        style={styles.successAnimation}
      />

      {/* 👉 Continue Button */}
      <TouchableOpacity
        style={styles.continueButton}
        onPress={() => navigation.navigate('StorePage')}
      >
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>

      {/* 🌄 Footer Decoration */}
      <Image
        source={require('../Images/background2.jpg')}
        style={styles.footerImage}
        resizeMode="cover"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#87CEEB',
    alignItems: 'center',
    paddingTop: vScale(80),
  },
  logo: {
    width: width * 0.65,
    height: height * 0.2,
    alignSelf: 'center',
    marginBottom: height * 0.02,
    borderRadius: 100,
  },
  profileCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffffdd',
    borderRadius: scale(10),
    padding: scale(12),
    width: width * 0.9,
    alignItems: 'center',
    marginBottom: vScale(30),
  },
  profileImage: {
    width: width * 0.18,
    height: width * 0.18,
    borderRadius: width * 0.09,
    borderWidth: 2,
    borderColor: '#6A5ACD',
    marginRight: scale(15),
  },
  profileInfo: {
    flex: 1,
  },
  shopName: {
    fontSize: scale(17),
    fontWeight: 'bold',
    color: '#2e2e2e',
  },
  shopAddress: {
    fontSize: scale(13),
    color: '#555',
    marginTop: scale(4),
  },
  middleTextBox: {
    marginBottom: vScale(25),
    alignItems: 'center',
  },
  middleText: {
    fontSize: scale(24),
    color: '#ffffff',
    fontWeight: '600',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  yalgudText: {
    fontSize: scale(26),
    color: '#FFD700',
    fontWeight: 'bold',
    marginVertical: vScale(6),
    textShadowColor: '#000',
    textShadowOffset: { width: 1.5, height: 1.5 },
    textShadowRadius: 6,
  },
  subText: {
    fontSize: scale(16),
    color: '#fff',
    fontWeight: '500',
  },
  successAnimation: {
    width: width * 0.3,
    height: width * 0.3,
    marginBottom: vScale(20),
  },
  continueButton: {
    backgroundColor: '#6A5ACD',
    borderRadius: scale(10),
    paddingVertical: vScale(12),
    paddingHorizontal: width * 0.25,
    marginBottom: vScale(40),
    marginTop: vScale(-110),
  },
  continueText: {
    color: '#fff',
    fontSize: scale(18),
    fontWeight: 'bold',
  },
  footerImage: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: height * 0.22,
  },
});

export default SuccessLoginScreen;
