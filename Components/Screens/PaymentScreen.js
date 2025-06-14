import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');
const CONFETTI_COUNT = 20;

function randomValue(min, max) {
  return Math.random() * (max - min) + min;
}

const ConfettiPiece = ({ delay }) => {
  const fallAnim = useRef(new Animated.Value(0)).current;
  const leftAnim = useRef(new Animated.Value(randomValue(0, width))).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fall = Animated.timing(fallAnim, {
      toValue: height + 20,
      duration: randomValue(3000, 5000),
      delay,
      easing: Easing.linear,
      useNativeDriver: true,
    });

    const rotate = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    fall.start(() => {
      fallAnim.setValue(0);
      fall.start();
    });
    rotate.start();

    return () => {
      fall.stop();
      rotate.stop();
    };
  }, [delay]);

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const leftMovement = fallAnim.interpolate({
    inputRange: [0, height],
    outputRange: [leftAnim.__getValue(), leftAnim.__getValue() + randomValue(-30, 30)],
    extrapolate: 'clamp',
  });

  const colors = [
    '#E57373', '#F06292', '#BA68C8', '#9575CD', '#7986CB',
    '#64B5F6', '#4DD0E1', '#4DB6AC', '#81C784', '#AED581',
  ];

  return (
    <Animated.View
      style={[
        styles.confetti,
        {
          backgroundColor: colors[Math.floor(Math.random() * colors.length)],
          transform: [
            { translateY: fallAnim },
            { translateX: leftMovement },
            { rotate: rotateInterpolate },
          ],
          left: leftAnim.__getValue(),
        },
      ]}
    />
  );
};

const formatLakh = (value) => {
  if (value >= 100000) {
    return `₹ ${(value / 100000).toFixed(2)} Lakh`;
  }
  return `₹ ${value.toLocaleString('en-IN')}`;
};

const PaymentScreen = () => {
  const navigation = useNavigation();
  const productName = 'Kaju Katli';
  const quantity = '64 Kg';
  const totalPrice = 112000;
  const orderNo = 'YK20240607';

  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 9,
        tension: 80,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      navigation.replace('OfferScreen'); 
    }, 10000); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {Array.from({ length: CONFETTI_COUNT }).map((_, i) => (
        <ConfettiPiece key={i} delay={i * 200} />
      ))}

      <Animated.View
        style={[
          styles.checkmarkContainer,
          {
            opacity: opacityAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <View style={styles.circleBackground}>
          <Text style={styles.checkmark}>✓</Text>
        </View>
      </Animated.View>

      <Text style={styles.successText}>Payment Successful!</Text>

      <View style={styles.details}>
        <Text style={styles.detailText}>
          Product: <Text style={styles.value}>{productName}</Text>
        </Text>
        <Text style={styles.detailText}>
          Order No: <Text style={styles.value}>{orderNo}</Text>
        </Text>
        <Text style={styles.detailText}>
          Quantity: <Text style={styles.value}>{quantity}</Text>
        </Text>
        <Text style={styles.detailText}>
          Total: <Text style={styles.value}>{formatLakh(totalPrice)}</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8CC3E2',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: width * 0.05,
  },
  checkmarkContainer: {
    marginBottom: height * 0.03,
    zIndex: 10,
  },
  circleBackground: {
    width: width * 0.4,
    height: width * 0.4,
    borderRadius: width * 0.2,
    backgroundColor: '#2c843e',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#2c843e',
    shadowOpacity: 0.8,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  checkmark: {
    fontSize: width * 0.22,
    color: 'white',
    fontWeight: '900',
  },
  successText: {
    fontSize: width * 0.07,
    fontWeight: 'bold',
    color: '#2c843e',
    marginBottom: height * 0.02,
    zIndex: 10,
  },
  details: {
    backgroundColor: '#fff',
    padding: width * 0.06,
    borderRadius: width * 0.04,
    width: '100%',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 8 },
    zIndex: 10,
  },
  detailText: {
    fontSize: width * 0.045,
    marginVertical: 6,
    color: '#444',
  },
  value: {
    fontWeight: '700',
    color: '#000',
  },
  confetti: {
    position: 'absolute',
    width: width * 0.025,
    height: height * 0.02,
    borderRadius: 3,
    opacity: 0.9,
  },
});

export default PaymentScreen;
